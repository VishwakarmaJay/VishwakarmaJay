import { useState, useEffect } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonamiCode() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let index = 0

    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        index++
        if (index === KONAMI.length) {
          setActive(true)
          index = 0
        }
      } else {
        index = 0
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return { active, deactivate: () => setActive(false) }
}