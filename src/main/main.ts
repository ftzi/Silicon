import { getSandbox } from "../Sandbox/Sandbox"
import { getToolbox } from "../Toolbox/Toolbox"

import { Fps } from "../common/utils/fps"
import { benchmark } from "../common/utils/fps"

export const start = (props: {
  ctxSandbox: Ctx
  ctxToolbox: Ctx
}) => {
  const sandbox = getSandbox({ ctx: props.ctxSandbox })
  const toolbox = getToolbox({ ctx: props.ctxToolbox })

  const update = async () => {
    if (Fps.shouldLoop()) {
      Fps.update()
      sandbox.update()

      benchmark("draw")
      await sandbox.draw()
      toolbox.draw()
      Fps.draw(props.ctxToolbox)

      benchmark("draw", true)
    }
    requestAnimationFrame(update)
  }

  void update()
}
