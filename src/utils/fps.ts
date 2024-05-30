import { linkedParticles } from "../Particle"
import { canvas, width } from "./consts"

// const maxFps = 400
// const targetFrameDuration = (1000 / maxFps) * 0.9
export const maxHistorySize = 50
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
  fpsHistory[fpsIndex] = 1000 / (deltaTime || 1)
  fpsIndex = (fpsIndex + 1) % maxHistorySize
}

const getAverageFps = () =>
  fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length

const drawFps = () => {
  const averageFps = getAverageFps()

  const values = [
    `FPS ${averageFps.toFixed(0)}`,
    `Draw ${benchmarkData["draw"]!.average.toFixed(1)}ms`,
    `Upda ${benchmarkData["update"]!.average.toFixed(1)}ms`,
    `Count ${linkedParticles.size}`,
  ]

  const maxLen = values.reduce((a, b) => (b.length > a ? b.length : a), 0)

  const textWidth = Math.floor(maxLen * 3)
  const textHeight = 4
  const padding = 3

  //
  ;["#ffffff", "#000000"].forEach((color, i) => {
    canvas.fillStyle = color
    canvas.fillRect(
      width - i,
      i,
      -(textWidth + padding * 2 - i * 2),
      textHeight * values.length + padding * 2 - i * 2,
    )
  })

  canvas.fillStyle = "white"
  canvas.font = "3px 'Press Start 2P'"
  canvas.textAlign = "right"
  values.forEach((value, i) =>
    canvas.fillText(value, width - padding, textHeight * (i + 1) + padding),
  )
}

type BenchmarkRecord = {
  start?: number
  delta?: number
}

export const benchmarkData: Record<
  string,
  { records: Array<BenchmarkRecord>; average: number; index: number }
> = {}

export const benchmark = (identifier: string, type: "start" | "end") => {
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const benchmark = (benchmarkData[identifier] ??= {
    records: [],
    average: 0,
    index: 0,
  })
  const records = benchmark.records

  if (type === "start") {
    records[benchmark.index] = { start: performance.now() }

    return
  }

  const record = records[benchmark.index]

  if (!record?.start) throw new Error('benchmark "start" not set!')

  record.delta = performance.now() - record.start
  benchmark.index = (benchmark.index + 1) % maxHistorySize

  benchmark.average =
    records.reduce((sum, record) => sum + (record.delta ?? 0), 0) /
    records.length
}
