import { useState, useEffect } from 'react'

const DOB = new Date('2002-07-05T14:51:00Z')

function getAge(): number {
  const now = new Date()
  const ms = now.getTime() - DOB.getTime()
  return ms / (1000 * 60 * 60 * 24 * 365.25)
}

export function useAgeCounter() {
  const [age, setAge] = useState<number>(getAge())

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge())
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return age
}
