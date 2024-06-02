import type { Particle } from "../../Sandbox/Particle"
import {
  Entity,
  type EntityConstructorProps,
  State,
  commonGravity,
} from "../Entity"

export class SolidEntity extends Entity {
  updatePosition(particle: Particle) {
    if (commonGravity(particle)) return
  }

  constructor(props: OmitKey<EntityConstructorProps, "state" | "viscosity">) {
    super({ ...props, state: State.Solid })
  }
}
