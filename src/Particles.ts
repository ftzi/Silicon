import { checkLeft, checkRight, linkedParticles } from "./Particle"

import { height } from "./utils/consts"
import { benchmark } from "./utils/fps"

export const Particles = {
  setup: () => {},
  update: () => {
    // for (let y = 0; y < 1; y++) {
    //   for (let x = 0; x < width; x++) {
    //     Particle.create({
    //       x,
    //       y,
    //       entity: Entities.Sand,
    //       replace: true,
    //     })
    //   }
    // }
    updateParticles()
  },
}

const updateParticles = () => {
  const hasGround = true as boolean

  benchmark("update", "start")

  const fromHead = Math.random() > 0.5

  // // This avoids logical biases in the behavior of the particle.
  let node = fromHead ? linkedParticles.head : linkedParticles.tail

  while (node) {
    const particle = node.value

    // This must be before the `continue`.
    node = fromHead ? node.next : node.prev

    if ((hasGround ? particle.y < height - 1 : true) && !particle.bottom) {
      particle.moveToAdd(0, 1)
      continue
    }

    if (particle.seed > 0.5) {
      checkLeft(particle) || checkRight(particle)
    } else {
      checkRight(particle) || checkLeft(particle)
    }
  }

  // Else, don't move.
  benchmark("update", "end")
}
