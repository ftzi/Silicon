import Mousetrap from "mousetrap"
import { Entities } from "../Entities/Entities"
import { Mouse } from "../common/Mouse"
import { backgroundColor, toolboxHeight, toolboxWidth } from "../common/consts"
import { data } from "../common/data"
import { EntityButton } from "./EntityButton"

export const getToolbox = ({ ctx }: CtxObj) => {
  const margin = 3

  const x = margin
  const y = margin

  const mouse = new Mouse({ ctx })

  Mousetrap.bind("space", () => {
    data.running = !data.running
  })

  let prevButton: EntityButton | undefined
  const entitiesButtons = Object.values(Entities).map((entity) => {
    prevButton = new EntityButton({
      ctx,
      x,
      y: prevButton ? prevButton.y + prevButton.height : y,
      entity,
      toolboxWidth: ctx.logicWidth,
    })

    return prevButton
  })

  mouse.onMouseMove = (pos) => {
    entitiesButtons.forEach((button) => button.checkHover(pos))
  }

  mouse.onMouseLeftDown = (pos) => {
    entitiesButtons.forEach((button) => button.checkLeftClick(pos))
  }

  mouse.onMouseRightDown = (pos) => {
    entitiesButtons.forEach((button) => button.checkRightClick(pos))
  }

  return {
    update: () => {},
    draw: () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, toolboxWidth, toolboxHeight)
      entitiesButtons.forEach((button) => button.draw())
    },
  }
}
