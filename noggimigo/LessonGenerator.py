import json
import os
import random

class DisabilityScaffoldAdapter:
    """
    Adapts lesson prompts, choices, and micro-scaffolding for specific learning profiles:
    - ADHD: Short, clear micro-steps, encouraging visual cues, high engagement.
    - Autism: Explicit step-by-step structure, minimal figurative/ambiguous language, predictable choices.
    - Dyslexia: Simple vocabulary, short sentences, high contrast/bulleted visual layout spacing.
    """

    @staticmethod
    def adapt_prompt(text: str, profile: str = "general") -> str:
        profile = (profile or "general").lower()
        if profile == "adhd":
            return f"⚡ Quick Step: {text} [Focus Goal: 1 step at a time!]"
        elif profile == "autism":
            return f"📌 Step-by-Step Guide: {text} (Direct Task)"
        elif profile == "dyslexia":
            # Simplify and split long lines for visual clarity
            words = text.split()
            shortened = " ".join(words[:12]) + ("..." if len(words) > 12 else "")
            return f"📖 {shortened}"
        return text

    @staticmethod
    def generate_accommodations(profile: str = "general") -> dict:
        profile = (profile or "general").lower()
        if profile == "adhd":
            return {
                "chunk_size": 1,
                "reward_frequency": "high",
                "timer_enabled": False,
                "visual_cues": True
            }
        elif profile == "autism":
            return {
                "predictable_layout": True,
                "literal_language": True,
                "explicit_hints": True
            }
        elif profile == "dyslexia":
            return {
                "font_spacing": "wide",
                "reading_grade_level": "simplified",
                "audio_speech_hook": True
            }
        return {"standard": True}


class LessonGenerator:
    """
    Dynamic Procedural Question and Lesson Generator for Noggimigo AI.
    Generates structured concept scaffolding across subjects, adaptive reading levels,
    disability profiles, and WebLLM / local fallback mechanics.
    """
    def __init__(self):
        self.templates = {
            "math_fractions": {
                "title": "Adaptive Fractions Scaffolding",
                "base_prompts": [
                    {
                        "node_id": "step_1",
                        "text": "Suppose a pizza has {total} slices. You eat {part} slices. What fraction remains?",
                        "target_template": "{rem}/{total}",
                        "numeric_template": lambda p, t: (t - p) / t,
                        "options_builder": lambda p, t: [f"{t-p}/{t}", f"{p}/{t}", f"1/{t}"],
                        "micro_scaffold": "Subtract eaten slices ({part}) from total slices ({total})."
                    }
                ]
            },
            "math_algebra": {
                "title": "Linear Equations Scaffolding",
                "base_prompts": [
                    {
                        "node_id": "step_1",
                        "text": "Solve for x: {a}x + {b} = {c}. What is the first inverse operation?",
                        "target_template": "subtract {b}",
                        "numeric_template": lambda a, b, c: (c - b) / a,
                        "options_builder": lambda a, b, c: [f"subtract {b}", f"add {b}", f"divide {a}"],
                        "micro_scaffold": "Subtract the constant term ({b}) from both sides."
                    }
                ]
            }
        }

    def generate_procedural_lesson(
        self,
        domain: str = "math_fractions",
        grade_level: int = 4,
        disability_profile: str = "general",
        num_nodes: int = 2
    ) -> dict:
        """
        Procedurally generates an adaptive lesson structure tailored to grade level and learning disability profile.
        Includes timeout fallback mechanism.
        """
        try:
            lesson_nodes = {}
            for i in range(1, num_nodes + 1):
                node_id = f"step_{i}"
                next_node_id = f"step_{i+1}" if i < num_nodes else "complete"

                if domain == "math_fractions":
                    total = random.choice([4, 8, 10])
                    part = random.randint(1, total - 1)
                    rem = total - part

                    raw_text = f"Imagine a circle split into {total} equal parts. You shade in {part} parts. What fraction is left unshaded?"
                    target_val = f"{rem}/{total}"
                    num_val = round(rem / total, 3)

                    raw_prompt = DisabilityScaffoldAdapter.adapt_prompt(raw_text, disability_profile)
                    options = [f"{rem}/{total}", f"{part}/{total}", f"1/{total}"]
                    random.shuffle(options)

                    transitions = {opt: next_node_id if opt == target_val else node_id for opt in options}

                    common_errors = {
                        f"{part}/{total}": ("INVERSION_ERROR", f"{part}/{total} is the shaded portion! We want unshaded parts."),
                        f"1/{total}": ("HALVING_ERROR", f"Look at total unshaded parts ({rem}), not just 1 piece.")
                    }

                    lesson_nodes[node_id] = {
                        "prompt": raw_prompt,
                        "target_value": target_val,
                        "numeric_val": num_val,
                        "micro_scaffold": f"Subtract shaded parts ({part}) from total parts ({total}). Remaining = {rem}.",
                        "options": options,
                        "transitions": transitions,
                        "common_errors": common_errors,
                        "next_node": next_node_id
                    }

                elif domain == "math_algebra":
                    a = random.randint(2, 5)
                    b = random.randint(2, 8)
                    x = random.randint(2, 6)
                    c = (a * x) + b

                    raw_text = f"Solve for x: {a}x + {b} = {c}. What operation isolates {a}x?"
                    target_val = f"subtract {b}"

                    raw_prompt = DisabilityScaffoldAdapter.adapt_prompt(raw_text, disability_profile)
                    options = [f"subtract {b}", f"add {b}", f"divide {a}"]
                    random.shuffle(options)

                    transitions = {opt: next_node_id if opt == target_val else node_id for opt in options}

                    common_errors = {
                        f"add {b}": ("INVERSE_ERROR", f"Adding {b} increases the constant! Use subtraction."),
                        f"divide {a}": ("ORDER_ERROR", f"Subtract the constant {b} before dividing by {a}.")
                    }

                    lesson_nodes[node_id] = {
                        "prompt": raw_prompt,
                        "target_value": target_val,
                        "numeric_val": None,
                        "micro_scaffold": f"To undo +{b}, perform inverse operation: subtract {b} from both sides.",
                        "options": options,
                        "transitions": transitions,
                        "common_errors": common_errors,
                        "next_node": next_node_id
                    }

            return {
                "domain": domain,
                "grade_level": grade_level,
                "disability_profile": disability_profile,
                "accommodations": DisabilityScaffoldAdapter.generate_accommodations(disability_profile),
                "initial_node": "step_1",
                "nodes": lesson_nodes
            }

        except Exception as e:
            # Fallback mechanism for AI / procedural generation timeouts or errors
            return self.get_fallback_lesson(domain, disability_profile)

    def get_fallback_lesson(self, domain: str = "math_fractions", disability_profile: str = "general") -> dict:
        """Fallback static lesson structure if procedural generation encounters timeouts/errors."""
        prompt = DisabilityScaffoldAdapter.adapt_prompt(
            "Imagine a circle split into 4 equal parts. You shade in 3 parts. What fraction of the circle is left unshaded?",
            disability_profile
        )

        return {
            "domain": domain,
            "is_fallback": True,
            "disability_profile": disability_profile,
            "accommodations": DisabilityScaffoldAdapter.generate_accommodations(disability_profile),
            "initial_node": "step_1",
            "nodes": {
                "step_1": {
                    "prompt": prompt,
                    "target_value": "1/4",
                    "numeric_val": 0.25,
                    "micro_scaffold": "Subtract shaded parts (3) from total (4).",
                    "options": ["1/4", "3/4", "1/2"],
                    "transitions": {"1/4": "complete", "3/4": "step_1", "1/2": "step_1"},
                    "common_errors": {
                        "3/4": ("INVERSION_ERROR", "3/4 is shaded! Unshaded is 1/4.")
                    },
                    "next_node": "complete"
                }
            }
        }


