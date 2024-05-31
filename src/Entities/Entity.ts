import { type Rgb, invertHex, isValidColor } from "../common/utils/color"

export class Entity {
  /** As we use Uint32Array for the imageData, we need to convert the hex color from 0xAABBCC to 0xFFCCBBAA. */
  public invertedRgb: number
  public rgb: Rgb
  public density: number

  constructor(props: {
    rgb: Rgb
    density: number
  }) {
    if (!isValidColor(props.rgb)) {
      throw new Error(`"${props.rgb}" is not a valid color!`)
    }
    this.density = props.density
    this.rgb = props.rgb
    this.invertedRgb = invertHex(this.rgb)
  }
}
