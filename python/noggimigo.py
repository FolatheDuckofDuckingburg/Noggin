import urllib.request
import urllib.parse

def ask_noggimigo_tutor(conversation_history, new_message):
    url = "https://text.pollinations.ai/"
    
    # Custom system instructions tailored strictly for the Noggin platform
    system_rules = (
        "You are Noggimigo, a brilliant, patient, and kind AI tutor for special education students. "
        "CRITICAL RULE: Never just give the student the final answer right away! "
        "Instead, act like a supportive coach. Ask gentle, leading questions to help them think through the problem. "
        "Keep your sentences short and clear. Use encouraging emojis and simple words. Break steps down completely. "
        "Here is what the student says: "
    )
    
    # We combine what they said before so the AI remembers the conversation flow
    full_prompt = system_rules + f" (Context history: {conversation_history}) -> Current question: {new_message}"
    encoded_prompt = urllib.parse.quote(full_prompt)
    
    try:
        with urllib.request.urlopen(url + encoded_prompt) as response:
            return response.read().decode('utf-8')
    except Exception:
        return "Noggimigo: My connection blinked for a second! Let's try that step again, friend."

def start_noggimigo_session():
    print("🧠 Noggimigo is Online! 🧠")
    print("---------------------------------------------------------------")
    name = input("Hi there! What is your name? ")
    print(f"\n🌟 Welcome, {name}! What topic or homework problem are we working on together today?")

    # This keeps track of the chat history so the AI remembers what hints it already gave
    chat_history = ""

    while True:
        student_input = input(f"\n📚 {name}: ")
        
        if student_input.lower().strip() in ["exit", "quit", "goodbye"]:
            print(f"\n👋 Wonderful job working through those problems today, {name}! See you next time!")
            break
            
        print("🤖 Noggimigo is thinking of a helpful hint...")
        
        # Get the smart, guiding response from the AI
        ai_hint = ask_noggimigo_tutor(chat_history, student_input)
        print(f"\n🤖 Noggimigo:\n{ai_hint}")
        
        # Update the history so the conversation stays connected
        chat_history += f" | Student: {student_input} | Tutor: {ai_hint}"

if __name__ == "__main__":
    start_noggimigo_session()
