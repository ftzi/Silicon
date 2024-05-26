import { Particle, Type } from "./Particle.ts"
import { Pos, type Pos2D, addPos } from "./Pos.ts"
import { Sand } from "./Sand.ts"
import { canvasElement, cellSize } from "./consts.tsx"

let mousePos: Pos2D = { x: 0, y: 0 }

export const getMousePos = (event: MouseEvent) => {
  const rect = canvasElement.getBoundingClientRect()

  return {
    x: Math.floor((event.clientX - rect.left) / cellSize),
    y: Math.floor((event.clientY - rect.top) / cellSize),
  }
}

export const drawMousePosition = () => {
  // canvas.fillStyle = "red"
  // canvas.beginPath()
  // canvas.arc(mousePos.x, mousePos.y, 5, 0, 2 * Math.PI)
  // canvas.fill()
}

const brushSize = 10

export const actionWhenMouseDown = () => {
  if (isMouseDown) {
    for (let x = 0; x < brushSize; x++) {
      for (let y = 0; y < brushSize; y++) {
        const pos = addPos(mousePos, { x, y })

        Sand.addParticle(
          new Particle({
            pos: new Pos(pos),
            type: Type.Sand,
          }),
        )
      }
    }
  }
}

let isMouseDown = false

export const setupMouse = () => {
  canvasElement.addEventListener("mousemove", (event) => {
    mousePos = getMousePos(event)
  })

  canvasElement.addEventListener("mousedown", () => {
    isMouseDown = true
  })

  canvasElement.addEventListener("mouseup", () => {
    isMouseDown = false
  })
}
