import time
import os
import sys

# Ensure python/ submodules can be imported if core package isn't present
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from generator import generate_brain_waves
from processor import calculate_focus_score, NeuralSignalProcessor

def run_noggin_engine():
    # Initialize zero-jitter local processing pipeline
    processor = NeuralSignalProcessor()
   
    SYSTEM_LATENCY = 0.040  # Local Edge Loop: 40ms
    STIMULUS_SALIENCE = 1.0
    ATTENTION_THRESHOLD = 2.0
    
    print("\033[92m[NOGGIN ENGINE] Initializing client-side computational pipeline...\033[0m")
    time.sleep(1)

    try:
        while True:
            # 1. Telemetry Ingestion (using generator)
            raw_data = generate_brain_waves()
            
            # Clear terminal layout window dynamically for a clean look
            os.system('clear' if os.name == 'posix' else 'cls')
            print("====================================================")
            print("    NEURAL FEEDBACK OPTIMIZATION TERMINAL")
            print("           by FolatheDuckofDuckingburg")
            print("====================================================")
            print(f"Host Execution: Client-Side | Precision Constraint: {SYSTEM_LATENCY*1000}ms\n")
            
            # 2. Spectral Transformation & Ratio calculation
            current_tbr = processor.calculate_tbr(raw_data)
            
            # 3. Inverse-Square Law Calculation: E = S / L^2
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
            
            # 4. Terminal-Based Visual Meter
            bar_length = int(current_tbr * 5)
            meter = "█" * min(bar_length, 40)
            print(f"Live Brain Wave Ratio Meter: [{meter:<40}]")
            
            # Sync to processing speed loop
            time.sleep(0.5)
            
    except KeyboardInterrupt:
        print("\n\033[93m[NOGGIN ENGINE] Local pipeline safely shut down.\033[0m")

if __name__ == "__main__":
    run_noggin_engine()
