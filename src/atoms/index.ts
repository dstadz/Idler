import { atom } from 'jotai'

export { resourcesAtom, moneyAtom } from './resources'
export { planetAtom } from './planet'
export { userAtom, userIdAtom } from './user'



export const selectedTileAtom = atom({})
export const selectedTilesAtom = atom([])
export const hexCellsAtom = atom([[]])

export const unitNodesAtom = atom([])
export const buildingNodesAtom = atom([])
