import { Particles } from "./Particle"
import { getSandboxMouse } from "./SandboxMouse"
import { getParticlesDraw } from "./particlesDraw"

export const getSandbox = ({ ctx }: CtxObj) => {
  ctx.canvas.style.cursor = "none"

  Particles.setup()
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
