import { getInvertedHexColor } from "./utils/color"

export const sandboxScale = 3
export const sandboxWidth = 300
export const sandboxHeight = 200

export const toolboxWidth = 150
export const toolboxHeight = sandboxHeight * sandboxScale

export const backgroundColor: HexColor = "#202020"
export const invertedBackgroundColor = getInvertedHexColor(backgroundColor)

export const ambientTemperature = 23
