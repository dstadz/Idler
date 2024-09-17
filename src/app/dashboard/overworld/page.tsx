'use client'

import Canvas from '@/components/Canvas'
import React from 'react'

const OverworldPage = () => {

  const homeNode = {
    position: [400, 400],
    emoji: '🏰',
    size: 30,
    children: [],
  }

  const resourceNodesData = [
    {
      position: [100, 150],
      emoji: '🌋',
      size: 20,
      transportNode: { speed: 0.9, emoji: '🐉', size: 16 },
    }, {
      position: [700, 500],
      emoji: '🌲',
      size: 20,
      transportNode: { speed: 1.25, emoji: '🦄', size: 16 },
    }
  ]

  return (
    <div>
      This is the Overworld Page Content
      <Canvas homeNode={homeNode} resourceNodesData={resourceNodesData} />
    </div>
  )
}

export default OverworldPage
