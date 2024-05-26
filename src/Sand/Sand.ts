import type { Particle } from "./Particle.ts"
import { isInBounds } from "./Pos.ts"
import type { Pos2D } from "./Pos.ts"
import { canvas, drawOrders, height, width } from "./consts.tsx"

const sand: Array<Array<Particle | undefined>> = []

export const Sand = {
  setup: () => {
    for (let x = 0; x < width; x++)
      sand[x] = new Array<undefined>(height).fill(undefined)
  },

  drawParticleAt: (pos: Pos2D) => {
    const particle = Sand.particleAt(pos)

    if (particle) {
      canvas.fillStyle = particle.color
      canvas.fillRect(pos.x, pos.y, 1, 1)
    }
  },

  particleAt: (pos: Pos2D): Particle | undefined => sand[pos.x][pos.y],

  setAndDrawParticle: (particle: Particle) => {
    sand[particle.pos.x][particle.pos.y] = particle
    drawOrders.push(() => Sand.drawParticleAt(particle.pos))
  },

  addParticle: (particle: Particle, props?: { replace?: boolean }) => {
    if (isInBounds(particle.pos)) {
      if (props?.replace || !Sand.particleAt(particle.pos))
        Sand.setAndDrawParticle(particle)
    }
  },

  // Removes particle at pos and undraws it.
  clearParticleAt: (pos: Pos2D) => {
    sand[pos.x][pos.y] = undefined
    drawOrders.push(() => canvas.clearRect(pos.x, pos.y, 1, 1))
  },
}
