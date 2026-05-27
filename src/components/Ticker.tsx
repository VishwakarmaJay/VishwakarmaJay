const items = [
  '★ FLUTTER', 'DART', 'RIVERPOD', 'CLEAN ARCHITECTURE', 'AUTOROUTE',
  'DIO', 'SHOREBIRD OTA', 'OFFLINE-FIRST', 'OPENAPI / SWAGGER',
  'FIREBASE', 'GOOGLE MAPS SDK', 'PLAY STORE', 'APP STORE',
  '★ CURRENTLY: FLUTTER DEV @ BLACKCURRANT LABS',
]

export default function Ticker() {
  const allItems = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-border py-3.5 relative">
      <div
        className="flex whitespace-nowrap animate-ticker font-mono text-xs text-muted tracking-[2px]"
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className={`mr-[60px] ${item.startsWith('★') ? 'text-accent' : ''}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}