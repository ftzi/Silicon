import type { Entity } from "../Entities/Entity"
import { sandboxHeight, sandboxWidth } from "../common/consts"
import { data, incrementSimulationI, simulationI } from "../common/data"
import { getInvertedHexColor } from "../common/utils/color"
import { benchmark } from "../common/utils/fps"
import { LinkedList, type LinkedListItem } from "../common/utils/linkedList"
import { isInBounds } from "../common/utils/points"
import { addToDrawOrder } from "./particlesDraw"

const matrixParticles: Array<Array<Particle | undefined>> = []
const linkedParticles = new LinkedList<Particle>()

export const numberParticles = () => linkedParticles.size

export const particleAt = (x: number, y: number): Particle | undefined =>
  matrixParticles[x]![y]
export const particleAtSafe = (x: number, y: number): Particle | undefined =>
  matrixParticles[x]?.[y]

export class Particle {
  private node: LinkedListItem<Particle> = linkedParticles.append(this)
  public swappedAt = -1
  public temperature: number = 23
  public nextTemperature: number | undefined
  public updateNextTempAtI: number = Number.POSITIVE_INFINITY
  public invertedHexColor: number

  public setColor(color: HexColor) {
    const newColor = getInvertedHexColor(color)

    if (newColor !== this.invertedHexColor) {
      this.invertedHexColor = getInvertedHexColor(color)
      addToDrawOrder(this.x, this.y)
    }
  }

  private constructor(
    public x: number,
    public y: number,
    public readonly entity: Entity,
  ) {
    this.invertedHexColor = entity.invertedHexColor
  }

  public convertTo(entity: Entity) {
    ;(this.entity satisfies Entity) = entity
    this.invertedHexColor = entity.invertedHexColor
    addToDrawOrder(this.x, this.y)
  }

  public static create({
    x,
    y,
    entity,
    replace,
  }: { x: number; y: number; entity: Entity; replace?: boolean }) {
    if (isInBounds(x, y)) {
      const particleAtPos = matrixParticles[x]![y]

      if (particleAtPos) {
        if (!replace || entity === particleAtPos.entity) return
        particleAtPos.remove()
      }

      matrixParticles[x]![y] = new Particle(x, y, entity)
      addToDrawOrder(x, y)
    }
  }

  public moveToAdd = (x_: number, y_: number) => {
    const x = this.x + x_
    const y = this.y + y_

    if (isInBounds(x, y)) {
      matrixParticles[this.x]![this.y] = undefined
      addToDrawOrder(this.x, this.y)

      this.x = x
      this.y = y

      matrixParticles[this.x]![this.y] = this
      addToDrawOrder(this.x, this.y)
    } else {
      this.remove()
    }
  }

  public swap = (withParticle: Particle) => {
    const currentX = this.x
    const currentY = this.y

    this.x = withParticle.x
    this.y = withParticle.y

    withParticle.x = currentX
    withParticle.y = currentY

    matrixParticles[this.x]![this.y] = this
    matrixParticles[withParticle.x]![withParticle.y] = withParticle

    this.swappedAt = simulationI
    withParticle.swappedAt = simulationI

    addToDrawOrder(this.x, this.y)
    addToDrawOrder(withParticle.x, withParticle.y)
  }

  public remove = () => {
    matrixParticles[this.x]![this.y] = undefined
    this.node.remove()
    addToDrawOrder(this.x, this.y)
  }

  public temperatureCapacity = 1
  public temperatureTransfer = 1

  get left() {
    return matrixParticles[this.x - 1]?.[this.y]
  }

  get right() {
    return matrixParticles[this.x + 1]?.[this.y]
  }

  get top() {
    return matrixParticles[this.x]?.[this.y - 1]
  }

  get bottom() {
    return matrixParticles[this.x]?.[this.y + 1]
  }

  get bottomLeft() {
    return matrixParticles[this.x - 1]?.[this.y + 1]
  }

  get bottomRight() {
    return matrixParticles[this.x + 1]?.[this.y + 1]
  }
}

const setupMatrixParticles = () => {
  for (let x = 0; x < sandboxWidth; x++)
    matrixParticles[x] = new Array<undefined>(sandboxHeight).fill(undefined)
}

export const Particles = {
  setup: () => {
    setupMatrixParticles()
  },
  update: () => {
    if (data.running) {
      if (data.step) {
        data.running = false
        data.step = false
      }
      updateParticles()
    }
  },
}

const updateParticles = () => {
  benchmark("update")

  const fromHead = Math.random() > 0.5

  // // This avoids logical biases in the behavior of the particle.
  let node = fromHead ? linkedParticles.head : linkedParticles.tail

  while (node) {
    const particle = node.value

    node = fromHead ? node.next : node.prev

    if (
      particle.nextTemperature !== undefined &&
      particle.updateNextTempAtI >= simulationI
    ) {
      particle.temperature = particle.nextTemperature
      particle.updateNextTempAtI = Number.POSITIVE_INFINITY
      particle.nextTemperature = undefined
    }
    particle.entity.update(particle)
    particle.entity.extraUpdate?.(particle)
  }

  incrementSimulationI()
  benchmark("update", true)
}
