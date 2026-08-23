import sys
import time
import re
import math

class NFOTEngine:
    """
    Neural Feedback Optimization Theory (NFOT) Engine.
    Calculates Write-Back Gap (L), behavioral efficiency E(L), and
    Asymmetric Biological Eligibility Trace (ABETH) bias.
    """
    def __init__(self, c=1500.0, critical_gap_p=50.0, critical_gap_d=120.0):
        self.c = c  # Efficiency scaling constant
        self.critical_gap_p = critical_gap_p  # Critical gap for potentiation
        self.critical_gap_d = critical_gap_d  # Critical gap for depression

    def calculate_efficiency(self, latency_ms: float) -> float:
        """Derives efficiency using inverse-square law: E(L) = c / (L^2 + c)"""
        L = max(0.0, float(latency_ms))
        return self.c / ((L ** 2) + self.c)

    def calculate_abeth_bias(self, latency_ms: float) -> str:
        """
        Asymmetric Biological Eligibility Trace Hypothesis (ABETH):
        Determines if the current latency gap induces a depressive or potentiating learning bias.
        """
        if latency_ms <= self.critical_gap_p:
            return "POTENTIATION_FAVORED"  # Optimal learning window
        elif latency_ms >= self.critical_gap_d:
            return "DEPRESSIVE_BIAS"  # High latency induces synaptic depression/fatigue
        else:
            return "TRANSITIONAL"

    def process_telemetry(self, latency_ms: float, brain_data: dict = None) -> dict:
        """Processes real-time feedback loop telemetry."""
        latency_ms = float(latency_ms) if latency_ms is not None else 40.0
        efficiency = self.calculate_efficiency(latency_ms)
        bias = self.calculate_abeth_bias(latency_ms)

        tbr = 1.0
        cognitive_state = "HIGH_FOCUS"
        if brain_data:
            theta = brain_data.get("theta", 5.0)
            beta = brain_data.get("beta", 15.0)
            beta_denom = beta if beta != 0 else 0.1
            tbr = theta / beta_denom
            cognitive_state = "ATTENTION_DECAY" if tbr > 2.0 else "HIGH_FOCUS"

        return {
            "write_back_gap_ms": round(latency_ms, 2),
            "efficiency": round(efficiency, 4),
            "abeth_bias": bias,
            "tbr": round(tbr, 3),
            "cognitive_state": cognitive_state
        }


