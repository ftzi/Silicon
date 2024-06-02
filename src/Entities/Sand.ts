import type { Particle } from "../Sandbox/Particle"
import { sandboxHeight, sandboxWidth } from "../common/consts"
import { Entity, commonGravity } from "./Entity"

export const Sand = new Entity({
  name: "Sand",
  rgb: "#d2b48c",
  density: 2,
})

Sand.update = (particle: Particle) => {
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
