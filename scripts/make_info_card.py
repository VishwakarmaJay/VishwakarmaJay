"""Hand-authored neofetch-style info card that prints line by line.

Its height matches the ASCII portrait as laid out in the README, so the two
columns line up. STATIC=1 emits a frozen frame for local previews.
"""
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "info-card.svg"
PORTRAIT = ROOT / "jay-ascii.svg"
STATIC = os.environ.get("STATIC") == "1"

# README column widths: portrait + card = heatmap width (860).
PORTRAIT_W, CARD_W = 400, 460

BG, FG, MUTED, KEY = "#0d1117", "#c9d1d9", "#6e7681", "#00d4ff"
FONT = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"

# (key, value); key None = continuation line, "" = blank spacer.
ROWS = [
    ("Role", "Flutter Developer @ BlackCurrant Labs"),
    ("Location", "Mumbai, India"),
    ("Uptime", "1.5+ yrs shipping production apps"),
    ("Education", "B.Tech IT · TCET · 8.8 CGPA"),
    ("", ""),
    ("Mobile", "Flutter · Dart · Riverpod · AutoRoute"),
    (None, "Dio · OpenAPI · Shorebird OTA"),
    ("Backend", "Express · Spring Boot · Firebase"),
    ("Web", "Angular · TypeScript"),
    ("Data", "PostgreSQL · MongoDB · MySQL"),
    ("", ""),
    ("Shipped", "Hedged — FinTech signals (Play + App Store)"),
    (None, "Stulz FSA — offline-first field service"),
    ("Obsessed", "Clean arch · apps that survive bad WiFi"),
]
SWATCHES = ["#30363d", "#ff7b72", "#3fb950", "#d29922", "#58a6ff", "#bc8cff", "#39c5cf", "#c9d1d9"]


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def target_height():
    m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', PORTRAIT.read_text())
    pw, ph = float(m.group(1)), float(m.group(2))
    return round(PORTRAIT_W * ph / pw)  # card is drawn at 1:1 in its column


def main():
    W, H = CARD_W, target_height()
    x0, y, lh = 22, 34, 19.5
    key_w = 92
    lines = []

    def line(svg):
        lines.append(svg)

    line(f'<text x="{x0}" y="{y}"><tspan class="u">jay</tspan><tspan class="d">@</tspan>'
         f'<tspan class="u">vishwakarma</tspan></text>')
    y += lh - 6
    line(f'<rect x="{x0}" y="{y - 8}" width="{15 * 7.8:.0f}" height="1.5" fill="{MUTED}"/>')
    y += lh - 4
    for key, val in ROWS:
        if key == "":
            y += lh * 0.5
            continue
        k = f'<tspan class="k">{esc(key)}</tspan>' if key else ""
        line(f'<text x="{x0}" y="{y:.1f}">{k}</text>'
             f'<text x="{x0 + key_w}" y="{y:.1f}" class="v">{esc(val)}</text>')
        y += lh
    y += 8
    sw = "".join(
        f'<rect x="{x0 + i * 26}" y="{y - 12}" width="22" height="14" rx="2" fill="{c}"/>'
        for i, c in enumerate(SWATCHES)
    )
    line(sw)
    H = max(H, int(y + 20))

    body = []
    for i, svg in enumerate(lines):
        if STATIC:
            body.append(f"<g>{svg}</g>")
        else:
            body.append(f'<g class="l" style="animation-delay:{0.5 + i * 0.13:.2f}s">{svg}</g>')

    anim = "" if STATIC else """
    .l { opacity: 0; animation: in .45s ease-out forwards; }
    @keyframes in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
    """
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="Jay Vishwakarma — Flutter Developer, Mumbai">
<title>Jay Vishwakarma — Flutter Developer</title>
<style>
    text {{ font-family: {FONT}; font-size: 12.5px; fill: {FG}; }}
    .u {{ fill: {KEY}; font-weight: 700; font-size: 14px; }}
    .d {{ fill: {FG}; font-size: 14px; }}
    .k {{ fill: {KEY}; font-weight: 600; }}
    .v {{ fill: {FG}; }}{anim}
</style>
<rect width="{W}" height="{H}" rx="10" fill="{BG}"/>
{chr(10).join(body)}
</svg>
"""
    OUT.write_text(svg)
    print(f"wrote {OUT.relative_to(ROOT)} ({W}x{H})")


if __name__ == "__main__":
    main()
