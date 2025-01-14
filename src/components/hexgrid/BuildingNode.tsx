import React from 'react'
import Box from '@mui/material/Box'
import { hexHeight, hexWidth, tileBackgrounds } from '@/utils/constants'
import { Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { buildingNodesAtom } from '@/atoms'

const hexagonPath = `polygon( 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`

const BuildingNode = async ({ buildingId }: { buildingId: number }) => {
  const [buildings, setBuildings] = useAtom(buildingNodesAtom)

  
  const buildingEmoji = buildingData[0].emoji
  console.log(`🚀 ~buildingEmoji:`, buildingEmoji)
  return (
    <Box
      sx={{
        width: hexWidth,
        height: hexHeight,
        position: 'absolute',
        background: 'red', // tileBackgrounds.SEA,
        clipPath: hexagonPath,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',
        boxShadow: '0 0 0 2px black',
      }}
    >
      <Typography sx={{ fontSize: '2rem' }} >
        {buildingEmoji || 'home'}
      </Typography>
    </Box>
  )
}

export default BuildingNode
