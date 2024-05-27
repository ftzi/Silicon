import type { Pos2D } from "./pos.ts"

type DrawOrder = { pos: Pos2D; remove?: boolean }

export const drawOrders: Array<DrawOrder> = []

export let drawOrderI = 0

export const addToDrawOrder = (order: DrawOrder) => {
  drawOrders[drawOrderI++] = order
}
export const resetDrawOrder = () => {
  drawOrderI = 0
}
