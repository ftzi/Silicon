import { canvas, height, width } from "./consts.tsx"
import { addToDrawOrder } from "./draw.ts"
import { benchmark } from "./etc/benchmark.ts"
import {
  BOTTOM,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  LEFT,
  type Pos2D,
  RIGHT,
  TOP,
  addPos,
  isInBounds,
} from "./pos.ts"

export type Type = {
  color: string
}

export const Types = {
  Sand: {
    color: "tan",
  },
} satisfies Record<string, Type>

const matrixParticles: Array<Array<Particle | undefined>> = []
// const linkedParticles = new LinkedList<Particle>()

export const particleAt = (pos: Pos2D): Particle | undefined =>
  matrixParticles[pos.x][pos.y]

export const setupMatrixParticles = () => {
  for (let x = 0; x < width; x++)
    matrixParticles[x] = new Array<undefined>(height).fill(undefined)
}

export class Particle {
  // public readonly node: LinkedListItem<Particle> = linkedParticles.append(this)
  public readonly seed: number = Math.random()

  private constructor(
    public pos: Pos2D,
    public type: Type,
  ) {}

  public static create(props: { pos: Pos2D; type: Type; replace?: boolean }) {
    if (isInBounds(props.pos)) {
      if (props.replace || !particleAt(props.pos)) {
        const particle = new Particle(props.pos, props.type)

        matrixParticles[props.pos.x][props.pos.y] = particle
      }
    }
  }

  public draw = () => {
    canvas.fillStyle = this.type.color
    canvas.fillRect(this.pos.x, this.pos.y, 1, 1)
  }

  public moveTo = (to: Pos2D) => {
    if (isInBounds(to)) {
      matrixParticles[this.pos.x][this.pos.y] = undefined
      addToDrawOrder({ pos: { ...this.pos }, remove: true })

      this.pos = to

      matrixParticles[this.pos.x][this.pos.y] = this
      addToDrawOrder({ pos: { ...this.pos } })
    } else {
      this.remove()
    }
  }

  public moveToAdd = (add: Partial<Pos2D>) => {
    this.moveTo(addPos(this.pos, add))
  }

  private remove = () => {
    matrixParticles[this.pos.x][this.pos.y] = undefined
    // this.node.remove()
    addToDrawOrder({ pos: { ...this.pos }, remove: true })
  }

  public neighbor(pos: Pos2D) {
    return particleAt(addPos(this.pos, pos))
  }

  get left() {
    return particleAt(addPos(this.pos, LEFT))
  }

  get right() {
    return particleAt(addPos(this.pos, RIGHT))
  }

  get top() {
    return particleAt(addPos(this.pos, TOP))
  }

  get bottom() {
    return particleAt(addPos(this.pos, BOTTOM))
  }

  get bottomLeft() {
    return particleAt(addPos(this.pos, BOTTOM_LEFT))
  }

  get bottomRight() {
    return particleAt(addPos(this.pos, BOTTOM_RIGHT))
  }
}

const checkLeft = (particle: Particle): boolean => {
  if (
    particle.pos.x > 0 &&
    particle.pos.y < height - 1 &&
    !particle.bottomLeft
  ) {
    particle.moveToAdd(BOTTOM_LEFT)

    return true
  }

  return false
}

const checkRight = (particle: Particle): boolean => {
  if (
    particle.pos.x < width - 1 &&
    particle.pos.y < height - 1 &&
    !particle.bottomRight
  ) {
    particle.moveToAdd(BOTTOM_RIGHT)

    return true
  }

  return false
}

export const update = () => {
  const hasGround = true as boolean

  benchmark("update", "start")

  // const fromHead = true

  // // This avoids logical biases in the behavior of the particle.
  // let node = fromHead ? linkedParticles.head : linkedParticles.tail

  // while (node) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const particle = matrixParticles[x][y]

      if (!particle) continue

      if (
        (hasGround ? particle.pos.y < height - 1 : true) &&
        !particle.bottom
      ) {
        particle.moveToAdd(BOTTOM)
        continue
      }

      if (particle.seed > 0.5) {
        checkLeft(particle) || checkRight(particle)
      } else {
        checkRight(particle) || checkLeft(particle)
      }
    }
  }
  // const particle = node.value

  // Else, don't move.
  // node = fromHead ? node.next : node.prev
  benchmark("update", "end")
}
