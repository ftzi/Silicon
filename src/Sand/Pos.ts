import { height, width } from "./consts.tsx"

export interface Pos2D {
  x: number
  y: number
}

export const addPos = (pos: Pos2D, add: Partial<Pos2D>) => ({
  x: pos.x + (add.x ?? 0),
  y: pos.y + (add.y ?? 0),
})

export class Pos implements Pos2D {
  public x: number
  public y: number

  constructor(pos: Pos2D) {
    this.x = pos.x
    this.y = pos.y
  }

  add = (pos: Partial<Pos2D>) =>
    new Pos({ x: this.x + (pos.x ?? 0), y: this.y + (pos.y ?? 0) })

  isInBounds = () =>
    this.x > 0 && this.y > 0 && this.x < width && this.y < height

  get left() {
    return this.add({ x: -1 })
  }

  get right() {
    return this.add({ x: 1 })
  }

  get top() {
    return this.add({ y: -1 })
  }

  get bottom() {
    return this.add({ y: 1 })
  }

  get bottomLeft() {
    return this.add({ x: -1, y: 1 })
  }

  get bottomRight() {
    return this.add({ x: 1, y: 1 })
  }
}
export const isInBounds = (pos: Pos2D) =>
  pos.x > 0 && pos.y > 0 && pos.x < width && pos.y < height
