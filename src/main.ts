import { Draw, drawPosition } from "./Draw"
import { setupMatrixParticles } from "./Particle"
import { Particles } from "./Particles"
import { Mouse } from "./mouse"
import { canvas, scale } from "./utils/consts"
import { Fps } from "./utils/fps"
import { benchmark } from "./utils/fps"
import { forWholeScreen } from "./utils/pos"

const setup = () => {
  canvasSetup()
  setupMatrixParticles()
  Draw.setup()
  forWholeScreen((x, y) => drawPosition(x, y))
  Particles.setup()
  Mouse.setup()
}

const draw = async () => {
  benchmark("draw", "start")
  await Draw.draw()
  Mouse.draw()
  Fps.draw()
  benchmark("draw", "end")
}

const loop = async () => {
  if (Fps.shouldLoop()) {
    Fps.update()
    Particles.update()
    Mouse.update()
    await draw()
  }
  requestAnimationFrame(loop)
}

let didRun = false

export const start = () => {
  if (!didRun) {
    didRun = true
    setup()
    void loop()
  }
}

const canvasSetup = () => {
  canvas.imageSmoothingEnabled = false
  canvas.setTransform(1, 0, 0, 1, 0, 0)
  canvas.scale(scale, scale)
}
