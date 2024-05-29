/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { linkedParticles } from "../Particle"
import { canvas, width } from "../consts"
import { benchmarkData } from "./benchmark"

// const maxFps = 400
// const targetFrameDuration = (1000 / maxFps) * 0.9
const maxHistorySize = 10
const fpsHistory = new Array(maxHistorySize).fill(0) as Array<number>
let fpsIndex = 0
let lastFrameTime = performance.now()

export const Fps = {
  update: () => {
    updateFps()
  },
  draw: () => {
    drawFps()
  },
  shouldLoop: (): boolean => performance.now() - lastFrameTime >= 0,
}

const updateFps = () => {
  const now = performance.now()
  const deltaTime = now - lastFrameTime

  lastFrameTime = now
  const fps = 1000 / (deltaTime || 1)

  fpsHistory[fpsIndex] = fps
  fpsIndex = (fpsIndex + 1) % maxHistorySize
}

const getAverageFps = () =>
  fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length

const drawFps = () => {
  const averageFps = getAverageFps()

  const values = [
    averageFps.toFixed(0),
    `Draw ${(benchmarkData["draw"].average ?? 0).toFixed(1)}`,
    `Upda ${(benchmarkData["update"].average ?? 0).toFixed(1)}`,
    `Part ${linkedParticles.size}`,
  ]

  const maxLen = values.reduce((a, b) => (b.length > a ? b.length : a), 0)

  const textWidth = maxLen * 4
  const textHeight = 7

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
