"""Turn assets/source-prepped.png into a monochrome ASCII portrait SVG that
types itself in row by row (SMIL clip wipes + a riding block cursor), once.

STATIC=1 emits a frozen frame for local previews.
"""
import os
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "source-prepped.png"
OUT = ROOT / "jay-ascii.svg"
STATIC = os.environ.get("STATIC") == "1"

RAMP = " .`:-=+*cs#%@"  # dim (sparse) -> bright (dense): light glyphs on a dark terminal
COLS = 64               # rows follow from the photo's aspect ratio
CW, LH = 6.0, 10.0       # character cell in SVG units (monospace ~0.6em wide)
PAD = 14
FILL, BG, ACCENT = "#e6edf3", "#0d1117", "#00d4ff"
ROW_DUR, ROW_STAGGER, START = 0.32, 0.055, 0.3
GAMMA = 0.7
FLOOR = 1  # lowest ramp index inside the subject, so dark clothing still prints


def to_ascii():
    img = Image.open(SRC).convert("LA")
    # Cells are taller than wide, so fewer rows than the pixel aspect suggests.
    rows = round(COLS * CW / LH * img.height / img.width)
    img = img.resize((COLS, rows), Image.BOX)
    a = np.asarray(img, dtype=np.float32) / 255.0
    lum, alpha = a[:, :, 0] ** GAMMA, a[:, :, 1]
    idx = (lum * (len(RAMP) - 1)).round().astype(int)
    idx = np.clip(idx, FLOOR, len(RAMP) - 1)
    idx[alpha < 0.5] = 0
    lines = ["".join(RAMP[i] for i in row).rstrip() for row in idx]
    # Trim empty rows top and bottom.
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def main():
    lines = to_ascii()
    w = COLS * CW + 2 * PAD
    h = len(lines) * LH + 2 * PAD
    defs, body = [], []
    for r, line in enumerate(lines):
        if not line.strip():
            continue
        y = PAD + r * LH
        lw = len(line) * CW
        text = (
            f'<text x="{PAD}" y="{y + LH * 0.8:.1f}" textLength="{lw:.1f}" '
            f'lengthAdjust="spacingAndGlyphs" xml:space="preserve">{esc(line)}</text>'
        )
        if STATIC:
            body.append(text)
            continue
        begin = START + r * ROW_STAGGER
        defs.append(
            f'<clipPath id="r{r}"><rect x="{PAD}" y="{y}" width="0" height="{LH}">'
            f'<animate attributeName="width" from="0" to="{lw:.1f}" begin="{begin:.3f}s" '
            f'dur="{ROW_DUR}s" fill="freeze"/></rect></clipPath>'
        )
        body.append(f'<g clip-path="url(#r{r})">{text}</g>')
        # Block cursor rides the wipe edge, then disappears.
        body.append(
            f'<rect x="{PAD}" y="{y + 1}" width="{CW}" height="{LH - 2}" fill="{ACCENT}" opacity="0">'
            f'<set attributeName="opacity" to="0.9" begin="{begin:.3f}s"/>'
            f'<animate attributeName="x" from="{PAD}" to="{PAD + lw:.1f}" begin="{begin:.3f}s" '
            f'dur="{ROW_DUR}s" fill="freeze"/>'
            f'<set attributeName="opacity" to="0" begin="{begin + ROW_DUR:.3f}s"/></rect>'
        )

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w:.0f}" height="{h:.0f}" viewBox="0 0 {w:.0f} {h:.0f}" role="img" aria-label="ASCII portrait of Jay Vishwakarma">
<title>Jay Vishwakarma</title>
<style>text {{ font-family: ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size: {LH:.0f}px; font-weight: 600; fill: {FILL}; }}</style>
<rect width="100%" height="100%" rx="10" fill="{BG}"/>
<defs>{''.join(defs)}</defs>
{chr(10).join(body)}
</svg>
"""
    OUT.write_text(svg)
    print(f"wrote {OUT.relative_to(ROOT)} ({len(lines)} rows, {w:.0f}x{h:.0f})")
    if os.environ.get("PRINT") == "1":
        print("\n".join(lines))


if __name__ == "__main__":
    main()
