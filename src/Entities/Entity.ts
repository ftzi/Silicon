import { type Rgb, invertHex } from "../utils/color"

export class Entity {
  /** As we use Uint32Array for the imageData, we need to convert the hex color from 0xAABBCC to 0xFFCCBBAA. */
  public invertedRgb: number
  public rgb: Rgb

  constructor(props: {
    rgb: Rgb
  }) {
    this.rgb = props.rgb
    this.invertedRgb = invertHex(this.rgb)
  }
}
