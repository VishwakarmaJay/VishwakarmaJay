"""Scrape the public contribution calendar and write data/contributions.json.

No token needed: github.com/users/<user>/contributions is the same HTML
fragment the profile page renders.
"""
import json
import os
import re
from collections import OrderedDict
from datetime import date
from pathlib import Path

import requests
from bs4 import BeautifulSoup

USERNAME = os.environ.get("GH_USER", "VishwakarmaJay")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "contributions.json"


def fetch_days():
    url = f"https://github.com/users/{USERNAME}/contributions"
    resp = requests.get(url, headers={"User-Agent": "profile-art-bot"}, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # Tooltips carry the counts ("3 contributions on May 2nd."), keyed by cell id.
    counts = {}
    for tip in soup.select("tool-tip[for]"):
        m = re.match(r"(\d+|No) contributions?", tip.get_text(strip=True))
        if m:
            counts[tip["for"]] = 0 if m.group(1) == "No" else int(m.group(1))

    days = []
    for cell in soup.select("td.ContributionCalendar-day[data-date]"):
        days.append({
            "date": cell["data-date"],
            "level": int(cell.get("data-level", 0)),
            "count": counts.get(cell.get("id"), 0),
        })
    days.sort(key=lambda d: d["date"])
    return days


def streaks(days):
    longest = run = 0
    for d in days:
        run = run + 1 if d["count"] else 0
        longest = max(longest, run)

    # Current streak: today may still be empty, so start from yesterday then.
    current = 0
    tail = list(days)
    if tail and tail[-1]["count"] == 0:
        tail.pop()
    for d in reversed(tail):
        if not d["count"]:
            break
        current += 1
    return current, longest


def main():
    days = fetch_days()
    if not days:
        raise SystemExit("no contribution cells found — markup may have changed")

    current, longest = streaks(days)
    best = max(days, key=lambda d: d["count"])
    months = OrderedDict()
    for d in days:
        months[d["date"][:7]] = months.get(d["date"][:7], 0) + d["count"]

    data = {
        "user": USERNAME,
        "generated": date.today().isoformat(),
        "total": sum(d["count"] for d in days),
        "current_streak": current,
        "longest_streak": longest,
        "best_day": {"date": best["date"], "count": best["count"]},
        "active_days": sum(1 for d in days if d["count"]),
        "months": months,
        "days": days,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=1))
    print(f"wrote {OUT.relative_to(ROOT)}: {data['total']} contributions, {len(days)} days")


if __name__ == "__main__":
    main()
