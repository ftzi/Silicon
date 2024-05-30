import React, { useEffect, useRef } from "react"
import { cellSize, height, setCanvas, width } from "./consts"
import { start } from "./main"

export const Canvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    setCanvas(canvasRef.current!)
    start()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width * cellSize}
      height={height * cellSize}
      style={{ border: "1px solid black" }}
    />
  )
})
