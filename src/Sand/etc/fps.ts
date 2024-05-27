/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { canvas, width } from "../consts.tsx"
import { benchmarkData } from "./benchmark.ts"

// const maxFps = 400
const maxHistorySize = 10

let lastFrameTime = performance.now()
const fpsHistory = new Array(maxHistorySize).fill(0) as Array<number>
let fpsIndex = 0
let lastRenderTime = 0

export const updateFps = () => {
  const now = performance.now()
  const deltaTime = now - lastFrameTime

  lastFrameTime = now
  const fps = 1000 / (deltaTime || 1)

  fpsHistory[fpsIndex] = fps
  fpsIndex = (fpsIndex + 1) % maxHistorySize
}

const getAverageFps = () => {
  const sum = fpsHistory.reduce((a, b) => a + b, 0)

  return sum / fpsHistory.length
}

export const drawFps = () => {
  const averageFps = getAverageFps()

  const textWidth = 20
  const textHeight = 7

  const values = [
    averageFps.toFixed(0),
    (benchmarkData["draw"].average ?? 0).toFixed(1),
    (benchmarkData["update"].average ?? 0).toFixed(1),
  ]

  canvas.fillStyle = "black"
  canvas.fillRect(
    width - textWidth,
    0,
    textWidth,
    textHeight * values.length + 5,
  )

  canvas.fillStyle = "white"
  canvas.font = "3px 'Press Start 2P'"
  canvas.textAlign = "right"

  values.forEach((value, i) =>
    canvas.fillText(value, width - 4, textHeight * (i + 1)),
  )
}

// Also updates lastRenderTime
// const targetFrameDuration = 1000 / maxFps

export const shouldLoop = (): boolean => {
  const now = performance.now()
  const timeSinceLastRender = now - lastRenderTime

  if (timeSinceLastRender >= 0) {
    lastRenderTime = now

    return true
  }

  return false
}
