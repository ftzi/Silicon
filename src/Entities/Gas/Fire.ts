import { colord } from "colord"
import { getInvertedHexColor } from "../../common/utils/color"
import { getRandomInt } from "../../common/utils/utils"
import { GasEntity } from "./GasEntity"

export const Fire = new GasEntity({
  name: "Fire",
  rgb: "#f02020",
  density: 0.0001,
})

Fire.extraUpdate = (particle) => {
  particle.invertedHexColor = getInvertedHexColor(getColor())
  if (Math.random() > 0.915) particle.remove()
}

const getColor = () => {
  // Fire colors typically range from red to yellow (hue values from 0 to 60)
  const hue = getRandomInt(-5, 40) // Random hue between 0 (red) and 60 (yellow)
  const saturation = getRandomInt(90, 100) // High saturation for vivid colors
  const lightness = getRandomInt(50, 70) // Medium lightness for brightness

  // Generate the color using the colord library
  const color = colord({ h: hue, s: saturation, l: lightness })

  return color.toHex() as HexColor
}
