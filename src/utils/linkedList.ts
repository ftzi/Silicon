export type LinkedListItem<T> = {
  value: T
  next: LinkedListItem<T> | null
  prev: LinkedListItem<T> | null
  remove: () => void
}

export class LinkedList<T> {
  head: LinkedListItem<T> | null
  tail: LinkedListItem<T> | null
  private size_: number

  get size() {
    return this.size_
  }

  constructor() {
    this.head = null
    this.tail = null
    this.size_ = 0
  }

  append(value: T): LinkedListItem<T> {
    const newNode: LinkedListItem<T> = {
      value,
      next: null,
      prev: this.tail,
      remove: () => {
        this.removeNode(newNode)
      },
    }

    if (this.tail) this.tail.next = newNode
    else this.head = newNode
    this.tail = newNode
    this.size_++

    return newNode
  }

  removeNode(node: LinkedListItem<T>): void {
    if (!this.head) return

    if (node === this.head) {
      this.head = this.head.next
      if (this.head) this.head.prev = null
      else this.tail = null
    } else {
      if (node.prev) node.prev.next = node.next
      if (node.next) node.next.prev = node.prev
      if (this.tail === node) this.tail = node.prev
    }

    this.size_--
  }
}
