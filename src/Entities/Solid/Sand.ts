import type { Particle } from "../../Sandbox/Particle"
import { sandboxHeight, sandboxWidth } from "../../common/consts"
import { commonGravity } from "../Entity"
import { SolidEntity } from "./SolidEntity"

export const Sand = new SolidEntity({
  name: "Sand",
  rgb: "#d2b48c",
  density: 1.6,
  heatCapacity: 0.83,
  thermalConductivity: 0.25,
})

Sand.updatePosition = (particle: Particle) => {
  if (commonGravity(particle)) return

  if (Math.random() > 0.5) {
    checkLeft(particle) || checkRight(particle)
  } else {
    checkRight(particle) || checkLeft(particle)
  }
}

const checkLeft = (particle: Particle): boolean => {
  if (
    !particle.bottomLeft &&
    particle.x > 0 &&
    particle.y < sandboxHeight - 1
  ) {
    particle.moveToAdd(-1, 1)

    return true
  }

  return false
}

const checkRight = (particle: Particle): boolean => {
  if (
    !particle.bottomRight &&
    particle.x < sandboxWidth - 1 &&
    particle.y < sandboxHeight - 1
  ) {
    particle.moveToAdd(1, 1)

    return true
  }

  return false
}
