def calculate_focus_score(brain_data):
    """
    Calculates the Theta-to-Beta Ratio (TBR).
    Higher TBR typically indicates attention decay or mind-wandering.
    """
    theta = brain_data.get("theta", 1.0)
    beta = brain_data.get("beta", 1.0)
    
    # Prevent division by zero
    if beta == 0:
        beta = 0.1
        
    tbr = theta / beta
    
    # Determine cognitive state threshold with NFOT calibration
    if tbr > 2.0:  # High theta relative to beta
        state = "ATTENTION_DECAY"
    else:
        state = "HIGH_FOCUS"
        
    return {
        "tbr": round(tbr, 3),
        "state": state
    }

class NeuralSignalProcessor:
    """
    Real-time neural signal processor supporting band power transformations
    and Theta-to-Beta Ratio (TBR) metrics for NFOT feedback loop.
    """
    def __init__(self, sample_rate=250):
        self.sample_rate = sample_rate

    def calculate_tbr(self, epoch_data):
        """Calculates Theta-to-Beta ratio from signal epoch matrix or spectrum."""
        if epoch_data is None:
            return 1.0

        # If passed a dictionary with explicit band powers
        if isinstance(epoch_data, dict):
            res = calculate_focus_score(epoch_data)
            return res["tbr"]

        # If passed raw array/list signal
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
