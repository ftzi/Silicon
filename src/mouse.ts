import { drawPosition } from "./Draw"
import { Entities } from "./Entities/Entities"
import { Particle, particleAtSafe } from "./Particle"
import { canvas, canvasElement, scale } from "./utils/consts"
import {
  getCircleOutlinePoints,
  getCirclePoints,
  getLinePoints,
} from "./utils/pos"
import { type Pos, isInBounds } from "./utils/pos"

let mousePos: Pos | undefined = undefined
let isMouseLeftDown = false
let isMouseRightDown = false
let draggingLeftFrom: Pos | undefined = undefined
let draggingRightFrom: Pos | undefined = undefined

const mousePosToClear: Array<Pos> = []
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

const getMousePos = (event: MouseEvent): Pos => {
  const rect = canvasElement.getBoundingClientRect()

  return {
    x: Math.floor((event.clientX - rect.left) / scale),
    y: Math.floor((event.clientY - rect.top) / scale),
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
    getLinePoints(draggingLeftFrom ?? mousePos, mousePos).forEach((linePos) => {
      getCirclePoints({ ...linePos, radius }).forEach((pos) => {
        Particle.create({
          ...pos,
          entity: Entities.Sand,
          replace: true,
        })
      })
    })
    draggingLeftFrom = mousePos
  } else if (isMouseRightDown) {
    getLinePoints(draggingRightFrom ?? mousePos, mousePos).forEach(
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
