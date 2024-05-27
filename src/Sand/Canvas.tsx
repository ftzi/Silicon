import React, { useEffect, useRef } from "react"
import { update } from "./Particle.ts"
import { particleAt, setupMatrixParticles } from "./Particle.ts"
import { canvas, cellSize, height, setCanvas, width } from "./consts.tsx"
import { drawOrderI, resetDrawOrder } from "./draw.ts"
import { drawOrders } from "./draw.ts"
import { benchmark } from "./etc/benchmark.ts"
import { drawFps, shouldLoop, updateFps } from "./etc/fps.ts"
import { actionWhenMouseDown, drawMousePosition, setupMouse } from "./mouse.ts"

// TODO remove
const addParticles = () => {
  // for (let x = 0; x < width; x++) {
  //   for (let y = 0; y < height - 150; y++) {
  //     Particle.create({
  //       pos: {
  //         x,
  //         y,
  //       },
  //       type: Types.Sand,
  //     })
  //   }
  // }
}

const init = () => {
  canvasSetup()
  setupMatrixParticles()
  setupMouse()
  addParticles()
  canvas.clearRect(0, 0, width, height)
}

const draw = () => {
  benchmark("draw", "start")
  for (let i = 0; i < drawOrderI; i++) {
    const order = drawOrders[i]

    if (order.remove) canvas.clearRect(order.pos.x, order.pos.y, 1, 1)
    else particleAt(order.pos)?.draw()
  }
  resetDrawOrder()
  drawFps()
  drawMousePosition()
  benchmark("draw", "end")
}

const loop = () => {
  if (shouldLoop()) {
    updateFps()
    update()
    actionWhenMouseDown()
    draw()
  }
  requestAnimationFrame(loop)
}

const start = () => {
  init()
  loop()
}

const canvasSetup = () => {
  canvas.imageSmoothingEnabled = false
  canvas.setTransform(1, 0, 0, 1, 0, 0)
  canvas.scale(cellSize, cellSize)
}

export const Canvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  console.log("re rendered canvas!")
  useEffect(() => {
    console.log("effected!")

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    setCanvas(canvasRef.current!)
    start()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width * cellSize}
      height={height * cellSize}
      style={{ border: "1px solid black" }}
      onContextMenu={(e) => e.preventDefault()}
    />
  )
})