class SocraticReasoningCore:
    """
    Real Local Socratic AI Reasoning Engine.
    Dynamically analyzes user responses, classifies error taxonomy,
    decomposes problems into micro-concepts, and generates adaptive Socratic hints.
    """
    def __init__(self):
        # Sample concept graphs with micro-step scaffolding
        self.concepts = {
            "fractions_intro": {
                "title": "Introduction to Fractions",
                "goal": "Understand numerators and denominators through remaining parts.",
                "initial_node": "step_1",
                "nodes": {
                    "step_1": {
                        "prompt": "Imagine a circle split into 4 equal parts. You shade in 3 parts. What fraction of the circle is left unshaded?",
                        "target_value": "1/4",
                        "numeric_val": 0.25,
                        "micro_scaffold": "Let's break it down: Total parts = 4. Shaded parts = 3. Subtract shaded from total!",
                        "next_node": "step_2",
                        "common_errors": {
                            "3/4": ("INVERSION_ERROR", "3/4 is the shaded portion. We want the unshaded portion remaining!"),
                            "1/2": ("HALF_ERROR", "If you start with 4 pieces and shade 3, is exactly half left? Check the math!"),
                            "2/4": ("HALVING_ERROR", "Close, but 4 - 3 leaves 1 slice, not 2 slices!")
                        }
                    },
                    "step_2": {
                        "prompt": "Awesome! 1/4 remains. Now, if we cut that 1/4 slice in half, what fraction of the WHOLE original circle is that tiny new slice?",
                        "target_value": "1/8",
                        "numeric_val": 0.125,
                        "micro_scaffold": "Imagine cutting every slice of the original 4 in half. How many equal slices exist now?",
                        "next_node": "complete",
                        "common_errors": {
                            "1/6": ("MULTIPLY_ERROR", "Think about multiplying denominators: 4 slices times 2 halves each = ?"),
                            "2/4": ("DOUBLING_ERROR", "Cutting a piece in half makes it smaller! The denominator gets larger."),
                            "1/4": ("NO_CHANGE_ERROR", "Remember, we cut the slice in half, so it becomes smaller than 1/4.")
                        }
                    }
                }
            },
            "algebra_intro": {
                "title": "Basic Algebraic Thinking",
                "goal": "Isolate variables using inverse operations.",
                "initial_node": "step_1",
                "nodes": {
                    "step_1": {
                        "prompt": "Solve for x: 2x + 4 = 10. What is the first operation to isolate 2x?",
                        "target_value": "subtract 4",
                        "numeric_val": 3.0,
                        "micro_scaffold": "To undo the addition of 4, we perform the inverse operation on both sides.",
                        "next_node": "step_2",
                        "common_errors": {
                            "add 4": ("INVERSE_ERROR", "Adding 4 to both sides gives 2x + 8 = 14, which moves further away! Try subtracting 4."),
                            "divide 2": ("ORDER_ERROR", "You can divide by 2, but it's easier to subtract the constant 4 first!")
                        }
                    },
                    "step_2": {
                        "prompt": "Great! Subtracting 4 gives 2x = 6. What is x?",
                        "target_value": "3",
                        "numeric_val": 3.0,
                        "micro_scaffold": "2 times what number equals 6?",
                        "next_node": "complete",
                        "common_errors": {
                            "12": ("MULTIPLY_ERROR", "2x means 2 multiplied by x. Divide 6 by 2!"),
                            "4": ("SUBTRACT_ERROR", "2x = 6 means division by 2, not subtraction.")
                        }
                    }
                }
            }
        }

    def parse_fraction_or_num(self, text: str):
        """Extracts numerical or fractional representations from student input."""
        text = text.strip().lower()

        # Match fraction like '1/4' or '3/8'
        frac_match = re.search(r'(\d+)\s*/\s*(\d+)', text)
        if frac_match:
            num, denom = int(frac_match.group(1)), int(frac_match.group(2))
            if denom != 0:
                return f"{num}/{denom}", num / denom

        # Match single integer or float
        num_match = re.search(r'[-+]?\d*\.?\d+', text)
        if num_match:
            try:
                val = float(num_match.group())
                return str(val), val
            except ValueError:
                pass

        return text, None

    def evaluate_student_input(self, concept_id: str, current_node_id: str, user_input: str) -> dict:
        """
        Socratic Evaluation Core:
        Parses student input, matches target/error states, and returns Socratic feedback.
        """
        concept = self.concepts.get(concept_id, self.concepts["fractions_intro"])
        node = concept["nodes"].get(current_node_id, concept["nodes"]["step_1"])

        raw_str = user_input.strip().lower()

        # Check for explicitly requested hints
        if "hint" in raw_str or "help" in raw_str or "don't know" in raw_str:
            return {
                "status": "HINT_REQUESTED",
                "error_type": "HELP_NEEDED",
                "feedback": f"💡 Socratic Scaffold: {node['micro_scaffold']}",
                "next_node": current_node_id,
                "completed": False
            }

        parsed_str, parsed_val = self.parse_fraction_or_num(user_input)
        target_str = node["target_value"].lower()
        target_num = node["numeric_val"]

        # Exact string match or close numeric equivalence
        is_correct = False
        if parsed_str == target_str or raw_str == target_str:
            is_correct = True
        elif parsed_val is not None and target_num is not None:
            if math.isclose(parsed_val, target_num, rel_tol=1e-3):
                is_correct = True

        if is_correct:
            next_node = node["next_node"]
            completed = (next_node == "complete")
            next_prompt = ""
            if not completed and next_node in concept["nodes"]:
                next_prompt = concept["nodes"][next_node]["prompt"]

            return {
                "status": "CORRECT",
                "error_type": "NONE",
                "feedback": f"🌟 Excellent deduction! That is correct.",
                "next_node": next_node,
                "next_prompt": next_prompt,
                "completed": completed
            }

        # Check for known misconception/error taxonomy
        for error_key, (err_type, err_msg) in node["common_errors"].items():
            if error_key in raw_str or (parsed_str and error_key == parsed_str):
                return {
                    "status": "MISCONCEPTION",
                    "error_type": err_type,
                    "feedback": f"🔍 Let me guide you: {err_msg}",
                    "next_node": current_node_id,
                    "completed": False
                }

        # Unknown / Unclassified response
        return {
            "status": "INCORRECT",
            "error_type": "CONCEPTUAL_GAP",
            "feedback": f"🤔 Let's look closer. {node['micro_scaffold']} Give it another try!",
            "next_node": current_node_id,
            "completed": False
        }


