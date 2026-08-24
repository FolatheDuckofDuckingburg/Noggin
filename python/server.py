import asyncio
import websockets
import json
import sys
import os

# Add root folder to sys.path to allow clean import of noggimigo
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from noggimigo.Noggimigo import NoggimigoTutorEngine
from python.processor import calculate_focus_score, NeuralSignalProcessor

# Instantiate shared local Noggimigo AI instance and Signal Processor
tutor_ai = NoggimigoTutorEngine()
signal_processor = NeuralSignalProcessor()

async def stream_response(websocket, full_payload: dict, chunk_delay: float = 0.02):
    """
    Streams AI response feedback word-by-word/token-by-token over WebSocket frames
    to support low-latency progressive rendering on the frontend.
    """
    feedback_text = full_payload.get("feedback", "")
    words = feedback_text.split(" ")
    accumulated = ""

    for idx, word in enumerate(words):
        accumulated += (word + (" " if idx < len(words) - 1 else ""))
        stream_frame = {
            "action": "ai_stream_chunk",
            "chunk": word + " ",
            "accumulated": accumulated,
            "is_final": (idx == len(words) - 1),
            "payload": full_payload if idx == len(words) - 1 else None
        }
        await websocket.send(json.dumps(stream_frame))
        await asyncio.sleep(chunk_delay)

# Handles real-time websocket requests through Zero-Lag Tunnel
async def focus_handler(websocket):
    print(f"⚡ Client connected from: {getattr(websocket, 'remote_address', 'remote')}")
    try:
        async for message in websocket:
            try:
                data = json.loads(message)
            except json.JSONDecodeError:
                await websocket.send(json.dumps({
                    "action": "error",
                    "error_message": "Invalid JSON format payload."
                }))
                continue

            print(f"📥 Received from client: {data}")
            action = data.get("action") or data.get("status")

            # 1. Handle Socratic AI tutor interactions (with streaming support)
            if action in ["evaluate_answer", "interact_ai", "socratic_query"]:
                user_input = data.get("answer") or data.get("user_input", "")
                latency_ms = data.get("latency_ms", 40.0)
                brain_data = data.get("brain_data", None)
                enable_streaming = data.get("stream", True)

                ai_response = tutor_ai.evaluate_response(
                    user_input=user_input,
                    latency_ms=latency_ms,
                    brain_data=brain_data
                )

                if enable_streaming:
                    await stream_response(websocket, ai_response)
                else:
                    await websocket.send(json.dumps({
                        "action": "ai_response",
                        "payload": ai_response
                    }))
                print(f"🤖 Sent Socratic AI response: {ai_response['status']} - {ai_response['error_type']}")

            # 2. Handle real-time telemetry EEG streaming ingestion
            elif action in ["ingest_telemetry", "brain_data_stream"]:
                brain_data = data.get("brain_data", {})
                latency_ms = data.get("latency_ms", 40.0)

                focus_metrics = calculate_focus_score(brain_data)
                alpha_p = brain_data.get("alpha", 10.0)
                beta_p = brain_data.get("beta", 15.0)
                opt_polling_ms = signal_processor.optimize_polling_interval(alpha_p, beta_p)

                telemetry_res = tutor_ai.nfot.process_telemetry(latency_ms, brain_data)
                telemetry_res["recommended_polling_ms"] = opt_polling_ms

                await websocket.send(json.dumps({
                    "action": "telemetry_ack",
                    "focus_metrics": focus_metrics,
                    "nfot_telemetry": telemetry_res
                }))

            # 3. Handle concept switching
            elif action == "set_concept":
                concept_id = data.get("concept_id", "fractions_intro")
                success = tutor_ai.set_concept(concept_id)
                await websocket.send(json.dumps({
                    "action": "concept_set",
                    "success": success,
                    "prompt": tutor_ai.get_current_prompt()
                }))

            # 4. Handle reward requests
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
        try:
            await websocket.send(json.dumps({
                "action": "error",
                "error_message": f"Server connection resilience trigger: {str(e)}"
            }))
        except Exception:
            pass

# Main loop to spin up the local server
async def main():
    print("🧠 Noggin Local AI Engine starting up...")
    async with websockets.serve(focus_handler, "localhost", 8765):
        print("🛰️ Zero-Lag Tunnel active on ws://localhost:8765")
        await asyncio.Future()  # Keeps the server running continuously

if __name__ == "__main__":
    asyncio.run(main())
