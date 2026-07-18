import random

def generate_brain_waves():
    """
    Simulates streaming raw EEG frequency bands.
    Returns a dictionary with Theta and Beta values.
    """
    # Theta waves (associated with daydreaming/deep relaxation)
    theta = random.uniform(4.0, 10.0)
    
    # Beta waves (associated with active thinking and focus)
    beta = random.uniform(12.0, 30.0)
    
    return {
        "theta": round(theta, 2),
        "beta": round(beta, 2)
    }
