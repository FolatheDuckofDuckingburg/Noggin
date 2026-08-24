import random
import time
import json
import csv
import os

def generate_brain_waves(hardware_type: str = "synthetic") -> dict:
    """
    Simulates streaming raw EEG frequency bands (Theta, Beta, Alpha, Gamma).
    Supports synthetic simulation mode and hardware profile configurations.
    """
    if hardware_type == "muse":
        theta = random.uniform(3.5, 9.5)
        beta = random.uniform(13.0, 28.0)
        alpha = random.uniform(7.0, 13.0)
        gamma = random.uniform(30.0, 45.0)
    elif hardware_type == "openbci":
        theta = random.uniform(4.0, 10.0)
        beta = random.uniform(12.0, 32.0)
        alpha = random.uniform(8.0, 14.0)
        gamma = random.uniform(25.0, 50.0)
    else:
        # Synthetic default
        theta = random.uniform(4.0, 10.0)
        beta = random.uniform(12.0, 30.0)
        alpha = random.uniform(8.0, 13.0)
        gamma = random.uniform(25.0, 45.0)

    return {
        "timestamp": round(time.time(), 3),
        "hardware_type": hardware_type,
        "theta": round(theta, 2),
        "beta": round(beta, 2),
        "alpha": round(alpha, 2),
        "gamma": round(gamma, 2)
    }


class TelemetryDataPipeline:
    """
    Data Pipeline for telemetry ingestion, validation, logging,
    and export formats (JSON & CSV) for AI model research and offline training.
    """
    def __init__(self, log_dir: str = "telemetry_logs"):
        self.log_dir = log_dir
        os.makedirs(self.log_dir, exist_ok=True)
        self.buffer = []

    def validate_telemetry(self, brain_data: dict) -> bool:
        """Validates incoming telemetry signals against physiological thresholds."""
        if not isinstance(brain_data, dict):
            return False
        required_keys = ["theta", "beta"]
        for k in required_keys:
            if k not in brain_data:
                return False
            val = brain_data[k]
            if not isinstance(val, (int, float)) or val < 0 or val > 200:
                return False
        return True

    def record_event(self, brain_data: dict, nfot_metrics: dict = None, student_action: str = None) -> dict:
        """Records telemetry frame event to buffer after validation."""
        valid = self.validate_telemetry(brain_data)
        if not valid:
            brain_data = {"theta": 5.0, "beta": 15.0, "alpha": 10.0, "gamma": 25.0, "invalid": True}

        record = {
            "timestamp": round(time.time(), 3),
            "brain_data": brain_data,
            "nfot_metrics": nfot_metrics or {},
            "student_action": student_action or "idle"
        }
        self.buffer.append(record)
        return record

    def export_json(self, filename: str = None) -> str:
        """Exports buffered telemetry records to a formatted JSON file."""
        filename = filename or os.path.join(self.log_dir, f"telemetry_{int(time.time())}.json")
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.buffer, f, indent=2)
        return filename

    def export_csv(self, filename: str = None) -> str:
        """Exports buffered telemetry records to a CSV file for model training."""
        filename = filename or os.path.join(self.log_dir, f"telemetry_{int(time.time())}.csv")
        headers = [
            "timestamp", "theta", "beta", "alpha", "gamma",
            "write_back_gap_ms", "efficiency", "tbr", "abeth_bias", "student_action"
        ]
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            for rec in self.buffer:
                bd = rec.get("brain_data", {})
                nm = rec.get("nfot_metrics", {})
                writer.writerow({
                    "timestamp": rec.get("timestamp"),
                    "theta": bd.get("theta", 0.0),
                    "beta": bd.get("beta", 0.0),
                    "alpha": bd.get("alpha", 0.0),
                    "gamma": bd.get("gamma", 0.0),
                    "write_back_gap_ms": nm.get("write_back_gap_ms", 0.0),
                    "efficiency": nm.get("efficiency", 0.0),
                    "tbr": nm.get("tbr", 0.0),
                    "abeth_bias": nm.get("abeth_bias", "NONE"),
                    "student_action": rec.get("student_action")
                })
        return filename
