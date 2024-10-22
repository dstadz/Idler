import { CanvasNode, Planet } from '@/classes'
import { useEffect, useState, useCallback } from 'react'
import { PLANETS as planetsStatic } from '@/utils/constants'
import { useAtom } from 'jotai'
import { planetAtom, resourcesAtom } from '@/atoms'
import { ResourceRecord } from '@/types/node'

const PLANETS = planetsStatic.map(planet => ({
  ...planet,
  levels: {
    mineRate: 1,
    shipSpeed: 1,
    cargo: 1,
  },
  id: `planet${planet.planetName}`,
}))

interface UsePlanetProps {
  ctx: CanvasRenderingContext2D | null
  homeNode: CanvasNode
}

export const usePlanetNodes = ({ ctx, homeNode }: UsePlanetProps) => {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [selectedPlanet, setSelectedPlanet] = useAtom(planetAtom)
  const [, setMainResources] = useAtom(resourcesAtom)
  const addToMainResources = useCallback(
    (resource: keyof ResourceRecord, amount: number) => {
      setMainResources(prev => ({
        ...prev,
        [resource]: prev[resource] + amount,
      }))
    },
    [setMainResources]
  )

  useEffect(() => {
    if (!ctx || Object.keys(homeNode).length === 0) return

    const newPlanets = PLANETS.map(node =>
      new Planet({
        ctx,
        homeNode,
        id: node.id,
        position: node.position,
        size: node.size,
        emoji: node.emoji,
        resources: node.resources,
        levels: node.levels,
        yields: node.yields,
        addToMainResources,
      })
    )
    setPlanets(newPlanets)
  }, [ctx, homeNode, addToMainResources])

  const drawPlanets = () => {
    planets.forEach(planet => {
      planet.update()
      planet.drawUnit()
      planet.ship.drawUnit()
    })
  }

  const handleCanvasClick = useCallback(
    (event: MouseEvent) => {
      const canvasRect = (event.target as HTMLCanvasElement).getBoundingClientRect()
      const clickX = event.clientX - canvasRect.left
      const clickY = event.clientY - canvasRect.top

      // Find the planet that was clicked
      const clickedPlanet = planets.find(planet => {
        const [px, py] = planet.position
        const radius = planet.size / 2
        return (
          clickX >= px - radius &&
          clickX <= px + radius &&
          clickY >= py - radius &&
          clickY <= py + radius
        )
      })

      if (clickedPlanet) {
        setSelectedPlanet(clickedPlanet)
      }
    },
    [planets]
  )

  useEffect(() => {
    const canvas = ctx?.canvas
    if (!canvas) return

    canvas.addEventListener('click', handleCanvasClick)
    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
    }
  }, [ctx, handleCanvasClick])

  const closeModal = () => setSelectedPlanet(null)

  return {
    planets,
    drawPlanets,
    selectedPlanet,
    closeModal,
  }
}
