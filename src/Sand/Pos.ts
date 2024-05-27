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
  pos.x > 0 && pos.y > 0 && pos.x < width && pos.y < height
