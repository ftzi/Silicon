import { sandboxHeight, sandboxWidth } from "../consts"

export const isInBounds = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < sandboxWidth && y < sandboxHeight

type Rect = {
  x: number
  y: number
  width: number
  height: number
}
export const isPosInRect = (pos: Pos, rect: Rect) =>
  pos.x >= rect.x &&
  pos.x < rect.x + rect.width &&
  pos.y >= rect.y &&
  pos.y < rect.y + rect.height

export const getCirclePoints = ({
  x,
  y,
  radius,
}: { x: number; y: number; radius: number }): Array<Pos> => {
  const points: Array<Pos> = []

  for (let y_ = -radius; y_ <= radius; y_++) {
    for (let x_ = -radius; x_ <= radius; x_++) {
      if (x_ * x_ + y_ * y_ <= radius * radius) {
        points.push({ x: x + x_, y: y + y_ })
      }
    }
  }

  return points
}

export const getCircleOutlinePoints = (
  centerX: number,
  centerY: number,
  radius: number,
): Array<Pos> => {
  const points: Array<Pos> = []
  const pointSet = new Set<string>()

  const addPoint = (x: number, y: number) => {
    const pointString = `${x},${y}`

    if (!pointSet.has(pointString)) {
      pointSet.add(pointString)
      points.push({ x, y })
    }
  }

  const addSymmetricPoints = (cx: number, cy: number, x: number, y: number) => {
    addPoint(cx + x, cy + y)
    addPoint(cx - x, cy + y)
    addPoint(cx + x, cy - y)
    addPoint(cx - x, cy - y)
    addPoint(cx + y, cy + x)
    addPoint(cx - y, cy + x)
    addPoint(cx + y, cy - x)
    addPoint(cx - y, cy - x)
  }

  let x = radius
  let y = 0
  let p = 1 - radius

  addSymmetricPoints(centerX, centerY, x, y)

  while (x > y) {
    y++

    if (p <= 0) {
      p = p + 2 * y + 1
    } else {
      x--
      p = p + 2 * y - 2 * x + 1
    }

    if (x < y) break

    addSymmetricPoints(centerX, centerY, x, y)
  }

  return points
}

export const getLinePoints = (start: Pos, end: Pos): Array<Pos> => {
  const pixels: Array<Pos> = []

  let x0 = start.x
  let y0 = start.y
  const x1 = end.x
  const y1 = end.y

  const dx = Math.abs(x1 - x0)
  const dy = Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx - dy

  while (true) {
    pixels.push({ x: x0, y: y0 })

    if (x0 === x1 && y0 === y1) break

    const e2 = 2 * err

    if (e2 > -dy) {
      err -= dy
      x0 += sx
    }
    if (e2 < dx) {
      err += dx
      y0 += sy
    }
  }

  return pixels
}

// Only use when performance isn't required!
export const forWholeScreen = (callback: (x: number, y: number) => void) => {
  for (let x = 0; x < sandboxWidth; x++) {
    for (let y = 0; y < sandboxHeight; y++) {
      callback(x, y)
    }
  }
}
