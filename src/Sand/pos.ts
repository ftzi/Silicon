import { height, width } from "./consts.tsx"

export interface Pos2D {
  x: number
  y: number
}

export const addPos = (pos: Pos2D, add: Partial<Pos2D>) => ({
  x: pos.x + (add.x ?? 0),
  y: pos.y + (add.y ?? 0),
})

export const isInBounds = (pos: Pos2D) =>
  pos.x >= 0 && pos.y >= 0 && pos.x < width && pos.y < height

export const LEFT = { x: -1 }
export const RIGHT = { x: 1 }
export const TOP = { y: -1 }
export const BOTTOM = { y: 1 }
export const BOTTOM_LEFT = { x: -1, y: 1 }
export const BOTTOM_RIGHT = { x: 1, y: 1 }
