import { type Rgb, invertHex } from "./color"

export const sandboxWidth = 300
export const sandboxHeight = 175

export const toolboxWidth = 50
export const toolboxHeight = sandboxHeight

export const scale = 3

export const backgroundColor: Rgb = "#121212"
export const invertedBackgroundColor = invertHex(backgroundColor)
