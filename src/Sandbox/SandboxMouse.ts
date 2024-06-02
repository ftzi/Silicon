import type { Entity } from "../Entities/Entity"
import { Mouse } from "../common/Mouse"
import { data } from "../common/data"
import {
  getCircleOutlinePoints,
  getCirclePoints,
  getLinePoints,
  isInBounds,
} from "../common/utils/points"
import { Particle, particleAtSafe } from "./Particle"

const radius = 15

const onMouseDown = (props: {
  pos: Pos
  draggingFrom: Pos | undefined
  entity: Entity | null
}) => {
  const points = props.draggingFrom
    ? getLinePoints(props.draggingFrom, props.pos)
    : [props.pos]

  points.forEach((linePos) => {
    getCirclePoints({ ...linePos, radius }).forEach((pos) => {
      props.entity
        ? Particle.create({
            ...pos,
            entity: props.entity,
            replace: true,
          })
        : particleAtSafe(pos.x, pos.y)?.remove()
    })
  })
}

export const getSandboxMouse = ({ ctx }: CtxObj) => {
  const mouse = new Mouse({ ctx })

  mouse.whenMouseLeftDown = ({ pos, draggingFrom }) => {
    onMouseDown({
      pos,
      entity: data.left,
      draggingFrom,
    })
  }
  mouse.whenMouseRightDown = ({ pos, draggingFrom }) => {
    onMouseDown({
      pos,
      entity: data.right,
      draggingFrom,
    })
  }

  const drawMousePosition = () => {
    if (!mouse.pos) return
    getCircleOutlinePoints(mouse.pos.x, mouse.pos.y, radius).forEach((pos) => {
      if (isInBounds(pos.x, pos.y)) {
        ctx.fillStyle = "#ff000040"
        ctx.fillRect(pos.x, pos.y, 1, 1)
        // mousePosToClear.push({ ...pos })
      }
    })
  }

  return {
    mouse,
    update: () => {
      mouse.update()
    },
    draw: () => {
      drawMousePosition()
    },
  }
}
