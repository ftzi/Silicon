import { setupMatrixParticles } from "./Particle"
import { Particles } from "./Particles"
import { canvas, cellSize } from "./consts"
import { Draw } from "./draw.ts"
import { benchmark } from "./etc/benchmark"
import { Fps } from "./etc/fps"
import { Mouse } from "./mouse"

const setup = () => {
  canvasSetup()
  setupMatrixParticles()
  Particles.setup()
  Mouse.setup()
  Draw.setup()
}

const draw = () => {
  benchmark("draw", "start")
  Draw.draw()
  Fps.draw()
  Mouse.draw()
  benchmark("draw", "end")
}

const loop = () => {
  if (Fps.shouldLoop()) {
    Fps.update()
    Particles.update()
    Mouse.update()
    draw()
  }
  requestAnimationFrame(loop)
}

let didRun = false

export const start = () => {
  if (!didRun) {
    didRun = true
    setup()
    loop()
  }
}

const canvasSetup = () => {
  canvas.imageSmoothingEnabled = false
  canvas.setTransform(1, 0, 0, 1, 0, 0)
  canvas.scale(cellSize, cellSize)
}
