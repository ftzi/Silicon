import { Entities } from "./Entities/Entities"
import { Particle, checkLeft, checkRight, linkedParticles } from "./Particle"

import { height } from "./utils/consts"
import { benchmark } from "./utils/fps"
import { forWholeScreen } from "./utils/pos"

export const Particles = {
  setup: () => {
    forWholeScreen((x, y) =>
      Particle.create({
        x,
        y,
        entity: Entities.Sand,
        replace: true,
      }),
    )
  },
  update: () => {
    updateParticles()
  },
}

const updateParticles = () => {
  benchmark("update")

  const fromHead = Math.random() > 0.5

  // // This avoids logical biases in the behavior of the particle.
  let node = fromHead ? linkedParticles.head : linkedParticles.tail

  while (node) {
    const particle = node.value

    node = fromHead ? node.next : node.prev

    if (!particle.bottom && particle.y < height - 1) {
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
  benchmark("update", true)
}
