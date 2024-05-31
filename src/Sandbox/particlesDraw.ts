import { invertedBackgroundColor } from "../common/utils/consts"
import { particleAt } from "./Particle"

const drawOrdersArrayX: Array<number> = []
const drawOrdersArrayY: Array<number> = []
let drawOrderI = 0

export const addToDrawOrder = (x: number, y: number) => {
  drawOrdersArrayX[drawOrderI] = x
  drawOrdersArrayY[drawOrderI++] = y
}

// https://stackoverflow.com/a/74838833/20234776
export const getParticlesDraw = ({ ctx }: CtxObj) => {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  const imageData: ImageData = ctx.createImageData(width, height)
  const imageDataArray: Uint32Array = new Uint32Array(
    imageData.data.buffer,
  ).fill(invertedBackgroundColor)

  /** Returns if there was a change */
  const updateOrders = (): boolean => {
    const hasChanges = drawOrderI > 0

    for (let i = 0; i < drawOrderI; i++) {
      const x = drawOrdersArrayX[i]!
      const y = drawOrdersArrayY[i]!

      imageDataArray[y * imageData.width + x] =
        particleAt(x, y)?.entity.invertedRgb ?? invertedBackgroundColor
    }
    drawOrderI = 0

    return hasChanges
  }

  return {
    draw: async () => {
      updateOrders()
      const bitmap = await createImageBitmap(imageData)

      ctx.drawImage(bitmap, 0, 0, width, height)
    },
  }
}
