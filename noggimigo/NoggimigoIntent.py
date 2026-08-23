import re

class NoggimigoIntentAI:
    def __init__(self):
        # Stopwords: common filler words that the AI will ignore to focus on meaning
        self.stopwords = {"i", "think", "maybe", "the", "a", "an", "is", "it", "guess", "umm", "uhh"}
        
        # Intent Vector Dictionary: Training the AI on what words map to which nodes
        self.intent_library = {
            "1/4": ["one", "fourth", "quarter", "1/4", "1-4", "one-fourth"],
            "3/4": ["three", "fourths", "quarters", "3/4", "3-4", "three-quarters"],
            "1/2": ["half", "two", "fourths", "1/2", "0.5", "one-half"],
            "hint": ["help", "hint", "clue", "stuck", "confused", "don't know"]
        }

    def tokenize_and_clean(self, raw_text):
        """Converts text to lowercase and strips punctuation and filler words."""
        # Regex to keep only alphanumeric characters and slashes
        clean_words = re.sub(r'[^\w/]', ' ', raw_text.lower()).split()
        # Filter out stopwords
        return [word for word in clean_words if word not in self.stopwords]

    def predict_intent(self, user_sentence):
        """Calculates token overlap vectors to find the highest scoring match."""
        tokens = self.tokenize_and_clean(user_sentence)
        
        best_intent = None
        highest_score = 0
        
        # Scoring Loop (Core NLP Heuristics)
        for intent, trigger_words in self.intent_library.items():
            current_score = 0
            for token in tokens:
                if token in trigger_words:
                    current_score += 1 # Score up for every matching keyword matrix
            
            if current_score > highest_score:
                highest_score = current_score
                best_intent = intent
                
        # Fallback security check: if the AI scores 0, it admits it doesn't know
        if highest_score == 0:
            return None
            
        return best_intent

# --- Quick AI Test Runner ---
if __name__ == "__main__":
    ai = NoggimigoIntentAI()
    
    # Test Sentences
    test_phrases = [
        "I guess it's a quarter",
        "umm three fourths maybe?",
        "give me a hint please",
        "waffles and ice cream"
    ]
    
    print("====================================================")
    print("      NOGGIMIGO LOCAL NLP INTENT CLASSIFIER         ")
    print("====================================================\n")
    
    for phrase in test_phrases:
        prediction = ai.predict_intent(phrase)
        print(f"Input:  \"{phrase}\"")
        print(f"AI Prediction -> {prediction}\n")
