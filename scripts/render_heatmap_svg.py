"""Render data/contributions.json as an animated, terminal-framed heatmap SVG.

Cells drop in along a diagonal sweep once on load, then freeze (no loop).
STATIC=1 skips the animation for local previews.
"""
import json
import os
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "contributions.json"
OUT = ROOT / "contrib-heatmap.svg"
STATIC = os.environ.get("STATIC") == "1"

PALETTE = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353", "#69f0a0"]
#          none -> brightest (level 5 is reserved for the best day(s))

CELL, GAP = 12, 3
STEP = CELL + GAP
PAD_X, GRID_Y = 44, 86
BG, CHROME, FG, MUTED, ACCENT = "#0d1117", "#161b22", "#c9d1d9", "#6e7681", "#00d4ff"
FONT = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"
MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def main():
    data = json.loads(DATA.read_text())
    days = data["days"]
    peak = max((d["count"] for d in days), default=0)

    first = date.fromisoformat(days[0]["date"])
    lead = (first.weekday() + 1) % 7  # GitHub weeks start on Sunday
    weeks = (lead + len(days) + 6) // 7
    W = 2 * PAD_X + weeks * STEP - GAP

    cells, labels = [], []
    last_month = None
    for i, d in enumerate(days):
        slot = lead + i
        col, row = divmod(slot, 7)
        x, y = PAD_X + col * STEP, GRID_Y + row * STEP
        level = 5 if peak and d["count"] == peak else d["level"]
        delay = 0.6 + (col + row) * 0.022
        anim = "" if STATIC else f' style="animation-delay:{delay:.3f}s"'
        tip = f'{d["count"]} contribution{"" if d["count"] == 1 else "s"} on {d["date"]}'
        cells.append(
            f'<rect class="c" x="{x}" y="{y}" width="{CELL}" height="{CELL}" rx="3" '
            f'fill="{PALETTE[level]}"{anim}><title>{tip}</title></rect>'
        )
        # Label a month at the first week column that starts inside it.
        month = d["date"][:7]
        if row == 0 and month != last_month and col < weeks - 1:
            labels.append(
                f'<text x="{x}" y="{GRID_Y - 8}" class="m">{MONTHS[int(month[5:]) - 1]}</text>'
            )
            last_month = month

    grid_h = 7 * STEP
    legend_y = GRID_Y + grid_h + 14
    H = legend_y + 70

    day_labels = "".join(
        f'<text x="{PAD_X - 8}" y="{GRID_Y + r * STEP + 10}" class="m" text-anchor="end">{n}</text>'
        for r, n in ((1, "Mon"), (3, "Wed"), (5, "Fri"))
    )

    lx = W - PAD_X - (len(PALETTE) * STEP + 66)
    legend = [f'<text x="{lx}" y="{legend_y + 10}" class="m">Less</text>']
    for i, color in enumerate(PALETTE):
        legend.append(
            f'<rect x="{lx + 32 + i * STEP}" y="{legend_y}" width="{CELL}" height="{CELL}" rx="3" fill="{color}"/>'
        )
    legend.append(f'<text x="{lx + 38 + len(PALETTE) * STEP}" y="{legend_y + 10}" class="m">More</text>')

    total = f'{data["total"]:,}'
    best = data["best_day"]
    stats = [
        ("contributions", total),
        ("current streak", f'{data["current_streak"]}d'),
        ("longest streak", f'{data["longest_streak"]}d'),
        ("active days", str(data["active_days"])),
        ("best day", f'{best["count"]} on {best["date"]}'),
    ]
    stat_y = legend_y + 48
    col_w = (W - 2 * PAD_X) / len(stats)
    stat_svg = "".join(
        f'<g class="s" style="animation-delay:{2.4 + i * 0.12:.2f}s">'
        f'<text x="{PAD_X + i * col_w}" y="{stat_y - 16}" class="k">{esc(k)}</text>'
        f'<text x="{PAD_X + i * col_w}" y="{stat_y + 2}" class="v">{esc(v)}</text></g>'
        for i, (k, v) in enumerate(stats)
    )

    css = f"""
    text {{ font-family: {FONT}; }}
    .m {{ fill: {MUTED}; font-size: 10px; }}
    .k {{ fill: {MUTED}; font-size: 10px; letter-spacing: .5px; }}
    .v {{ fill: {FG}; font-size: 15px; font-weight: 600; }}
    .t {{ fill: {MUTED}; font-size: 11px; }}
    .p {{ fill: {ACCENT}; font-size: 12px; }}
    .h {{ fill: {FG}; font-size: 12px; }}
    """
    if not STATIC:
        css += """
    .c { transform-box: fill-box; transform-origin: center; opacity: 0;
         animation: drop .45s cubic-bezier(.2,.9,.3,1.3) forwards; }
    .s { opacity: 0; animation: fade .5s ease-out forwards; }
    .cur { animation: blink 1s steps(1) 6 forwards; }
    @keyframes drop { from { opacity: 0; transform: translateY(-8px) scale(.4); }
                      to { opacity: 1; transform: none; } }
    @keyframes fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
    @keyframes blink { 50% { opacity: 0; } }
    """

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="{total} GitHub contributions in the last year">
<title>{total} contributions in the last year</title>
<style>{css}</style>
<rect width="{W}" height="{H}" rx="10" fill="{BG}" stroke="#30363d"/>
<path d="M0 10a10 10 0 0 1 10-10h{W - 20}a10 10 0 0 1 10 10v20H0z" fill="{CHROME}"/>
<circle cx="18" cy="15" r="5" fill="#ff5f57"/><circle cx="34" cy="15" r="5" fill="#febc2e"/><circle cx="50" cy="15" r="5" fill="#28c840"/>
<text x="{W / 2}" y="19" class="t" text-anchor="middle">jay@github: ~/contributions</text>
<text x="{PAD_X - 24}" y="54" class="p">jay@github ~ $</text>
<text x="{PAD_X + 92}" y="54" class="h">./contributions.sh --last 365d</text>
<rect class="cur" x="{PAD_X + 92 + 31 * 7.25:.0f}" y="44" width="7" height="13" fill="{ACCENT}"/>
{''.join(labels)}
{day_labels}
{''.join(cells)}
{''.join(legend)}
<text x="{PAD_X}" y="{legend_y + 10}" class="m">{total} contributions in the last year · updated {esc(data["generated"])}</text>
{stat_svg}
</svg>
"""
    OUT.write_text(svg)
    print(f"wrote {OUT.relative_to(ROOT)} ({weeks} weeks, {W}x{H})")


if __name__ == "__main__":
    main()
