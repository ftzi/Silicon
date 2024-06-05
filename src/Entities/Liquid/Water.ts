import { Entities } from "../Entities"
import { LiquidEntity } from "./LiquidEntity"

export const Water = new LiquidEntity({
  name: "Water",
  rgb: "#1070ff",
  density: 1,
  viscosity: 0.1,
})

Water.extraUpdate = (particle) => {
  if (
    particle.temperature > 100 &&
    Math.random() > 1 - (particle.temperature - 100) * 0.002
  ) {
    particle.convertTo(Entities.Steam)
  }
}
