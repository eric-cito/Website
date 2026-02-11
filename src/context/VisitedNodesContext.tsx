import { createContext, useCallback, useContext, useState } from 'react'

const VISITED_KEY = 'neuron-portfolio-visited'

function loadVisited(): Set<string> {
  try {
    const raw = sessionStorage.getItem(VISITED_KEY)
    if (raw) {
      const arr = JSON.parse(raw) as string[]
      return new Set(Array.isArray(arr) ? arr : [])
    }
  } catch (_) {}
  return new Set()
}

const SHAKE_DURATION_MS = 550

type VisitedContextValue = {
  visitedNodeIds: Set<string>
  addVisited: (id: string) => void
  clearMemory: () => void
  clearTriggeredAt: number | null
}

const VisitedNodesContext = createContext<VisitedContextValue | null>(null)

export function VisitedNodesProvider({ children }: { children: React.ReactNode }) {
  const [visitedNodeIds, setVisitedNodeIds] = useState<Set<string>>(loadVisited)
  const [clearTriggeredAt, setClearTriggeredAt] = useState<number | null>(null)

  const addVisited = useCallback((id: string) => {
    setVisitedNodeIds((prev) => {
      const next = new Set(prev).add(id)
      try {
        sessionStorage.setItem(VISITED_KEY, JSON.stringify([...next]))
      } catch (_) {}
      return next
    })
  }, [])

  const clearMemory = useCallback(() => {
    if (visitedNodeIds.size === 0) return
    setClearTriggeredAt(performance.now())
    const timeoutId = setTimeout(() => {
      setVisitedNodeIds(new Set())
      try {
        sessionStorage.removeItem(VISITED_KEY)
      } catch (_) {}
      setClearTriggeredAt(null)
    }, SHAKE_DURATION_MS)
    return () => clearTimeout(timeoutId)
  }, [visitedNodeIds.size])

  return (
    <VisitedNodesContext.Provider value={{ visitedNodeIds, addVisited, clearMemory, clearTriggeredAt }}>
      {children}
    </VisitedNodesContext.Provider>
  )
}

export function useVisitedNodes() {
  const ctx = useContext(VisitedNodesContext)
  if (!ctx) throw new Error('useVisitedNodes must be used within VisitedNodesProvider')
  return ctx
}
