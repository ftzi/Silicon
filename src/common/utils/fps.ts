import { numberParticles, particleAtSafe } from "../../Sandbox/Particle"
import { sandboxMouse } from "../../Sandbox/Sandbox"

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
  draw: (ctx: Ctx) => {
    drawFps(ctx)
  },
  shouldLoop: (): boolean => performance.now() - lastFrameTime >= 14,
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

const drawFps = (ctx: Ctx) => {
  const averageFps = getAverageFps()

  const mousePos = sandboxMouse.pos
  const particleAtMouse = particleAtSafe(mousePos?.x ?? -1, mousePos?.y ?? -1)
  const values = [
    ["Entity", particleAtMouse?.entity.name ?? "-"],
    [
      "Temp",
      particleAtMouse ? `${particleAtMouse.temperature.toFixed(1)}` : "-",
    ],
    ["FPS", averageFps.toFixed(0)],
    ["Draw", `${benchmarkData["draw"]!.average.toFixed(1)}ms`],
    ["Update", `${benchmarkData["update"]!.average.toFixed(1)}ms`],
    ["Count", `${numberParticles()}`],
  ]

  const padding = 8
  const linePadding = 4
  const textHeight = 10

  const height =
    padding * 2 +
    values.length * textHeight +
    (values.length - 1) * linePadding -
    1

  const logoHeight = 30
  const x = 0
  const y = ctx.canvas.height / ctx.currentScale - height - logoHeight

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(x, y, ctx.logicWidth, 1)

  const getTextY = (i: number) => y + padding + textHeight * i + i * linePadding

  ctx.font = `${textHeight}px 'Press Start 2P'`
  values.forEach((value, i) => {
    const textY = getTextY(i)

    ctx.textAlign = "left"
    ctx.fillText(value[0]!, padding, textY)

    ctx.textAlign = "right"
    ctx.fillText(value[1]!, ctx.logicWidth - padding, textY)
  })

  ctx.fillStyle = "#ffffff"
  const logoY = y + height + 2

  ctx.fillRect(x, logoY, ctx.logicWidth, 1)
  ctx.textAlign = "center"
  ctx.textBaseline = "top"
  ctx.font = `${textHeight + 3}px 'Press Start 2P'`
  ctx.fillText("SILICON", ctx.logicWidth / 2, logoY + 9)
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
