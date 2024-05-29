import { height, width } from "./consts"

// This should be avoided - prefer (x: number, y: number) as it's faster!
export interface Pos2D {
  x: number
  y: number
}

export const isInBounds = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < width && y < height
