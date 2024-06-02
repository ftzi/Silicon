import { Entity, type EntityConstructorProps, State } from "../Entity"

export class FixedEntity extends Entity {
  update() {}

  constructor(props: OmitKey<EntityConstructorProps, "state" | "viscosity">) {
    super({ ...props, state: State.Fixed })
  }
}
