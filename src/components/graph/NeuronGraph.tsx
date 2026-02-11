import { useRef, useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from 'three'
import { graphData } from '../../data/nodes'
import { useVisitedNodes } from '../../context/VisitedNodesContext'

interface GraphNode extends Record<string, unknown> {
  id: string
  name?: string
  title?: string
  href?: string
}

const ACCENT_COLOR = 0x22d3ee
const HIGHLIGHT_COLOR = 0x67e8f9
const VISITED_COLOR = 0x22c55e
const VISITED_GLOW = 0x4ade80

// Deterministic "random" from string (for spine positions per node)
function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

// Helper: add a cylinder along direction from base position
function addCylinder(
  group: THREE.Group,
  base: THREE.Vector3,
  dir: THREE.Vector3,
  length: number,
  radiusTop: number,
  radiusBottom: number,
  material: THREE.Material
) {
  const cyl = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, length, 8),
    material
  )
  cyl.position.copy(base).add(dir.clone().multiplyScalar(length / 2))
  cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  group.add(cyl)
  return base.clone().add(dir.clone().normalize().multiplyScalar(length))
}

function createNeuronMesh(node: GraphNode, isHighlight: boolean, isVisited: boolean) {
  const group = new THREE.Group()
  const baseScale = isHighlight ? 4.4 : 3.8

  const seed = hash(String(node.id))
  const useGreen = isVisited && !isHighlight
  const branchColor = isHighlight ? HIGHLIGHT_COLOR : useGreen ? 0x16a34a : 0x06b6d4
  const glowColor = isHighlight ? 0xa5f3fc : useGreen ? VISITED_GLOW : 0x22d3ee
  const somaColor = useGreen ? VISITED_COLOR : ACCENT_COLOR

  // 1. Cell body (soma) - one ellipsoid, organic shape
  const somaGeom = new THREE.SphereGeometry(0.65, 28, 28)
  somaGeom.scale(1.15, 0.9, 1.1)
  const somaMat = new THREE.MeshStandardMaterial({
    color: somaColor,
    emissive: somaColor,
    emissiveIntensity: isHighlight ? 0.45 : isVisited ? 0.35 : 0.28,
    transparent: true,
    opacity: 0.94,
  })
  const soma = new THREE.Mesh(somaGeom, somaMat)
  group.add(soma)

  // 2. Nucleus - bright central core
  const nucleusGeom = new THREE.SphereGeometry(0.2, 16, 16)
  const nucleusMat = new THREE.MeshBasicMaterial({
    color: glowColor,
    transparent: true,
    opacity: 0.98,
  })
  const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat)
  group.add(nucleus)

  const dendriteMat = new THREE.MeshBasicMaterial({
    color: branchColor,
    transparent: true,
    opacity: 0.92,
  })
  const terminalGeom = new THREE.SphereGeometry(0.1, 10, 10)
  const terminalMat = new THREE.MeshBasicMaterial({
    color: glowColor,
    transparent: true,
    opacity: 1,
  })

  // 3. Dendritic trees - each tree branches (primary -> 2 secondaries -> terminals)
  const treeCount = 6
  for (let i = 0; i < treeCount; i++) {
    const phi = Math.PI * ((seed + i * 31) % 97) / 97
    const theta = (2 * Math.PI * ((seed + i * 17) % 89)) / 89
    const primaryDir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi)
    )
    const primaryLen = 0.35 + ((seed + i * 7) % 25) / 100
    const base = primaryDir.clone().multiplyScalar(0.72)
    const primaryEnd = addCylinder(
      group, base, primaryDir, primaryLen, 0.04, 0.12, dendriteMat.clone()
    )

    // Two secondary branches (dendritic branching)
    const spread = 0.5 + ((seed + i * 13) % 30) / 100
    const perp = new THREE.Vector3(primaryDir.y, -primaryDir.x, 0).normalize()
    const sec1Dir = primaryDir.clone().multiplyScalar(0.7).add(perp.clone().multiplyScalar(spread)).normalize()
    const sec2Dir = primaryDir.clone().multiplyScalar(0.7).add(perp.clone().multiplyScalar(-spread * 0.8)).normalize()
    const secLen = 0.25 + ((seed + i * 19) % 20) / 100

    const end1 = addCylinder(group, primaryEnd, sec1Dir, secLen, 0.03, 0.05, dendriteMat.clone())
    const end2 = addCylinder(group, primaryEnd, sec2Dir, secLen, 0.03, 0.05, dendriteMat.clone())

    const t1 = new THREE.Mesh(terminalGeom, terminalMat.clone())
    t1.position.copy(end1)
    group.add(t1)
    const t2 = new THREE.Mesh(terminalGeom, terminalMat.clone())
    t2.position.copy(end2)
    group.add(t2)
  }

  // 4. Axon - single long thin process (one per neuron), with hillock and terminal
  const phiAxon = Math.PI * ((seed + 99) % 97) / 97
  const thetaAxon = (2 * Math.PI * ((seed + 77) % 89)) / 89
  const axonDir = new THREE.Vector3(
    Math.sin(phiAxon) * Math.cos(thetaAxon),
    Math.sin(phiAxon) * Math.sin(thetaAxon),
    Math.cos(phiAxon)
  )
  const hillockBase = axonDir.clone().multiplyScalar(0.7)
  const hillock = new THREE.Mesh(
    new THREE.ConeGeometry(0.1, 0.2, 8),
    dendriteMat.clone()
  )
  hillock.position.copy(hillockBase).add(axonDir.clone().multiplyScalar(0.1))
  hillock.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axonDir)
  group.add(hillock)

  const axonStart = axonDir.clone().multiplyScalar(0.92)
  const axonLen = 0.95
  const axonEnd = addCylinder(
    group, axonStart, axonDir, axonLen, 0.035, 0.08, dendriteMat.clone()
  )
  const axonTerminal = new THREE.Mesh(terminalGeom.clone(), terminalMat.clone())
  axonTerminal.position.copy(axonEnd)
  group.add(axonTerminal)

  // 5. Dendritic spines - small bumps on the soma near where dendrites emerge
  const spineGeom = new THREE.SphereGeometry(0.055, 6, 6)
  for (let i = 0; i < treeCount; i++) {
    const phi = Math.PI * ((seed + i * 31) % 97) / 97
    const theta = (2 * Math.PI * ((seed + i * 17) % 89)) / 89
    const d = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi)
    )
    const spine = new THREE.Mesh(spineGeom, dendriteMat.clone())
    spine.position.copy(d.multiplyScalar(0.82 + ((seed + i) % 15) / 100))
    group.add(spine)
  }

  // 6. Very subtle membrane glow
  const membraneGeom = new THREE.SphereGeometry(1.1, 16, 16)
  membraneGeom.scale(1.2, 1.0, 1.15)
  const membraneMat = new THREE.MeshBasicMaterial({
    color: useGreen ? VISITED_COLOR : ACCENT_COLOR,
    transparent: true,
    opacity: 0.06,
  })
  const membrane = new THREE.Mesh(membraneGeom, membraneMat)
  group.add(membrane)

  group.scale.setScalar(baseScale)
  return group
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

