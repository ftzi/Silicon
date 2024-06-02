import type { Particle } from "../Sandbox/Particle"
import { sandboxHeight } from "../common/consts"
import { type Rgb, invertHex, isValidColor } from "../common/utils/color"

export type EntityConstructorProps = {
  name: string
  rgb: Rgb
  density: number
  /** 0.0 to 1.0. 0 will always move randomlyon each frame, 1 never. */
  viscosity?: number
}

export const commonGravity = (particle: Particle): true | undefined => {
  if (!particle.bottom && particle.y < sandboxHeight - 1) {
    if (Math.random() > 0.01) {
      particle.moveToAdd(0, 1)
    }

    return true
  }
}
export class Entity {
  /** As we use Uint32Array for the imageData, we need to convert the hex color from 0xAABBCC to 0xFFCCBBAA. */
  public invertedRgb: number
  public rgb: Rgb
  public density: number
  public viscosity: number
  public falls: boolean = true
  public name: string

  constructor(props: EntityConstructorProps) {
    if (!isValidColor(props.rgb)) {
      throw new Error(`"${props.rgb}" is not a valid color!`)
    }
    this.density = props.density
    this.rgb = props.rgb
    this.invertedRgb = invertHex(this.rgb)
    this.viscosity = props.viscosity ?? 1
    this.name = props.name
  }

  update(particle: Particle) {
    if (commonGravity(particle)) return
  }
}
