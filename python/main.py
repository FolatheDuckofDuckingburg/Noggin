import time
import os
from core.generator import SyntheticEEGStream
from core.filter import ArtifactRejector
from core.processor import NeuralSignalProcessor

def run_noggin_engine():
    # Initialize zero-jitter local processing pipeline
    stream = SyntheticEEGStream()
    rejector = ArtifactRejector(threshold_uv=150.0)
    processor = NeuralSignalProcessor()
   
    SYSTEM_LATENCY = 0.040  # Local Edge Loop: 40ms
    STIMULUS_SALIENCE = 1.0
    ATTENTION_THRESHOLD = 2.0
    
    print("\033[92m[NOGGIN ENGINE] Initializing client-side computational pipeline...\033[0m")
    time.sleep(1)

    try:
        while True:
            # 1. Telemetry Ingestion
            raw_data = stream.get_latest_epoch()
            
            # 2. Real-Time Artifact Rejection Loop
            clean_data = rejector.evaluate_epoch(raw_data)
            
            # Clear terminal layout window dynamically for a clean look
            os.system('clear' if os.name == 'posix' else 'cls')
            print("====================================================")
            print("    NEURAL FEEDBACK OPTIMIZATION TERMINAL
                           by FolatheDuckofDuckingburg")
            print("====================================================")
            print(f"Host Execution: Client-Side | Precision Constraint: {SYSTEM_LATENCY*1000}ms\n")
            
            if clean_data is None:
                print("\033[91m[ARTIFACT REJECTED] |V(t)| > 150 uV. Nullifying epoch X(t) = ∅\033[0m")
                print("Skipping corrupted frame to protect dataset purity...")
                time.sleep(0.5)
                continue
                
            # 3. Spectral Transformation via FFT
            current_tbr = processor.calculate_tbr(clean_data)
            
            # 4. Inverse-Square Law Calculation: E = S / L^2
            if current_tbr > ATTENTION_THRESHOLD:
                # Attention drops, meaning external stimulus must scale up response
                dynamic_efficiency = (STIMULUS_SALIENCE * 0.2) / (SYSTEM_LATENCY ** 2)
                status_flag = "\033[93m[ATTENTION DECAY] Triggering Multimodal Feedback Reinforcement!\033[0m"
            else:
                dynamic_efficiency = STIMULUS_SALIENCE / (SYSTEM_LATENCY ** 2)
                status_flag = "\033[92m[SYNCHRONIZED] Brain states in phase-locked entrainment.\033[0m"
                
            # Print state machine data
            print(f"Current Theta-to-Beta Ratio (TBR): {current_tbr:.4f}")
            print(f"Calculated Learning Efficiency (E): {dynamic_efficiency:.2f}")
            print(f"Pipeline State: {status_flag}\n")
            
            # 5. Terminal-Based Visual Meter (Perfect for lightweight Linux environments)
            bar_length = int(current_tbr * 10)
            meter = "█" * min(bar_length, 40)
            print(f"Live Brain Wave Ratio Meter: [{meter:<40}]")
            
            # Sync to processing speed loop
            time.sleep(0.5)
            
    except KeyboardInterrupt:
        print("\n\033[93m[NOGGIN ENGINE] Local pipeline safely shut down.\033[0m")

if __name__ == "__main__":
    run_noggin_engine()