class NogginLessonBuilder:
    def __init__(self):
        self.lesson_data = {}
        self.generator = LessonGenerator()

    def create_node(self):
        print("\n--- Create New Lesson Node ---")
        node_id = input("1. Enter Node ID (e.g., 'intro', 'stuck_half', 'step_two'): ").strip().lower()
        text = input("2. Enter Noggimigo's Question or Explanation text:\n   > ").strip()
        
        options = []
        transitions = {}
        
        print("\n3. Add Choice Buttons for this question (Type 'done' when finished):")
        while True:
            choice = input("   -> Enter option text (e.g., '1/4'): ").strip()
            if choice.lower() == 'done':
                if not options:
                    print("   ⚠️ You must add at least one option before finishing a node.")
                    continue
                break
                
            next_node = input(f"   -> Where should clicking '{choice}' take the student? (Enter target Node ID): ").strip().lower()
            options.append(choice)
            transitions[choice] = next_node
            print(f"   ✅ Saved pathway: ['{choice}'] -> {next_node}\n")

        self.lesson_data[node_id] = {
            "text": text,
            "options": options,
            "transitions": transitions
        }
        print(f"\n🎉 Node '{node_id}' successfully saved to temporary memory!")

    def export_to_json(self):
        if not self.lesson_data:
            print("⚠️ Memory is empty. Create some nodes before saving!")
            return
            
        filename = input("\n💾 Enter filename to save (e.g., 'fractions_lesson.json'): ").strip()
        if not filename.endswith('.json'):
            filename += '.json'
            
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.lesson_data, f, indent=4)
            print(f"🏆 Success! File written to: {os.path.abspath(filename)}")
            print("You can now copy-paste this JSON object straight into your Noggin JavaScript array!")
        except Exception as e:
            print(f"❌ Failed to write file: {e}")

    def main_menu(self):
        while True:
            print("\n" + "="*40)
            print("   NOGGIMIGO LESSON CONTENT GENERATOR")
            print("="*40)
            print("1. Add a new interactive question node")
            print("2. Compile and save lesson to JSON file")
            print("3. Generate Adaptive Lesson for Special Education Profile")
            print("4. Exit Builder")
            
            choice = input("\nChoose an option (1-4): ").strip()
            if choice == "1":
                self.create_node()
            elif choice == "2":
                self.export_to_json()
            elif choice == "3":
                profile = input("Enter profile (adhd / autism / dyslexia / general): ").strip()
                lesson = self.generator.generate_procedural_lesson(disability_profile=profile)
                print("\nGenerated Procedural Lesson:")
                print(json.dumps(lesson, indent=2))
            elif choice == "4":
                print("Closing generator.")
                break
            else:
                print("⚠️ Invalid choice. Select 1, 2, 3, or 4.")

if __name__ == "__main__":
    builder = NogginLessonBuilder()
    builder.main_menu()
