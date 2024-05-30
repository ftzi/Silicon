import { particleAt } from "./Particle"
import {
  backgroundColor,
  canvas,
  height,
  invertedBackgroundColor,
  width,
} from "./utils/consts"

const drawOrdersArrayX: Array<number> = []
const drawOrdersArrayY: Array<number> = []
let drawOrderI = 0

export const addToDrawOrder = (x: number, y: number) => {
  drawOrdersArrayX[drawOrderI] = x
  drawOrdersArrayY[drawOrderI++] = y
}

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

export const drawPosition = (x: number, y: number) => {
  const particle = particleAt(x, y)

  if (particle) particle.draw()
  else {
    canvas.fillStyle = backgroundColor
    canvas.fillRect(x, y, 1, 1)
  }
}

let imageData: ImageData = undefined as unknown as ImageData
let imageDataArray: Uint32Array = undefined as unknown as Uint32Array

// https://stackoverflow.com/a/74838833/20234776
export const Draw = {
  setup: () => {
    imageData = canvas.createImageData(width, height)
    imageDataArray = new Uint32Array(imageData.data.buffer)
  },
  draw: async () => {
    updateOrders()
    const bitmap = await createImageBitmap(imageData)

    canvas.drawImage(bitmap, 0, 0, width, height)
  },
}
