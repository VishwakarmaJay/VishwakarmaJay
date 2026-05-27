import { useState, useEffect, useRef } from 'react'

const titles = [
  'Flutter Developer',
  'Mobile App Engineer',
  'Full Stack Dev',
  'Clean Arch Nerd',
  'App Store Shipper',
]

export function useTypingEffect(delay = 1200) {
  const [text, setText] = useState('')
  const stateRef = useRef({
    titleIndex: 0,
    charIndex: 0,
    deleting: false,
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const run = () => {
      const state = stateRef.current
      const current = titles[state.titleIndex]
      let nextDelay: number

      if (!state.deleting) {
        const nextText = current.slice(0, state.charIndex + 1)
        setText(nextText)
        state.charIndex++
        if (state.charIndex >= current.length) {
          state.deleting = true
          nextDelay = 1800
        } else {
          nextDelay = 80
        }
      } else {
        const nextText = current.slice(0, state.charIndex - 1)
        setText(nextText)
        state.charIndex--
        if (state.charIndex <= 0) {
          state.deleting = false
          state.titleIndex = (state.titleIndex + 1) % titles.length
          state.charIndex = 0
          nextDelay = 400
        } else {
          nextDelay = 50
        }
      }

      timeoutId = setTimeout(run, nextDelay)
    }

    timeoutId = setTimeout(run, delay)
    return () => clearTimeout(timeoutId)
  }, [delay])

  return text
}