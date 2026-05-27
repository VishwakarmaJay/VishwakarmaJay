import { useState, useEffect } from 'react'

const BASE = 8412

export function useVisitorCounter() {
  const [visits, setVisits] = useState<number>(0)

  useEffect(() => {
    let stored = parseInt(localStorage.getItem('jrv_visits') || '0')
    if (!stored) {
      stored = BASE + Math.floor(Math.random() * 300)
      localStorage.setItem('jrv_visits', stored.toString())
    }
    stored++
    localStorage.setItem('jrv_visits', stored.toString())
    setVisits(stored)
  }, [])

  return visits
}