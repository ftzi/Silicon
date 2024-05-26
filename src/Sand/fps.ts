import { canvas, width } from "./consts.tsx"

const maxFps = 400
const maxHistorySize = 60

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

  const fpsWidth = 30
  const fpsHeight = 10

  canvas.fillStyle = "black"
  canvas.fillRect(width - fpsWidth, 0, fpsWidth, fpsHeight)

  canvas.fillStyle = "white"
  canvas.font = "4px 'Press Start 2P'"
  canvas.textAlign = "right"
  canvas.fillText(`${averageFps.toFixed(0)}`, width - 4, 8)
}

// Also updates lastRenderTime
const targetFrameDuration = 1000 / maxFps

export const shouldLoop = (): boolean => {
  const now = performance.now()
  const timeSinceLastRender = now - lastRenderTime

  if (timeSinceLastRender >= 2) {
    lastRenderTime = now

    return true
  }

  return false
}
