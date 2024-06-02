import { Entities } from "../Entities/Entities"
import type { Entity } from "../Entities/Entity"

export let simulationI = 0
export const incrementSimulationI = () => simulationI++

type Data = {
  left: Entity | null
  right: Entity | null
  radius: number
  running: boolean
}

export const data: Data = {
  left: Entities.Sand,
  right: Entities.Water,
  radius: 10,
  running: true,
}
