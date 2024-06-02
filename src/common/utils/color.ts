// As we use Uint32Array for the imageData, we need to convert the hex color from '#AABBCC' to 0xFFCCBBAA.
export const getInvertedHexColor = (input: HexColor): number => {
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

export const isValidColor = (color: HexColor): boolean =>
  /^#[0-9A-F]{6}$/i.test(color)
