import React, { useEffect, useRef } from "react"
import { Particle, Types } from "./Particle.ts"
import { update } from "./Particle.ts"
import { Sand, particleAt } from "./Sand.ts"
import {
  canvas,
  cellSize,
  drawOrderI,
  height,
  resetDrawOrder,
  setCanvas,
  width,
} from "./consts.tsx"
import { drawOrders } from "./consts.tsx"
import { drawFps, shouldLoop, updateFps } from "./fps.ts"
import { actionWhenMouseDown, drawMousePosition, setupMouse } from "./mouse.ts"

const canvasSetup = () => {
  canvas.imageSmoothingEnabled = false
  canvas.setTransform(1, 0, 0, 1, 0, 0)
  canvas.scale(cellSize, cellSize)
}

// TODO remove
const addParticles = () => {
  for (let i = 0; i < 5000; i++) {
    Sand.addParticle(
      new Particle({
        pos: {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
        },
        type: Types.Sand,
      }),
    )
  }
}

const init = () => {
  canvasSetup()
  Sand.setup()
  setupMouse()
  addParticles()
  canvas.clearRect(0, 0, width, height)
}

const draw = () => {
  for (let i = 0; i < drawOrderI; i++) {
    const order = drawOrders[i]

    if (order.draw) particleAt(order.pos)?.draw()
    else canvas.clearRect(order.pos.x, order.pos.y, 1, 1)
  }
  resetDrawOrder()
  drawFps()
  drawMousePosition()
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
    />
  )
})
