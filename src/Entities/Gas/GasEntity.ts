import type { Particle } from "../../Sandbox/Particle"
import { sandboxWidth } from "../../common/consts"
import { simulationI } from "../../common/data"
import { Entity, type EntityConstructorProps, State } from "../Entity"

const checkLeft = (particle: Particle): true | undefined => {
  if (!particle.left && particle.x > 0) {
    particle.moveToAdd(-1, 0)

    return true
  }
}

const checkRight = (particle: Particle): true | undefined => {
  if (!particle.right && particle.x < sandboxWidth - 1) {
    particle.moveToAdd(1, 0)

    return true
  }
}

export const shouldGasGoUp = (particle: Particle): boolean =>
  Math.random() > particle.entity.density / 0.0012

export class GasEntity extends Entity {
  constructor(props: OmitKey<EntityConstructorProps, "state" | "viscosity">) {
    super({ ...props, state: State.Gas })
  }

  update(particle: Particle) {
    const top = particle.top

    if (!top && particle.y > 0) {
      if (shouldGasGoUp(particle)) particle.moveToAdd(0, -1)

      return
    }

    if (
      top &&
      top.entity.state !== State.Fixed &&
      top.entity.density > particle.entity.density &&
      top.swappedAt < simulationI &&
      particle.swappedAt < simulationI &&
      Math.random() > 0.8
    ) {
      particle.swap(top)

      return
    }

    if (Math.random() > 0.5) {
      checkLeft(particle) || checkRight(particle)
    } else {
      checkRight(particle) || checkLeft(particle)
    }
  }
}
