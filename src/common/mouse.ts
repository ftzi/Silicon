import { scale } from "./utils/consts"

type WhenMouseDown = (props: {
  pos: Pos
  draggingFrom: Pos | undefined
}) => void

export class Mouse {
  private isMouseLeftDown = false
  private isMouseRightDown = false
  private draggingLeftFrom: Pos | undefined = undefined
  private draggingRightFrom: Pos | undefined = undefined

  pos: Pos | undefined = undefined

  private whenMouseLeftDown: WhenMouseDown
  private whenMouseRightDown: WhenMouseDown
  // private onMousePosChange: ((pos: Pos | undefined) => void) | undefined
  private canvas: HTMLCanvasElement

  constructor(props: {
    whenMouseLeftDown: WhenMouseDown
    whenMouseRightDown: WhenMouseDown
    // onMousePosChange: (pos: Pos | undefined) => void
    ctx: CanvasRenderingContext2D
  }) {
    this.whenMouseLeftDown = props.whenMouseLeftDown
    this.whenMouseRightDown = props.whenMouseRightDown
    this.canvas = props.ctx.canvas
    this.setup()
  }

  update = () => {
    this.updateWhenMouseDown()
  }

  private updateWhenMouseDown() {
    if (!this.pos) return

    if (this.isMouseLeftDown) {
      this.whenMouseLeftDown({
        pos: this.pos,
        draggingFrom: this.draggingLeftFrom,
      })
      this.draggingLeftFrom = this.pos
    }
    if (this.isMouseRightDown) {
      this.whenMouseRightDown({
        pos: this.pos,
        draggingFrom: this.draggingRightFrom,
      })
      this.draggingRightFrom = this.pos
    }
  }

  private getMousePos = (event: MouseEvent): Pos => {
    const rect = this.canvas.getBoundingClientRect()

    return {
      x: Math.floor((event.clientX - rect.left) / scale),
      y: Math.floor((event.clientY - rect.top) / scale),
    }
  }

  private setup = () => {
    this.canvas.addEventListener("mousemove", (event) => {
      this.pos = this.getMousePos(event)
    })

    this.canvas.addEventListener("mouseleave", () => {
      this.pos = undefined
    })

    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button === 0) this.isMouseLeftDown = true
      if (event.button === 2) this.isMouseRightDown = true
    })

    document.addEventListener("mouseup", (event) => {
      if (event.button === 0) {
        this.isMouseLeftDown = false
        this.draggingLeftFrom = undefined
      }
      if (event.button === 2) {
        this.isMouseRightDown = false
        this.draggingRightFrom = undefined
      }
    })

    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault()
    })
  }
}
