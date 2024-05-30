import { particleAt } from "./Particle"
import { canvas, cellSize, height, width } from "./consts"

type DrawOrder = { x: number; y: number }

export const drawOrdersArray: Array<DrawOrder> = []

export let drawOrderI = 0

export const addToDrawOrder = (order: DrawOrder) => {
  drawOrdersArray[drawOrderI++] = order
}

const updateOrders = () => {
  for (let i = 0; i < drawOrderI; i++) {
    const order = drawOrdersArray[i]
    // const particle = particleAt(order.x, order.y)

    // particle ? particle.draw() : canvas.clearRect(order.x, order.y, 1, 1)
    updateImageData(order.x, order.y)
  }
  drawOrderI = 0
}

export const drawPosition = (x: number, y: number) => {
  const particle = particleAt(x, y)

  particle ? particle.draw() : canvas.clearRect(x, y, 1, 1)
}

let imageData: ImageData = undefined as unknown as ImageData

const realWidth = width * cellSize
const realHeight = height * cellSize

const blackRgb = { r: 0, g: 0, b: 0 }

const updateImageData = (x: number, y: number) => {
  const rgb = particleAt(x, y)?.type.rgb ?? blackRgb

  for (let y_ = 0; y_ < cellSize; y_++) {
    for (let x_ = 0; x_ < cellSize; x_++) {
      const index = ((y * cellSize + y_) * realWidth + x * cellSize + x_) * 4

      imageData.data[index] = rgb.r
      imageData.data[index + 1] = rgb.g
      imageData.data[index + 2] = rgb.b
      imageData.data[index + 3] = 255
    }
  }
}

export const Draw = {
  setup: () => {
    imageData = canvas.createImageData(realWidth, realHeight)
  },
  draw: () => {
    updateOrders()
    canvas.putImageData(imageData, 0, 0)
  },
}
