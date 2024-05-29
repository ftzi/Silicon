import { LinkedList, type LinkedListItem } from "../main/linkedList"
import { canvas, height, width } from "./consts"
import { addToDrawOrder } from "./draw"
import { isInBounds } from "./pos"

type RGB = {
  r: number
  g: number
  b: number
}

export type Type = {
  color: string
  rgb: RGB
}

export const Types = {
  Sand: {
    color: "tan",
    rgb: {
      r: 210,
      g: 180,
      b: 140,
    },
  },
} satisfies Record<string, Type>

const matrixParticles: Array<Array<Particle | undefined>> = []

export const linkedParticles = new LinkedList<Particle>()

export const particleAt = (x: number, y: number): Particle | undefined =>
  matrixParticles[x][y]

export const particleAtSafe = (x: number, y: number): Particle | undefined =>
  matrixParticles[x]?.[y]

export const setupMatrixParticles = () => {
  for (let x = 0; x < width; x++)
    matrixParticles[x] = new Array<undefined>(height).fill(undefined)
}

export class Particle {
  public readonly node: LinkedListItem<Particle> = linkedParticles.append(this)
  public readonly seed: number = Math.random()

  private constructor(
    public x: number,
    public y: number,
    public type: Type,
  ) {}

  public static create({
    x,
    y,
    type,
    replace,
  }: { x: number; y: number; type: Type; replace?: boolean }) {
    if (isInBounds(x, y)) {
      const particleAtPos = particleAt(x, y)

      if (particleAtPos) {
        if (!replace || type === particleAtPos.type) return
        particleAtPos.remove()
      }
      const particle = new Particle(x, y, type)

      matrixParticles[x][y] = particle
      addToDrawOrder({ x, y })
    }
  }

  public draw = () => {
    canvas.fillStyle = this.type.color
    canvas.fillRect(this.x, this.y, 1, 1)
  }

  public moveTo = (x: number, y: number) => {
    if (isInBounds(x, y)) {
      matrixParticles[this.x][this.y] = undefined
      addToDrawOrder({ x: this.x, y: this.y })

      this.x = x
      this.y = y

      matrixParticles[this.x][this.y] = this
      addToDrawOrder({ x: this.x, y: this.y })
    } else {
      this.remove()
    }
  }

  public moveToAdd = (x: number, y: number) => {
    this.moveTo(this.x + x, this.y + y)
  }

  public remove = () => {
    matrixParticles[this.x][this.y] = undefined
    this.node.remove()
    addToDrawOrder({ x: this.x, y: this.y })
  }

  get left() {
    return particleAt(this.x - 1, this.y)
  }

  get right() {
    return particleAt(this.x + 1, this.y)
  }

  get top() {
    return particleAt(this.x, this.y - 1)
  }

  get bottom() {
    return particleAt(this.x, this.y + 1)
  }

  get bottomLeft() {
    return particleAt(this.x - 1, this.y + 1)
  }

  get bottomRight() {
    return particleAt(this.x + 1, this.y + 1)
  }
}

export const checkLeft = (particle: Particle): boolean => {
  if (particle.x > 0 && particle.y < height - 1 && !particle.bottomLeft) {
    particle.moveToAdd(-1, 1)

    return true
  }

  return false
}

export const checkRight = (particle: Particle): boolean => {
  if (
    particle.x < width - 1 &&
    particle.y < height - 1 &&
    !particle.bottomRight
  ) {
    particle.moveToAdd(1, 1)

    return true
  }

  return false
}
