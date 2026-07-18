import asyncio
import websockets
import json

# This handles data traveling through the Zero-Lag Tunnel
async def focus_handler(websocket):
    print(f"⚡ Client connected from: {websocket.remote_address}")
    try:
        async for message in websocket:
            data = json.loads(message)
            print(f"📥 Received from client: {data}")
            
            # If the frontend asks for a reward, send it instantly
            if data.get("status") == "request_reward":
                response = {
                    "action": "trigger_sticker",
                    "sticker": "custom_mallard_duck"
                }
                await websocket.send(json.dumps(response))
                print("🦆 Instant duck sticker reward sent across the tunnel!")
                
    except websockets.exceptions.ConnectionClosedOK:
        print("🔌 Client disconnected cleanly.")
    except Exception as e:
        print(f"❌ Error encountered: {e}")

# Main loop to spin up the local server
async def main():
    print("🧠 Noggin Local Engine starting up...")
    async with websockets.serve(focus_handler, "localhost", 8765):
        print("🛰️ Zero-Lag Tunnel active on ws://localhost:8765")
        await asyncio.Future()  # Keeps the server running continuously

if __name__ == "__main__":
    asyncio.run(main())
