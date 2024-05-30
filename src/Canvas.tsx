import React, { useEffect, useRef } from "react"
import { start } from "./main"
import { height, scale, setCanvas, width } from "./utils/consts"

export const Canvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setCanvas(canvasRef.current!)
    start()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width * scale}
      height={height * scale}
      style={{ border: "1px solid black" }}
    />
  )
})
