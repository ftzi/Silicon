export const width = 300
export const height = 200
export const cellSize = 3
export const maxParticles = 5000

export let canvas: CanvasRenderingContext2D =
  undefined as unknown as CanvasRenderingContext2D
export let canvasElement: HTMLCanvasElement =
  undefined as unknown as HTMLCanvasElement

export const setCanvas = (canvasElement_: HTMLCanvasElement) => {
  canvasElement = canvasElement_
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  canvas = canvasElement_.getContext("2d")!
}
