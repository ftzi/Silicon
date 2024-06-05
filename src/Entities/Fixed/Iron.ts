import { colord } from "colord"
import { FixedEntity } from "./FixedEntity"

export const Iron = new FixedEntity({
  name: "Iron",
  rgb: "#606060",
  density: 7.9,
  heatCapacity: 5,
  thermalConductivity: 5,
  initialTemperature: 50,
})

type ColorTemp = { temp: number; color: HexColor }

type ColorTemps = Array<ColorTemp>

const temperatureColors: ColorTemps = [
  { temp: 20, color: "#606060" },
  { temp: 400, color: "#800000" },
  { temp: 800, color: "#FF4500" },
  { temp: 1200, color: "#FFFF00" },
  { temp: 1600, color: "#FFFFFF" },
]

// Function to interpolate between two colors
const interpolateColor = (
  color1: string,
  color2: string,
  factor: number,
): HexColor => {
  const c1 = colord(color1).toRgb()
  const c2 = colord(color2).toRgb()

  const r = c1.r + factor * (c2.r - c1.r)
  const g = c1.g + factor * (c2.g - c1.g)
  const b = c1.b + factor * (c2.b - c1.b)

  return colord({
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  }).toHex() as HexColor
}

// Function to get color based on temperature
const getColorForTemperature = (temp: number): HexColor => {
  for (let i = 0; i < temperatureColors.length - 1; i++) {
    const current = temperatureColors[i]!
    const next = temperatureColors[i + 1]!

    if (temp >= current.temp && temp <= next.temp) {
      const factor = (temp - current.temp) / (next.temp - current.temp)

      return interpolateColor(current.color, next.color, factor)
    }
  }

  // Return the highest color if temperature exceeds the defined range
  return temperatureColors[temperatureColors.length - 1]!.color
}

Iron.extraUpdate = (particle) => {
  particle.setColor(getColorForTemperature(particle.temperature))
}
