import "@total-typescript/ts-reset"
/// <reference types="vite/client" />

declare global {
  export type Pos = {
    x: number
    y: number
  }

  export type HexColor = `#${string}`

  export type Ctx = CanvasRenderingContext2D & {
    logicWidth: number
    logicHeight: number
    currentScale: number
  }

  export type CtxObj = {
    ctx: Ctx
  }

  type OmitKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
}
