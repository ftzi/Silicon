import type { Entity } from "../Entities/Entity"
import { data } from "../common/data"
import { isPosInRect } from "../common/utils/points"

export class EntityButton {
  private entity: Entity
  private isHovered: boolean = false
  private ctx: Ctx
  private padding = 4
  private textHeight = 13
  private selectorSize = 5
  private toolboxWidth: number
  x: number
  y: number
  width: number
  height: number

  constructor(props: {
    entity: Entity
    x: number
    y: number
    toolboxWidth: number
    ctx: Ctx
  }) {
    this.toolboxWidth = props.toolboxWidth
    this.entity = props.entity
    this.ctx = props.ctx
    this.x = props.x
    this.y = props.y
    this.width = this.toolboxWidth - this.x - this.padding * 2
    this.height = this.height = this.textHeight + this.padding * 2
  }

  checkLeftClick(pos: Pos) {
    if (isPosInRect(pos, this)) data.left = this.entity
  }

  checkRightClick(pos: Pos) {
    if (isPosInRect(pos, this)) data.right = this.entity
  }

  checkHover(pos: Pos | undefined) {
    this.isHovered = pos ? isPosInRect(pos, this) : false
  }

  draw() {
    this.ctx.font = `${this.textHeight}px 'Press Start 2P'`
    this.ctx.textAlign = "left"
    this.ctx.textBaseline = "top"

    this.ctx.fillStyle = this.isHovered ? "#f003" : "#0000"
    this.ctx.fillRect(this.x, this.y, this.width, this.height)

    const selectorX = this.x + this.padding
    const selectorY = this.y + this.padding

    if (data.left === this.entity) {
      this.ctx.fillStyle = "#f00"
      this.ctx.fillRect(
        selectorX,
        selectorY,
        this.selectorSize,
        this.selectorSize,
      )
    }

    if (data.right === this.entity) {
      this.ctx.fillStyle = "#00f"
      this.ctx.fillRect(
        selectorX,
        selectorY,
        this.selectorSize,
        this.selectorSize,
      )
    }

    const textX = selectorX + this.selectorSize + this.padding
    const textY = this.y + this.padding

    this.ctx.fillStyle = this.entity.rgb
    this.ctx.fillText(this.entity.name.toUpperCase(), textX, textY)
  }
}
