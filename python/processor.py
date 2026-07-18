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
    
    # Determine the cognitive state threshold
    if tbr > 0.5:  # High theta relative to beta
        state = "ATTENTION_DECAY"
    else:
        state = "HIGH_FOCUS"
        
    return {
        "tbr": round(tbr, 3),
        "state": state
    }
