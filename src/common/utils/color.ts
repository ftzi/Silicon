// As we use Uint32Array for the imageData, we need to convert the hex color from '#AABBCC' to 0xFFCCBBAA.
export const getInvertedHexColor = (input: string): number => {
  // Invert the order
  const hex = input.replace("#", "").toUpperCase()
  let invertedHex =
    hex
      .match(/.{1,2}/g)
      ?.reverse()
      .join("") ?? ""

  // Check if the input has an alpha channel
  if (hex.length === 6) {
    // If the input doesn't have an alpha channel, add 'FF' to the beginning
    invertedHex = `FF${invertedHex}`
  }

  // Convert the result hex string back to a number
  return Number.parseInt(invertedHex, 16)
}

export const isValidColor = (color: string): boolean =>
  /^#[0-9A-F]{6}([0-9A-F]{2})?$/i.test(color)
