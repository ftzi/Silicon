import { backgroundColor, scale } from "./utils/consts"

export const canvasSetup = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  ctx.imageSmoothingEnabled = false
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(scale, scale)
  ctx.textRendering = "geometricPrecision"
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}
