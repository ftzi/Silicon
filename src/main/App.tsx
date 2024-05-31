import React from "react"
import {
  sandboxHeight,
  sandboxWidth,
  scale,
  toolboxHeight,
  toolboxWidth,
} from "../common/utils/consts"
import { start } from "./main"

let didRun = false

export const App = React.memo(() => {
  const sandboxRef = React.useRef<HTMLCanvasElement>(null)
  const toolboxRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (!didRun) {
      didRun = true
      start({
        ctxSandbox: sandboxRef.current!.getContext("2d")!,
        ctxToolbox: toolboxRef.current!.getContext("2d")!,
      })
    }
  }, [])

  return (
    <div>
      <canvas
        ref={sandboxRef}
        width={sandboxWidth * scale}
        height={sandboxHeight * scale}
        style={{ border: "1px solid black" }}
      />
      <canvas
        ref={toolboxRef}
        width={toolboxWidth * scale}
        height={toolboxHeight * scale}
        style={{ border: "1px solid black" }}
      />
    </div>
  )
})
