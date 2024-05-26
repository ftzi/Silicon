import { useEffect, useRef } from "react"

const width = 800
const height = 600
const cellSize = 2
const sand: Array<Array<number>> = []
let canvas: CanvasRenderingContext2D =
  undefined as unknown as CanvasRenderingContext2D
let lastFrameTime = performance.now()

const canvasSetup = () => {
  canvas.imageSmoothingEnabled = false
}
const init = () => {
  canvasSetup()
  // Initialize sand array
  for (let x = 0; x < width / cellSize; x++) {
    sand[x] = []
    for (let y = 0; y < height / cellSize; y++) {
      sand[x][y] = 0
    }
  }
  // Randomly add some sand particles
  const addSandParticles = () => {
    for (let i = 0; i < 5000; i++) {
      const x = Math.floor(Math.random() * (width / cellSize))
      const y = Math.floor(Math.random() * (height / cellSize))

      sand[x][y] = 1
    }
  }

  addSandParticles()
}

const update = () => {
  for (let y = height / cellSize - 1; y >= 0; y--) {
    for (let x = 0; x < width / cellSize; x++) {
      if (sand[x][y] === 1) {
        if (y < height / cellSize - 1 && sand[x][y + 1] === 0) {
          // Move down
          sand[x][y] = 0
          sand[x][y + 1] = 1
        } else if (
          x > 0 &&
          y < height / cellSize - 1 &&
          sand[x - 1][y + 1] === 0
        ) {
          // Move down-left
          sand[x][y] = 0
          sand[x - 1][y + 1] = 1
        } else if (
          x < width / cellSize - 1 &&
          y < height / cellSize - 1 &&
          sand[x + 1][y + 1] === 0
        ) {
          // Move down-right
          sand[x][y] = 0
          sand[x + 1][y + 1] = 1
        }
      }
    }
  }
}

const draw = (props: { fps: number }) => {
  canvas.clearRect(0, 0, width, height)
  for (let x = 0; x < width / cellSize; x++) {
    for (let y = 0; y < height / cellSize; y++) {
      if (sand[x][y] === 1) {
        canvas.fillStyle = "tan"
        canvas.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }
  }

  // Draw FPS counter
  canvas.fillStyle = "white"
  canvas.font = "12px 'Press Start 2P'"
  canvas.fillText(`FPS: ${props.fps.toFixed(0)}`, 10, 30)
}

// Main loop
const loop = () => {
  const now = performance.now()
  const deltaTime = now - lastFrameTime

  lastFrameTime = now
  const fps = 1000 / deltaTime

  update()
  draw({ fps })
  requestAnimationFrame(loop)
}

const start = () => {
  init()
  loop()
}

export const FallingSand = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  console.log("re rendered canvas!")
  useEffect(() => {
    console.log("effected!")

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    canvas = canvasRef.current!.getContext("2d")!
    start()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: "1px solid black" }}
    />
  )
}