export default function NeuronGraph() {
  const navigate = useNavigate()
  const fgRef = useRef<{ d3Force?: (n: string) => { distance: (n: number) => void }; d3ReheatSimulation?: () => void; zoomToFit?: (d: number, p: number) => void; refresh?: () => void } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const reducedMotion = useReducedMotion()
  const { visitedNodeIds, addVisited, clearTriggeredAt } = useVisitedNodes()

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      const id = String((node as GraphNode).id)
      if (id) addVisited(id)
      const href = (node as GraphNode).href
      if (href) navigate(href)
    },
    [navigate, addVisited]
  )

  const nodeThreeObject = useCallback(
    (node: GraphNode) =>
      createNeuronMesh(node, hoveredNodeId === node.id, visitedNodeIds.has(String(node.id))),
    [hoveredNodeId, visitedNodeIds]
  )

  const linkColor = useCallback(
    (link: { source?: GraphNode | string; target?: GraphNode | string }) => {
      const srcId = typeof link.source === 'object' ? link.source?.id : link.source
      const tgtId = typeof link.target === 'object' ? link.target?.id : link.target
      const isHighlight =
        hoveredNodeId !== null &&
        (srcId === hoveredNodeId || tgtId === hoveredNodeId)
      const srcVisited = srcId != null && visitedNodeIds.has(String(srcId))
      const tgtVisited = tgtId != null && visitedNodeIds.has(String(tgtId))
      const isVisitedLink = srcVisited || tgtVisited
      if (isHighlight) return 'rgba(103, 232, 249, 0.9)'
      if (isVisitedLink) return 'rgba(34, 197, 94, 0.5)'
      return 'rgba(34, 211, 238, 0.4)'
    },
    [hoveredNodeId, visitedNodeIds]
  )

  // Vibrate visited nodes when Clear memory is clicked; must return true so lib doesn't overwrite position
  const nodePositionUpdate = useCallback(
    (obj: THREE.Object3D, coords: { x: number; y: number; z: number }, node: { id?: string | number }) => {
      const id = String(node?.id ?? '')
      const now = performance.now() * 0.001
      const isShaking =
        clearTriggeredAt != null &&
        performance.now() - clearTriggeredAt < 550 &&
        visitedNodeIds.has(id)
      if (isShaking) {
        const s = hash(id)
        const amp = 4.5
        const f = 22
        obj.position.x = coords.x + amp * Math.sin(now * f + s % 100)
        obj.position.y = coords.y + amp * Math.sin(now * f * 1.1 + (s >> 2) % 100)
        obj.position.z = coords.z + amp * Math.sin(now * f * 0.9 + (s >> 4) % 100)
        return true
      }
      return false
    },
    [clearTriggeredAt, visitedNodeIds]
  )

  // Fit all nodes in view and set link distance (run after graph is ready)
  useEffect(() => {
    const setLayout = () => {
      const graph = fgRef.current
      if (graph?.d3Force) {
        const linkForce = graph.d3Force('link')
        if (linkForce && typeof linkForce.distance === 'function') {
          linkForce.distance(35)
          graph.d3ReheatSimulation?.()
        }
      }
    }
    setLayout()
    // After simulation settles, zoom to fit. On mobile use more padding so the graph stays centered.
    const isNarrow = typeof window !== 'undefined' && window.innerWidth < 768
    const padding = isNarrow ? 45 : 18
    const zoomTimer = setTimeout(() => {
      const graph = fgRef.current
      if (graph?.zoomToFit) {
        graph.zoomToFit(400, padding)
      }
    }, 1200)
    return () => clearTimeout(zoomTimer)
  }, [])

  // On resize: refresh and re-center. Use larger padding on narrow viewports so graph stays centered.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let zoomTimeoutId: ReturnType<typeof setTimeout>
    let lastW = 0
    let lastH = 0
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const graph = fgRef.current
      if (graph?.refresh) graph.refresh()
      const w = entry.contentRect.width
      const h = entry.contentRect.height
      const sizeChanged = lastW !== 0 && (lastW !== w || lastH !== h)
      lastW = w
      lastH = h
      if (!sizeChanged) return
      clearTimeout(zoomTimeoutId)
      zoomTimeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          const g = fgRef.current
          if (g?.zoomToFit) {
            const padding = w < 768 ? 45 : 18
            g.zoomToFit(250, padding)
          }
        })
      }, 80)
    })
    resizeObserver.observe(container)
    return () => {
      resizeObserver.disconnect()
      clearTimeout(zoomTimeoutId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full min-h-[240px] sm:min-h-[70vh] graph-entrance"
      role="application"
      aria-label="3D neuron graph of projects and experiences. Click a node to open that project or experience."
    >
      <ForceGraph3D
        ref={fgRef as never}
        graphData={graphData}
        onNodeClick={handleNodeClick}
        onNodeHover={(node) => setHoveredNodeId(node?.id ?? null)}
        nodeThreeObject={nodeThreeObject}
        nodePositionUpdate={nodePositionUpdate}
        nodeLabel={(node) =>
          String((node as GraphNode).name ?? (node as GraphNode).title ?? '')
        }
        linkColor={linkColor}
        linkWidth={1}
        linkDirectionalParticles={reducedMotion ? 1 : 3}
        linkDirectionalParticleSpeed={0.01}
        linkDirectionalParticleWidth={reducedMotion ? 0.5 : 0.6}
        backgroundColor="rgba(10, 10, 15, 0)"
        showNavInfo={false}
      />
    </div>
  )
}
