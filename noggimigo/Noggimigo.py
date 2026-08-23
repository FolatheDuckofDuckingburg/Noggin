import sys

class NoggimigoTutorEngine:
    def __init__(self):
        # State tracker: ensures the bot always remembers where the student is stuck
        self.current_node = "intro"
        
        # Socratic Content Structure (Question -> Branching logic based on response)
        self.course_ware = {
            "intro": {
                "text": "\nWelcome! Let's explore fractions. \nImagine a circle split into 4 equal parts. You shade in 3 parts. \nWhat fraction of the circle is left UN-shaded?",
                "valid_inputs": ["1/4", "3/4", "1/2", "hint"],
                "transitions": {"1/4": "step_two", "3/4": "stuck_inverted", "1/2": "stuck_half", "hint": "hint_intro"}
            },
            "hint_intro": {
                "text": "💡 Hint: The *total* parts equal 4. You used up 3. Subtract to find the remainder!",
                "valid_inputs": ["1/4", "3/4", "1/2"],
                "transitions": {"1/4": "step_two", "3/4": "stuck_inverted", "1/2": "stuck_half"}
            },
            "stuck_inverted": {
                "text": "Close! 3/4 is the amount you shaded. Look closely: how much is *left over*?",
                "valid_inputs": ["1/4", "1/2", "hint"],
                "transitions": {"1/4": "step_two", "1/2": "stuck_half", "hint": "hint_intro"}
            },
            "stuck_half": {
                "text": "Not quite. If you have 4 pieces and take away 3, you don't have half left. Try again!",
                "valid_inputs": ["1/4", "3/4", "hint"],
                "transitions": {"1/4": "step_two", "3/4": "stuck_inverted", "hint": "hint_intro"}
            },
            "step_two": {
                "text": "\nBrilliant! 1/4 is correct. \nNow, keep that 1/4 slice. If we cut that exact slice perfectly in half, \nwhat fraction of the *whole* original circle is one of those new tiny pieces?",
                "valid_inputs": ["1/8", "1/6", "2/4", "hint"],
                "transitions": {"1/8": "complete", "1/6": "stuck_six", "2/4": "stuck_double", "hint": "hint_two"}
            },
            "hint_two": {
                "text": "💡 Hint: If *every* slice out of the original 4 got cut into 2 pieces, how many total slices would exist?",
                "valid_inputs": ["1/8", "1/6", "2/4"],
                "transitions": {"1/8": "complete", "1/6": "stuck_six", "2/4": "stuck_double"}
            },
            "stuck_six": {
                "text": "Think about multiplying the denominators. 4 slices times 2 parts each equals...?",
                "valid_inputs": ["1/8", "hint"],
                "transitions": {"1/8": "complete", "hint": "hint_two"}
            },
            "stuck_double": {
                "text": "Cutting a piece in half makes it smaller, not bigger! Try again.",
                "valid_inputs": ["1/8", "hint"],
                "transitions": {"1/8": "complete", "hint": "hint_two"}
            },
            "complete": {
                "text": "\nCorrect! You now are ready to move on to the next level! Keep up the good work!",
                "valid_inputs": ["exit"],
                "transitions": {}
            }
        }

    def run_loop(self):
        """The core runtime loop that guarantees execution control without system locking."""
        print("====================================================")
        print("      NOGGIMIGO TUTORING ENGINE (OFFLINE LOCAL)    ")
        print("====================================================\n")
        print("Type 'exit' at any point to close the session safely.")
        
        while True:
            # Fetch current node instructions
            node = self.course_ware[self.current_node]
            print(node["text"])
            
            # Absolute break check to clear memory if course completes
            if self.current_node == "complete":
                break
                
            # A clean, guarded input fetch to prevent system hanging
            try:
                user_raw = input("\n📝 Your Answer: ")
                user_input = user_raw.strip().lower()
            except (KeyboardInterrupt, EOFError):
                print("\nSession safely interrupted.")
                sys.exit(0)
                
            if user_input == "exit":
                print("Closing Noggimigo runtime state machine. Goodbye!")
                break
                
            # Scan matching pathways or trigger fallback safety rule
            matched_action = None
            for valid in node["valid_inputs"]:
                if user_input == valid.lower():
                    matched_action = valid
                    break
            
            if matched_action:
                # Progress state machine to target node transition matrix
                self.current_node = node["transitions"][matched_action]
            else:
                print(f"\n⚠️ [System Guide]: Input not recognized. Try one of these options: {node['valid_inputs']}")
                print("-" * 50)

# Execute Local Simulation Engine directly
if __name__ == "__main__":
    tutor = NoggimigoTutorEngine()
    tutor.run_loop()
