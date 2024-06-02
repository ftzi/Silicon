import type { Particle } from "../../Sandbox/Particle"
import { sandboxHeight, sandboxWidth } from "../../common/consts"
import { simulationI } from "../../common/data"
import {
  Entity,
  type EntityConstructorProps,
  State,
  commonGravity,
} from "../Entity"

const checkLeft = (particle: Particle): true | undefined => {
  if (!particle.left && particle.x > 0) {
    if (particle.y < sandboxHeight - 1 && !particle.bottomLeft)
      particle.moveToAdd(-1, 1)
    else particle.moveToAdd(-1, 0)

    return true
  }
}

const checkRight = (particle: Particle): true | undefined => {
  if (!particle.right && particle.x < sandboxWidth - 1) {
    if (particle.y < sandboxHeight - 1 && !particle.bottomRight)
      particle.moveToAdd(1, 1)
    else particle.moveToAdd(1, 0)

    return true
  }
}

export class LiquidEntity extends Entity {
  constructor(props: OmitKey<EntityConstructorProps, "state">) {
    super({ ...props, state: State.Liquid })
  }

  updatePosition(particle: Particle) {
    if (commonGravity(particle)) return

    const top = particle.top

    if (
      top &&
      top.entity.density > particle.entity.density &&
      top.swappedAt < simulationI &&
      particle.swappedAt < simulationI &&
      Math.random() > 0.8
    ) {
      particle.swap(top)

      return
    }

    const shouldMoveHorizontally = top?.entity.falls
      ? 1
      : Math.random() > particle.entity.viscosity

    if (shouldMoveHorizontally) {
      if (Math.random() > 0.5) {
        checkLeft(particle) || checkRight(particle)
      } else {
        checkRight(particle) || checkLeft(particle)
      }
    }
  }
}
