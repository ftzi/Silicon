import { Entities } from "../Entities"
import { GasEntity } from "./GasEntity"

export const Steam = new GasEntity({
  name: "Steam",
  rgb: "#b0c0d030",
  density: 0.0006,
})

Steam.extraUpdate = (particle) => {
  if (
    particle.temperature < 100 &&
    Math.random() > 1 - (100 - particle.temperature) * 0.002
  ) {
    particle.convertTo(Entities.Water)
  }
}
