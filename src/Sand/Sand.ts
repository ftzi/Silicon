import { LinkedList } from "../main/linkedList.ts"
import type { Particle } from "./Particle.ts"
import { isInBounds } from "./Pos.ts"
import type { Pos2D } from "./Pos.ts"
import { addToDrawOrder, height, width } from "./consts.tsx"

const sand: Array<Array<Particle | undefined>> = []

export const linkedList = new LinkedList<Particle>()

export const list: Array<Particle> = []

export const particleAt = (pos: Pos2D): Particle | undefined =>
  sand[pos.x][pos.y]

export const Sand = {
  setup: () => {
    for (let x = 0; x < width; x++)
      sand[x] = new Array<undefined>(height).fill(undefined)
  },

  setParticleAtPos: (particle: Particle) => {
    sand[particle.pos.x][particle.pos.y] = particle
    addToDrawOrder({ pos: particle.pos, draw: true })
  },

  addParticle: (particle: Particle, props?: { replace?: boolean }) => {
    if (isInBounds(particle.pos)) {
      if (props?.replace || !particleAt(particle.pos)) {
        // linkedList.append(particle)
        list.push(particle)
        Sand.setParticleAtPos(particle)
      }
    }
  },

  // Removes particle at pos and undraws it.
  clearParticleAt: (pos: Pos2D) => {
    sand[pos.x][pos.y] = undefined
    addToDrawOrder({ pos, draw: false })
  },
}
