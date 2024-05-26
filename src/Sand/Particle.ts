import { random } from "colord"
import { Pos, type Pos2D, addPos } from "./Pos.ts"
import { Sand } from "./Sand.ts"
import { canvas, height, width } from "./consts.tsx"
import { drawOrders } from "./consts.tsx"

export enum Type {
  Sand = 0,
}

export class Particle {
  public pos: Pos
  public type: Type
  public color: string

  constructor(props: {
    pos: Pos
    type: Type
  }) {
    this.pos = props.pos
    this.type = props.type
    this.color = random().toHex()
  }

  public moveTo = (to: Pos2D) => {
    Sand.clearParticleAt(this.pos)
    drawOrders.push(() => canvas.clearRect(this.pos.x, this.pos.y, 1, 1))
    this.pos = new Pos(to)
    Sand.setAndDrawParticle(this)
  }

  public moveToAdd = (add: Partial<Pos2D>) => {
    this.moveTo(addPos(this.pos, add))
  }

  get left() {
    return Sand.particleAt(this.pos.add({ x: -1 }))
  }

  get right() {
    return Sand.particleAt(this.pos.add({ x: 1 }))
  }

  get top() {
    return Sand.particleAt(this.pos.add({ y: -1 }))
  }

  get bottom() {
    return Sand.particleAt(this.pos.add({ y: 1 }))
  }

  get bottomLeft() {
    return Sand.particleAt(this.pos.add({ x: -1, y: 1 }))
  }

  get bottomRight() {
    return Sand.particleAt(this.pos.add({ x: 1, y: 1 }))
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
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const particle = Sand.particleAt({ x, y })

      if (particle) {
        // If below is free, fall
        if (y < height - 1 && !particle.bottom) {
          particle.moveToAdd({ y: 1 })
          continue
        }

        if (Math.random() > 0.5) {
          checkLeft(particle) || checkRight(particle)
        } else {
          checkRight(particle) || checkLeft(particle)
        }

        // Else, don't move.
      }
    }
  }
}

// const conditions = [
//   (pos: Pos, particle: Particle) => {
//     // Fall left
//   if (pos.x > 0 && pos.y < height - 1 && !sand[pos.x - 1][pos.y + 1]) {
//     moveFromTo(pos, { x: pos.x - 1, y: pos.y + 1 }, particle)
//     continue
//   }
// },
// (pos: Pos) => {
//   // Fall right
//   if (x < width - 1 && y < height - 1 && !sand[x + 1][y + 1]) {
//     moveFromTo({ x, y }, { x: x + 1, y: y + 1 }, particle)
//   }
// }
// ]
// const leftOrRight = () => {

// }
