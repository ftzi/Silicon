import type { Particle } from "../Sandbox/Particle"
import { sandboxHeight } from "../common/consts"
import { getInvertedHexColor, isValidColor } from "../common/utils/color"

export enum State {
  Solid,
  Liquid,
  Gas,
  Fixed,
}

export type EntityConstructorProps = {
  name: string
  rgb: HexColor
  density: number
  /** 0.0 to 1.0. 0 will always move randomly on each frame, 1 never. */
  viscosity?: number
  state: State
}

export class Entity {
  /** As we use Uint32Array for the imageData, we need to convert the hex color from 0xAABBCC to 0xFFCCBBAA. */
  public readonly invertedHexColor: number
  public readonly color: HexColor
  public readonly density: number
  public readonly viscosity: number
  public readonly falls: boolean
  public readonly name: string
  public readonly state: State

  constructor(props: EntityConstructorProps) {
    if (!isValidColor(props.rgb)) {
      throw new Error(`"${props.rgb}" is not a valid color!`)
    }
    this.density = props.density
    this.color = props.rgb
    this.invertedHexColor = getInvertedHexColor(this.color)
    this.viscosity = props.viscosity ?? 1
    this.name = props.name
    this.state = props.state
    this.falls = [State.Solid].includes(this.state)
  }

  update(particle: Particle) {
    if (commonGravity(particle)) return
  }

  extraUpdate: undefined | ((particle: Particle) => void) = undefined
}

export const commonGravity = (particle: Particle): true | undefined => {
  if (!particle.bottom && particle.y < sandboxHeight - 1) {
    if (Math.random() > 0.01) particle.moveToAdd(0, 1)

    return true
  }
}
