import { backgroundColor } from "./consts"

export const setupCanvas = (props: {
  ctx: CanvasRenderingContext2D
  scale?: number
}): Ctx => {
  const currentScale = props.scale ?? 1

  const ctx = Object.assign<
    CanvasRenderingContext2D,
    Omit<Ctx, keyof CanvasRenderingContext2D>
  >(props.ctx, {
    logicWidth: props.ctx.canvas.width / currentScale,
    logicHeight: props.ctx.canvas.height / currentScale,
    currentScale,
  }) as Ctx

  props.ctx.imageSmoothingEnabled = false
  props.ctx.scale(currentScale, currentScale)
  props.ctx.textRendering = "geometricPrecision"
  props.ctx.fillStyle = backgroundColor
  props.ctx.fillRect(0, 0, ctx.logicWidth, ctx.logicHeight)

  return ctx
}