class NoggimigoTutorEngine:
    """
    Noggimigo AI Tutor Engine.
    Integrates Socratic Reasoning with NFOT Neuroadaptive Closed-Loop Feedback.
    """
    def __init__(self, active_concept: str = "fractions_intro"):
        self.nfot = NFOTEngine()
        self.socratic = SocraticReasoningCore()
        self.active_concept = active_concept
        self.current_node = "step_1"
        self.session_history = []

    def set_concept(self, concept_id: str):
        """Switches current tutoring module."""
        if concept_id in self.socratic.concepts:
            self.active_concept = concept_id
            self.current_node = self.socratic.concepts[concept_id]["initial_node"]
            return True
        return False

    def get_current_prompt(self) -> str:
        """Retrieves prompt text for active concept and node."""
        concept = self.socratic.concepts.get(self.active_concept)
        if concept and self.current_node in concept["nodes"]:
            return concept["nodes"][self.current_node]["prompt"]
        return "Lesson complete! Great job."

    def evaluate_response(self, user_input: str, latency_ms: float = 40.0, brain_data: dict = None) -> dict:
        """
        Main Engine Evaluation API:
        Runs NFOT telemetry processing and Socratic evaluation in parallel,
        adapting Socratic output based on Write-Back Gap and cognitive state.
        """
        # 1. NFOT Telemetry Analysis
        telemetry = self.nfot.process_telemetry(latency_ms, brain_data)

        # 2. Socratic Reasoning Evaluation
        eval_result = self.socratic.evaluate_student_input(
            self.active_concept, self.current_node, user_input
        )

        # 3. Neuroadaptive Socratic Tuning (NFOT Modulation)
        # If attention decay is high or write-back gap is long (depressive bias), adapt feedback
        neuroadaptive_note = ""
        if telemetry["cognitive_state"] == "ATTENTION_DECAY" or telemetry["abeth_bias"] == "DEPRESSIVE_BIAS":
            neuroadaptive_note = " ⚡ [NFOT Adaptive Boost: Simplified micro-prompt triggered to reduce cognitive load]"
            if eval_result["status"] != "CORRECT":
                # Add extra scaffolding immediately to compensate for latency/decay
                concept = self.socratic.concepts[self.active_concept]
                scaffold = concept["nodes"][self.current_node]["micro_scaffold"]
                eval_result["feedback"] += f"\n💡 Micro-step guide: {scaffold}"

        # Update node state if response was correct
        if eval_result["status"] == "CORRECT":
            self.current_node = eval_result["next_node"]

        # Formulate full response
        full_feedback = eval_result["feedback"] + neuroadaptive_note

        result_payload = {
            "concept": self.active_concept,
            "node": self.current_node,
            "status": eval_result["status"],
            "error_type": eval_result["error_type"],
            "feedback": full_feedback,
            "next_prompt": eval_result.get("next_prompt", self.get_current_prompt()),
            "completed": eval_result["completed"],
            "nfot_telemetry": telemetry
        }

        self.session_history.append(result_payload)
        return result_payload

    def run_loop(self):
        """Interactive local terminal interface for Noggimigo AI."""
        print("====================================================")
        print("   NOGGIMIGO AI TUTORING ENGINE (LOCAL SOCRATIC)    ")
        print("   Neuroadaptive Closed-Loop NFOT Architecture       ")
        print("====================================================\n")
        print("Type 'exit' to quit at any time.\n")

        concept = self.socratic.concepts[self.active_concept]
        print(f"📘 Module: {concept['title']}")
        print(f"🎯 Objective: {concept['goal']}\n")

        simulated_latency = 40.0  # ms

        while True:
            if self.current_node == "complete":
                print("🎉 Lesson Complete! You mastered this concept!")
                break

            prompt = self.get_current_prompt()
            print(f"\n🤖 Noggimigo: {prompt}")

            start_time = time.time()
            try:
                user_raw = input("\n📝 Your Answer: ")
                user_input = user_raw.strip()
            except (KeyboardInterrupt, EOFError):
                print("\nSession gracefully ended.")
                break

            # Estimate response latency
            elapsed_ms = (time.time() - start_time) * 1000.0
            total_latency = simulated_latency + (elapsed_ms * 0.1)  # Weighted gap

            if user_input.lower() == "exit":
                print("Closing Noggimigo runtime engine. Keep learning!")
                break

            # Evaluate through AI engine
            res = self.evaluate_response(user_input, latency_ms=total_latency)

            print(f"\n{res['feedback']}")
            print(f"📊 NFOT Metrics -> Latency: {res['nfot_telemetry']['write_back_gap_ms']}ms | Efficiency: {res['nfot_telemetry']['efficiency']*100:.1f}% | Bias: {res['nfot_telemetry']['abeth_bias']}")

# Execute directly when run as script
if __name__ == "__main__":
    tutor = NoggimigoTutorEngine()
    tutor.run_loop()
