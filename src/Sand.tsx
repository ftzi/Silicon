import { useEffect, useRef } from "react"

const width = 800
const height = 600
const cellSize = 2
const sand: Array<Array<number>> = []

const FallingSand = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const ctx = canvas!.getContext("2d")!

    // Initialize sand array
    for (let x = 0; x < width / cellSize; x++) {
      sand[x] = []
      for (let y = 0; y < height / cellSize; y++) {
        sand[x][y] = 0 // 0 means empty, 1 means sand particle
      }
    }

    // Randomly add some sand particles
    const addSandParticles = () => {
      for (let i = 0; i < 500; i++) {
        const x = Math.floor(Math.random() * (width / cellSize))
        const y = Math.floor(Math.random() * (height / cellSize))

        sand[x][y] = 1
      }
    }

    // Update sand particles
    const updateSand = () => {
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

    // Draw sand particles
    const drawSand = () => {
      ctx.clearRect(0, 0, width, height)
      for (let x = 0; x < width / cellSize; x++) {
        for (let y = 0; y < height / cellSize; y++) {
          if (sand[x][y] === 1) {
            ctx.fillStyle = "tan"
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          }
        }
      }
    }

    // Main loop
    const loop = () => {
      updateSand()
      drawSand()
      requestAnimationFrame(loop)
    }

    addSandParticles()
    loop()
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

export default FallingSand
