import { numberParticles } from "../../Sandbox/Particle"

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
  draw: (ctx: CanvasRenderingContext2D) => {
    drawFps(ctx)
  },
  shouldLoop: (): boolean => performance.now() - lastFrameTime >= 100,
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

const drawFps = (ctx: CanvasRenderingContext2D) => {
  const averageFps = getAverageFps()

  const values = [
    `FPS ${averageFps.toFixed(0)}`,
    `Draw ${benchmarkData["draw"]!.average.toFixed(1)}ms`,
    `Upda ${benchmarkData["update"]!.average.toFixed(1)}ms`,
    `Count ${numberParticles()}`,
  ]

  const maxLen = values.reduce((a, b) => (b.length > a ? b.length : a), 0)

  const textWidth = Math.floor(maxLen * 3)
  const textHeight = 4
  const padding = 3

  //
  ;["#ffffff", "#000000"].forEach((color, i) => {
    ctx.fillStyle = color
    ctx.fillRect(
      ctx.canvas.width - i,
      i,
      -(textWidth + padding * 2 - i * 2),
      textHeight * values.length + padding * 2 - i * 2,
    )
  })

  ctx.fillStyle = "white"
  ctx.font = "3px 'Press Start 2P'"
  ctx.textAlign = "right"
  values.forEach((value, i) =>
    ctx.fillText(
      value,
      ctx.canvas.width - padding,
      textHeight * (i + 1) + padding,
    ),
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

export const benchmark = (identifier: string, end?: true) => {
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const benchmark = (benchmarkData[identifier] ??= {
    records: [],
    average: 0,
    index: 0,
  })

  if (!end) {
    benchmark.records[benchmark.index] = { start: performance.now() }
  } else {
    const record = benchmark.records[benchmark.index]

    if (!record?.start) throw new Error('benchmark "start" not set!')

    record.delta = performance.now() - record.start
    benchmark.index = (benchmark.index + 1) % maxHistorySize

    benchmark.average =
      benchmark.records.reduce((sum, record) => sum + (record.delta ?? 0), 0) /
      benchmark.records.length
  }
}
