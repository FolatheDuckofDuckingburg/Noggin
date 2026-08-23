import json
import os

class NogginLessonBuilder:
    def __init__(self):
        self.lesson_data = {}

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

        # Package the node metadata
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
            print("3. Exit Builder")
            
            choice = input("\nChoose an option (1-3): ").strip()
            if choice == "1":
                self.create_node()
            elif choice == "2":
                self.export_to_json()
            elif choice == "3":
                print("Closing generator.")
                break
            else:
                print("⚠️ Invalid choice. Select 1, 2, or 3.")

if __name__ == "__main__":
    builder = NogginLessonBuilder()
    builder.main_menu()
