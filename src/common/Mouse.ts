type WhenMouseDown = (props: {
  pos: Pos
  draggingFrom: Pos | undefined
}) => void

type OnMouseDown = (pos: Pos) => void

export class Mouse {
  private isMouseLeftDown = false
  private isMouseRightDown = false
  private draggingLeftFrom: Pos | undefined = undefined
  private draggingRightFrom: Pos | undefined = undefined

  pos: Pos | undefined = undefined

  /** Runs on every update. */
  public whenMouseLeftDown?: WhenMouseDown
  /** Runs on every update. */
  public whenMouseRightDown?: WhenMouseDown

  public onMouseLeftDown?: OnMouseDown
  public onMouseRightDown?: OnMouseDown
  public onMouseMove?: (pos: Pos | undefined) => void

  // private onMousePosChange: ((pos: Pos | undefined) => void) | undefined
  private canvas: HTMLCanvasElement
  private ctx: Ctx

  constructor(props: {
    ctx: Ctx
  }) {
    this.ctx = props.ctx
    this.canvas = props.ctx.canvas
    this.setup()
  }

  update = () => {
    this.updateWhenMouseDown()
  }

  private updateWhenMouseDown() {
    if (!this.pos) return

    if (this.isMouseLeftDown) {
      this.whenMouseLeftDown?.({
        pos: this.pos,
        draggingFrom: this.draggingLeftFrom,
      })
      this.draggingLeftFrom = this.pos
    }
    if (this.isMouseRightDown) {
      this.whenMouseRightDown?.({
        pos: this.pos,
        draggingFrom: this.draggingRightFrom,
      })
      this.draggingRightFrom = this.pos
    }
  }

  private getMousePos = (event: MouseEvent): Pos => {
    const rect = this.canvas.getBoundingClientRect()

    return {
      x: Math.floor((event.clientX - rect.left) / this.ctx.currentScale),
      y: Math.floor((event.clientY - rect.top) / this.ctx.currentScale),
    }
  }

  private setup = () => {
    this.canvas.addEventListener("mousemove", (event) => {
      this.pos = this.getMousePos(event)
      this.onMouseMove?.(this.pos)
    })

    this.canvas.addEventListener("mouseleave", () => {
      this.pos = undefined
      this.onMouseMove?.(this.pos)
    })

    this.canvas.addEventListener("mousedown", (event) => {
      this.pos = this.getMousePos(event)

      if (event.button === 0) {
        this.onMouseLeftDown?.(this.pos)
        this.isMouseLeftDown = true
      }

      if (event.button === 2) {
        if (this.isMouseRightDown) {
          this.onMouseRightDown?.(this.pos)
        }
        this.isMouseRightDown = true
      }
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
