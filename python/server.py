import asyncio
import websockets
import json
import sys
import os

# Add root folder to sys.path to allow clean import of noggimigo
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from noggimigo.Noggimigo import NoggimigoTutorEngine

# Instantiate shared local Noggimigo AI instance
tutor_ai = NoggimigoTutorEngine()

# Handles real-time websocket requests through Zero-Lag Tunnel
async def focus_handler(websocket):
    print(f"⚡ Client connected from: {websocket.remote_address}")
    try:
        async for message in websocket:
            data = json.loads(message)
            print(f"📥 Received from client: {data}")
            
            action = data.get("action") or data.get("status")

            # 1. Handle Socratic AI tutor interactions
            if action in ["evaluate_answer", "interact_ai", "socratic_query"]:
                user_input = data.get("answer") or data.get("user_input", "")
                latency_ms = data.get("latency_ms", 40.0)
                brain_data = data.get("brain_data", None)

                ai_response = tutor_ai.evaluate_response(
                    user_input=user_input,
                    latency_ms=latency_ms,
                    brain_data=brain_data
                )

                await websocket.send(json.dumps({
                    "action": "ai_response",
                    "payload": ai_response
                }))
                print(f"🤖 Sent Socratic AI response: {ai_response['status']} - {ai_response['error_type']}")

            # 2. Handle concept switching
            elif action == "set_concept":
                concept_id = data.get("concept_id", "fractions_intro")
                success = tutor_ai.set_concept(concept_id)
                await websocket.send(json.dumps({
                    "action": "concept_set",
                    "success": success,
                    "prompt": tutor_ai.get_current_prompt()
                }))

            # 3. Handle reward requests
            elif action == "request_reward":
                response = {
                    "action": "trigger_sticker",
                    "sticker": "custom_mallard_duck"
                }
                await websocket.send(json.dumps(response))
                print("🦆 Instant duck sticker reward sent across the tunnel!")

            else:
                await websocket.send(json.dumps({
                    "action": "ack",
                    "current_prompt": tutor_ai.get_current_prompt()
                }))

    except websockets.exceptions.ConnectionClosedOK:
        print("🔌 Client disconnected cleanly.")
    except Exception as e:
        print(f"❌ Error encountered: {e}")

# Main loop to spin up the local server
async def main():
    print("🧠 Noggin Local AI Engine starting up...")
    async with websockets.serve(focus_handler, "localhost", 8765):
        print("🛰️ Zero-Lag Tunnel active on ws://localhost:8765")
        await asyncio.Future()  # Keeps the server running continuously

if __name__ == "__main__":
    asyncio.run(main())
