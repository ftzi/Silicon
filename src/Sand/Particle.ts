import { type Pos2D, addPos } from "./Pos.ts"
import { Sand, list, particleAt } from "./Sand.ts"
import { canvas, height, width } from "./consts.tsx"

export type Type = {
  color: string
}

export const Types = {
  Sand: {
    color: "tan",
  },
} satisfies Record<string, Type>

export class Particle {
  public pos: Pos2D
  // public x: number
  // public y: number
  public type: Type
  public seed: number = Math.random()

  constructor(props: {
    pos: Pos2D
    type: Type
  }) {
    this.pos = props.pos
    this.type = props.type
  }

  public moveTo = (to: Pos2D) => {
    Sand.clearParticleAt(this.pos)
    this.pos = to
    Sand.setParticleAtPos(this)
  }

  public moveToAdd = (add: Partial<Pos2D>) => {
    this.moveTo(addPos(this.pos, add))
  }

  public draw = () => {
    canvas.fillStyle = this.type.color
    canvas.fillRect(this.pos.x, this.pos.y, 1, 1)
  }

  get left() {
    return particleAt(addPos(this.pos, { x: -1 }))
  }

  get right() {
    return particleAt(addPos(this.pos, { x: 1 }))
  }

  get top() {
    return particleAt(addPos(this.pos, { y: -1 }))
  }

  get bottom() {
    return particleAt(addPos(this.pos, { y: 1 }))
  }

  get bottomLeft() {
    return particleAt(addPos(this.pos, { x: -1, y: 1 }))
  }

  get bottomRight() {
    return particleAt(addPos(this.pos, { x: 1, y: 1 }))
  }
}

const checkLeft = (particle: Particle): boolean => {
  if (
    particle.pos.x > 0 &&
    particle.pos.y < height - 1 &&
    !particle.bottomLeft
  ) {
    particle.moveToAdd({ x: -1, y: 1 })

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
    particle.moveToAdd({ x: 1, y: 1 })

    return true
  }

  return false
}

export const update = () => {
  for (let i = 0; i < list.length; i++) {
    const particle = list[i]

    if (particle.pos.y < height - 1 && !particle.bottom) {
      particle.moveToAdd({ y: 1 })
      continue
    }

    if (particle.seed > 0.5) {
      checkLeft(particle) || checkRight(particle)
    } else {
      checkRight(particle) || checkLeft(particle)
    }

    // Else, don't move.
  }
}
