import pygame
import sys

# 1. Initialize Pygame
pygame.init()

# 2. Set up the display window
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Noggin Engine - Interactive Portal")

# 3. Define basic colors (RGB format)
BACKGROUND_COLOR = (20, 24, 33)   # Deep sleek dark blue
TEXT_COLOR = (240, 240, 245)     # Off-white for visibility

# Set up a font for text
font = pygame.font.SysFont("Arial", 28)

# Control how fast the game updates
clock = pygame.time.Clock()

print("[SUCCESS] Pygame window initialized. Control panel active.")

# 4. The Core Game Loop
while True:
    # --- EVENT HANDLING (Checking for Inputs) ---
    for event in pygame.event.get():
        # If the user clicks the "X" button on the window, close it safely
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
            
    # --- GAME LOGIC (Where your adaptive loops will compute) ---
    # (This is where the student focus scores and calculations will go later)

    # --- DRAWING CODE (Updating the Visuals) ---
    # Clear the screen with our background color first
    screen.fill(BACKGROUND_COLOR)

    # Render some text onto a surface
    text_surface = font.render("Noggin Subsystem Active - Awaiting Data...", True, TEXT_COLOR)
    
    # Draw (blit) the text onto the screen at coordinates (x=50, y=50)
    screen.blit(text_surface, (50, 50))

    # Update the full display Surface to the monitor
    pygame.display.flip()

    # Lock the game loop to 60 frames per second
    clock.tick(60)
