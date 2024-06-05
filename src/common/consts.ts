import { getInvertedHexColor } from "./utils/color"

export const sandboxScale = 3
export const sandboxWidth = 300
export const sandboxHeight = 200

export const toolboxWidth = 150
export const toolboxHeight = sandboxHeight * sandboxScale

export const backgroundColor: HexColor = "#202020"
export const invertedBackgroundColor = getInvertedHexColor(backgroundColor)

export const ambientTemperature = 23
export const maxTemp = 9999
export const minTemp = -270

export const getFont = (fontSize: number) => `${fontSize}px Uni0553 `
