import time
import os
import sys

# Ensure root directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from python.generator import generate_brain_waves, TelemetryDataPipeline
from python.processor import NeuralSignalProcessor, calculate_focus_score
from noggimigo.Noggimigo import NoggimigoTutorEngine

def run_noggin_engine(max_cycles: int = 3):
    """
    Client-side computational pipeline for Noggin AI & Neural Telemetry.
    Ingests synthetic/hardware signals, processes NFOT metrics, and logs telemetry.
    """
    pipeline = TelemetryDataPipeline(log_dir="telemetry_logs")
    processor = NeuralSignalProcessor()
    tutor_ai = NoggimigoTutorEngine()

    SYSTEM_LATENCY = 0.040  # Local Edge Loop: 40ms
    ATTENTION_THRESHOLD = 2.0

    print("\033[92m[NOGGIN ENGINE] Initializing client-side computational pipeline...\033[0m")

    cycle_count = 0
    try:
        while cycle_count < max_cycles:
            cycle_count += 1
            # 1. Telemetry Ingestion
            brain_data = generate_brain_waves(hardware_type="synthetic")
            
            # 2. Validation & Processing
            focus_metrics = calculate_focus_score(brain_data)
            tbr = focus_metrics["tbr"]
            
            # 3. NFOT Feedback Loop Analysis
            telemetry = tutor_ai.nfot.process_telemetry(latency_ms=SYSTEM_LATENCY * 1000.0, brain_data=brain_data)
            
            # 4. Pipeline Recording
            pipeline.record_event(brain_data=brain_data, nfot_metrics=telemetry, student_action="evaluating")

            if tbr > ATTENTION_THRESHOLD:
                status_flag = "\033[93m[ATTENTION DECAY] Triggering Multimodal Scaffolding Reinforcement!\033[0m"
            else:
                status_flag = "\033[92m[SYNCHRONIZED] Cognitive state in high focus entrainment.\033[0m"

            print("====================================================")
            print(f"NEURAL FEEDBACK PIPELINE CYCLE #{cycle_count}")
            print("====================================================")
            print(f"TBR: {tbr:.3f} | Efficiency: {telemetry['efficiency']*100:.2f}% | ABETH Bias: {telemetry['abeth_bias']}")
            print(f"State: {status_flag}")
            
            bar_length = int(tbr * 10)
            meter = "█" * min(bar_length, 40)
            print(f"Live Brain Wave Ratio Meter: [{meter:<40}]\n")
            
            time.sleep(0.1)

        # Export telemetry data
        json_file = pipeline.export_json()
        csv_file = pipeline.export_csv()
        print(f"✅ Data pipeline logged {len(pipeline.buffer)} events to:")
        print(f"   -> JSON: {json_file}")
        print(f"   -> CSV:  {csv_file}")

    except KeyboardInterrupt:
        print("\n\033[93m[NOGGIN ENGINE] Local pipeline safely shut down.\033[0m")

if __name__ == "__main__":
    run_noggin_engine()
