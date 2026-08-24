import math

def calculate_focus_score(brain_data: dict) -> dict:
    """
    Calculates the Theta-to-Beta Ratio (TBR) and Alpha Power Ratio.
    Higher TBR indicates cognitive fatigue or attention decay.
    Optimal Alpha/Beta ratios reflect calm focus.
    """
    if not brain_data:
        brain_data = {"theta": 5.0, "beta": 15.0, "alpha": 10.0}

    theta = brain_data.get("theta", 5.0)
    beta = brain_data.get("beta", 15.0)
    alpha = brain_data.get("alpha", 10.0)

    beta_denom = beta if beta != 0 else 0.1
    tbr = round(theta / beta_denom, 3)
    alpha_beta_ratio = round(alpha / beta_denom, 3)

    if tbr > 2.2:
        state = "ATTENTION_DECAY"
    elif tbr < 1.0 and alpha_beta_ratio < 1.2:
        state = "HIGH_FOCUS"
    else:
        state = "BALANCED_ENGAGEMENT"

    return {
        "tbr": tbr,
        "alpha_beta_ratio": alpha_beta_ratio,
        "state": state
    }

class NeuralSignalProcessor:
    """
    Real-time neural signal processor supporting band power transformations,
    Theta-to-Beta Ratio (TBR), Alpha band power ratios, and adaptive NFOT polling optimization.
    """
    def __init__(self, sample_rate: int = 250):
        self.sample_rate = sample_rate
        self.min_sleep_ms = 50.0   # 50ms responsive threshold
        self.max_sleep_ms = 800.0  # 800ms resource-conservation threshold

    def calculate_tbr(self, epoch_data) -> float:
        """Calculates Theta-to-Beta ratio from signal epoch matrix or spectrum dictionary."""
        if epoch_data is None:
            return 1.0

        if isinstance(epoch_data, dict):
            res = calculate_focus_score(epoch_data)
            return res["tbr"]

        try:
            import numpy as np
            fft_vals = np.abs(np.fft.rfft(epoch_data))
            freqs = np.fft.rfftfreq(len(epoch_data), 1.0 / self.sample_rate)

            theta_idx = (freqs >= 4.0) & (freqs <= 8.0)
            beta_idx = (freqs >= 13.0) & (freqs <= 30.0)

            theta_power = np.sum(fft_vals[theta_idx]) if np.any(theta_idx) else 1.0
            beta_power = np.sum(fft_vals[beta_idx]) if np.any(beta_idx) else 1.0

            if beta_power == 0:
                beta_power = 0.1

            return float(theta_power / beta_power)
        except Exception:
            return 1.0

    def optimize_polling_interval(self, alpha_power: float, beta_power: float) -> float:
        """
        Dynamically optimizes NFOT polling interval (ms) using Alpha/Beta ratio sigmoidal modulation.
        Higher alpha relative to beta compresses the polling gap for real-time responsiveness.
        """
        beta_denom = beta_power if beta_power != 0 else 0.1
        ratio = alpha_power / beta_denom
        # Sigmoidal mapping
        gain = 1.0 / (1.0 + math.exp(-10.0 * (ratio - 0.5)))
        optimized_ms = self.max_sleep_ms - (gain * (self.max_sleep_ms - self.min_sleep_ms))
        return round(optimized_ms, 2)
