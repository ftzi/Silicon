import { Entities } from "../Entities/Entities"
import type { Entity } from "../Entities/Entity"

export let simulationI = 0
export const incrementSimulationI = () => simulationI++

type Data = {
  left: Entity | null
  right: Entity | null
  radius: number
  running: boolean
  step: boolean
  replace: boolean
}

export const data: Data = {
  left: Entities.Iron,
  right: Entities.Fire,
  radius: 5,
  running: true,
  step: false,
  replace: false,
}
