import { canvasSetup } from "../common/canvas"
import { getSandboxMouse } from "./Mouse"
import { Particles } from "./Particle"
import { getParticlesDraw } from "./particlesDraw"

export const getSandbox = ({ ctx }: CtxObj) => {
  canvasSetup({ ctx })
  const mouse = getSandboxMouse({ ctx })
  const particlesDraw = getParticlesDraw({ ctx })

  return {
    update: () => {
      Particles.update()
      mouse.update()
    },
    draw: async () => {
      await particlesDraw.draw()
      mouse.draw()
    },
  }
}
