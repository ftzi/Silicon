export type Rgb = `#${string}`

// As we use Uint32Array for the imageData, we need to convert the hex color from '#AABBCC' to 0xFFCCBBAA.
export const invertHex = (input: Rgb): number => {
  // Invert the order
  const invertedHex =
    input
      .replace("#", "")
      .toUpperCase()
      .match(/.{1,2}/g)
      ?.reverse()
      .join("") ?? ""

  // Add 'FF' to the beginning
  const resultHex = `FF${invertedHex}`

  // Convert the result hex string back to a number
  return Number.parseInt(resultHex, 16)
}
