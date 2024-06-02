import { type Rgb, invertHex } from "./utils/color"

export const sandboxScale = 3
export const sandboxWidth = 300
export const sandboxHeight = 200

export const toolboxWidth = 150
export const toolboxHeight = sandboxHeight * sandboxScale

export const backgroundColor: Rgb = "#121212"
export const invertedBackgroundColor = invertHex(backgroundColor)
