import { Entities } from "../Entities/Entities"
import { canvasSetup } from "../common/canvas"
import { backgroundColor } from "../common/utils/consts"

export const getToolbox = ({ ctx }: CtxObj) => {
  canvasSetup({ ctx })

  return {
    update: () => {},
    draw: () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = "white"
      ctx.font = "5px 'Press Start 2P'"
      // ctx.textAlign = "left"
      Object.entries(Entities).forEach(([key], i) => {
        ctx.fillText(key, 0, 5 * (i + 1))
      })
    },
  }
}
