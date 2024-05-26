import React, { useEffect, useRef } from "react"
import { Particle, Type } from "./Particle.ts"
import { update } from "./Particle.ts"
import { Pos } from "./Pos.ts"
import { Sand } from "./Sand.ts"
import { canvas, cellSize, height, setCanvas, width } from "./consts.tsx"
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
        pos: new Pos({
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
        }),
        type: Type.Sand,
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
  drawOrders.forEach((fn) => fn())
  drawOrders.length = 0
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
