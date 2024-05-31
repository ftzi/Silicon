import "@total-typescript/ts-reset"
/// <reference types="vite/client" />

declare global {
  export type Pos = {
    x: number
    y: number
  }

  export type CtxObj = {
    ctx: CanvasRenderingContext2D
  }
}
