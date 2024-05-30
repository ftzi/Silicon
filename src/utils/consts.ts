import { type Rgb, invertHex } from "./color"

export const width = 300
export const height = 200
export const scale = 3
export const backgroundColor: Rgb = "#121212"
export const invertedBackgroundColor = invertHex(backgroundColor)

export let canvas: CanvasRenderingContext2D =
  undefined as unknown as CanvasRenderingContext2D
export let canvasElement: HTMLCanvasElement =
  undefined as unknown as HTMLCanvasElement

export const setCanvas = (canvasElement_: HTMLCanvasElement) => {
  canvasElement = canvasElement_
  canvas = canvasElement_.getContext("2d")!
}
