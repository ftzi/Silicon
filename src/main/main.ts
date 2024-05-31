import { Particles } from "../Sandbox/Particle"
import { getSandbox } from "../Sandbox/Sandbox"
import { getToolbox } from "../Toolbox/Toolbox"

import { Fps } from "../common/utils/fps"
import { benchmark } from "../common/utils/fps"

export const start = (props: {
  ctxSandbox: CanvasRenderingContext2D
  ctxToolbox: CanvasRenderingContext2D
}) => {
  const sandbox = getSandbox({ ctx: props.ctxSandbox })
  const toolbox = getToolbox({ ctx: props.ctxToolbox })

  Particles.setup()

  const update = async () => {
    if (Fps.shouldLoop()) {
      Fps.update()
      sandbox.update()

      benchmark("draw")
      await sandbox.draw()
      toolbox.draw()
      Fps.draw(props.ctxSandbox)

      benchmark("draw", true)
    }
    requestAnimationFrame(update)
  }

  void update()
}
