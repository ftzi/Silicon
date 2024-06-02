import React from "react"
import { setupCanvas } from "../common/canvas"
import {
  sandboxHeight,
  sandboxScale,
  sandboxWidth,
  toolboxHeight,
  toolboxWidth,
} from "../common/consts"
import { start } from "./main"

let didRun = false

export const App = React.memo(() => {
  const sandboxRef = React.useRef<HTMLCanvasElement>(null)
  const toolboxRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (!didRun) {
      didRun = true
      start({
        ctxSandbox: setupCanvas({
          ctx: sandboxRef.current!.getContext("2d")!,
          scale: sandboxScale,
        }),
        ctxToolbox: setupCanvas({ ctx: toolboxRef.current!.getContext("2d")! }),
      })
    }
  }, [])

  return (
    <div>
      <canvas
        ref={sandboxRef}
        width={sandboxWidth * sandboxScale}
        height={sandboxHeight * sandboxScale}
        style={{ border: "1px solid black" }}
      />
      <canvas
        ref={toolboxRef}
        width={toolboxWidth}
        height={toolboxHeight}
        style={{ border: "1px solid black" }}
      />
    </div>
  )
})
