import { describe, expect, it } from "bun:test"
import { LinkedList } from "./linkedList"

describe("LinkedList", () => {
  it("should append items to the list", () => {
    const list = new LinkedList<number>()

    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.size).toBe(3)
    const values = []
    let current = list.head

    while (current) {
      values.push(current.value)
      current = current.next
    }
    expect(values).toEqual([1, 2, 3])
  })

  it("should remove the first item from the list", () => {
    const list = new LinkedList<number>()

    list.append(1)
    list.append(2)
    list.append(3)

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const removed = list.removeNode(list.head!)

    expect(removed).toBe(undefined)
    expect(list.size).toBe(2)
    const values = []
    let current = list.head

    while (current) {
      values.push(current.value)
      current = current.next
    }
    expect(values).toEqual([2, 3])
  })

  it("should remove the last item from the list", () => {
    const list = new LinkedList<number>()

    list.append(1)
    list.append(2)
    list.append(3)

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const removed = list.removeNode(list.tail!)

    expect(removed).toBe(undefined)
    expect(list.size).toBe(2)
    const values = []
    let current = list.head

    while (current) {
      values.push(current.value)
      current = current.next
    }
    expect(values).toEqual([1, 2])
  })

  it("should remove a node directly", () => {
    const list = new LinkedList<number>()

    list.append(1)
    list.append(2)
    const nodeToRemove = list.append(3)

    list.append(4)
    list.append(5)

    nodeToRemove.remove()

    expect(list.size).toBe(4)
    const values = []
    let current = list.head

    while (current) {
      values.push(current.value)
      current = current.next
    }
    expect(values).toEqual([1, 2, 4, 5])
  })

  it("should handle removing from an empty list", () => {
    const list = new LinkedList<number>()

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const removedFirst = list.removeNode(list.head!)
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const removedLast = list.removeNode(list.tail!)

    expect(removedFirst).toBe(undefined)
    expect(removedLast).toBe(undefined)
    expect(list.size).toBe(0)
  })

  it("should handle out of bounds index for removeNode", () => {
    const list = new LinkedList<number>()

    list.append(1)
    list.append(2)
    list.append(3)

    // Attempt to remove a node not in the list (node with value 5)
    const nodeToRemove = { value: 5, next: null, prev: null, remove: () => {} }
    const removed = list.removeNode(nodeToRemove)

    expect(removed).toBe(undefined)
    // expect(list.size).toBe(3)
    const values = []
    let current = list.head

    while (current) {
      values.push(current.value)
      current = current.next
    }
    expect(values).toEqual([1, 2, 3])
  })
})
