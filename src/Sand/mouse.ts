import { Particle, Types, particleAtSafe } from "./Particle"
import { canvas, canvasElement, cellSize } from "./consts"
import { drawPosition } from "./draw"
import { type Pos2D, isInBounds } from "./pos"
import { getCircleOutlinePoints, getCirclePoints, getLinePixels } from "./utils"

let mousePos: Pos2D | undefined = undefined
let isMouseLeftDown = false
let isMouseRightDown = false
let draggingLeftFrom: Pos2D | undefined = undefined
let draggingRightFrom: Pos2D | undefined = undefined
// const mouseStuff: { x: number; y: number; points: Pos2D } | undefined =
//   undefined
const mousePosToClear: Array<Pos2D> = []
const radius = 8

export const Mouse = {
  setup: () => {
    setupMouse()
  },
  update: () => {
    actionWhenMouseDown()
  },
  draw: () => {
    drawMousePosition()
  },
}

const getMousePos = (event: MouseEvent): Pos2D => {
  const rect = canvasElement.getBoundingClientRect()

  return {
    x: Math.floor((event.clientX - rect.left) / cellSize),
    y: Math.floor((event.clientY - rect.top) / cellSize),
  }
}

const drawMousePosition = () => {
  mousePosToClear.forEach((pos) => drawPosition(pos.x, pos.y))
  mousePosToClear.length = 0

  if (mousePos && isInBounds(mousePos.x, mousePos.y)) {
    getCircleOutlinePoints(mousePos.x, mousePos.y, radius).forEach((pos) => {
      if (isInBounds(pos.x, pos.y)) {
        canvas.fillStyle = "#ff000040"
        canvas.fillRect(pos.x, pos.y, 1, 1)
        mousePosToClear.push({ ...pos })
      }
    })
  }
}

const actionWhenMouseDown = () => {
  if (!mousePos) return

  if (isMouseLeftDown) {
    getLinePixels(draggingLeftFrom ?? mousePos, mousePos).forEach((linePos) => {
      getCirclePoints({ ...linePos, radius }).forEach((pos) => {
        Particle.create({
          ...pos,
          type: Types.Sand,
          replace: true,
        })
      })
    })
    draggingLeftFrom = mousePos
  } else if (isMouseRightDown) {
    getLinePixels(draggingRightFrom ?? mousePos, mousePos).forEach(
      (linePos) => {
        getCirclePoints({ ...linePos, radius }).forEach((pos) => {
          particleAtSafe(pos.x, pos.y)?.remove()
        })
      },
    )
    draggingRightFrom = mousePos
  }
}

const setupMouse = () => {
  canvasElement.addEventListener("mousemove", (event) => {
    mousePos = getMousePos(event)
  })

  canvasElement.addEventListener("mousedown", (event) => {
    if (event.button === 0) isMouseLeftDown = true
    if (event.button === 2) isMouseRightDown = true
  })

  canvasElement.addEventListener("mouseup", (event) => {
    if (event.button === 0) {
      isMouseLeftDown = false
      draggingLeftFrom = undefined
    }
    if (event.button === 2) {
      isMouseRightDown = false
      draggingRightFrom = undefined
    }
  })

  canvasElement.addEventListener("contextmenu", (event) => {
    event.preventDefault()
  })
}
