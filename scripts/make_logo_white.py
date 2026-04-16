"""Convert logo.jpg → transparent-bg white logo PNG.

Reads /public/logo.jpg, treats light pixels as background (transparent) and
dark pixels as foreground (recolored to white). Writes /public/logo-white.png.
"""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
src = ROOT / "public" / "logo.jpg"
dst = ROOT / "public" / "logo-white.png"

img = Image.open(src).convert("RGBA")
px = img.load()
w, h = img.size

# Anything with brightness >= THRESHOLD becomes transparent;
# below-threshold pixels become white with alpha based on darkness.
THRESHOLD = 200

for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        brightness = (r + g + b) / 3
        if brightness >= THRESHOLD:
            px[x, y] = (255, 255, 255, 0)
        else:
            # Darker -> more opaque; scale alpha from brightness
            alpha = int(255 * (1 - brightness / THRESHOLD))
            px[x, y] = (255, 255, 255, alpha)

img.save(dst, "PNG")
print(f"Saved: {dst}  ({w}x{h})")
