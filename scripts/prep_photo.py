"""Prep a photo for ASCII conversion (run locally, once per photo).

  1. rembg isolates the subject from the background
  2. CLAHE adds local contrast so a flatly-lit face gets real shadows
  3. keep the cutout as alpha so the background maps to blank glyphs

usage: python scripts/prep_photo.py assets/source-photo.jpg
writes assets/source-prepped.png (grayscale + alpha)
"""
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "source-prepped.png"
KEEP_TOP = 0.52  # crop to head + shoulders: fraction of the subject's height to keep


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "assets" / "source-photo.jpg")
    rgba = np.array(remove(Image.open(src).convert("RGB")))
    alpha = rgba[:, :, 3].astype(np.float32) / 255.0

    gray = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.6, tileGridSize=(8, 8))
    gray = clahe.apply(gray).astype(np.float32)

    # Stretch the subject's own tonal range to full scale (night photos are dim).
    lo, hi = np.percentile(gray[alpha > 0.5], [2, 98])
    gray = (gray - lo) / max(hi - lo, 1) * 255.0

    # Crop to the subject's bounding box.
    out = np.dstack([gray, alpha * 255.0])
    ys, xs = np.where(alpha > 0.5)
    top, bottom = ys.min(), ys.max()
    bottom = top + int((bottom - top) * KEEP_TOP)
    pad = 8
    crop = out[max(top - pad, 0):bottom, max(xs.min() - pad, 0):xs.max() + pad]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(crop.clip(0, 255).astype(np.uint8), "LA").save(OUT)
    print(f"wrote {OUT.relative_to(ROOT)} {crop.shape[1]}x{crop.shape[0]}")


if __name__ == "__main__":
    main()
