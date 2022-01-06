// Source: https://github.com/EFForg/OpenWireless/blob/9a93f9ed6033751d121c6851e86375b2b4912ab2/app/js/diceware.js#L59
export const getRandomInt = (min, max) => {
  let rval = 0
  const range = max - min

  const bits_needed = Math.ceil(Math.log2(range))
  if (bits_needed > 53) {
    throw new Error('We cannot generate numbers larger than 53 bits.')
  }
  const bytes_needed = Math.ceil(bits_needed / 8)
  const mask = Math.pow(2, bits_needed) - 1
  // 7776 -> (2^13 = 8192) -1 == 8191 or 0x00001111 11111111

  // Create byte array and fill with N random numbers
  const byteArray = new Uint8Array(bytes_needed)
  window.crypto.getRandomValues(byteArray)

  let p = (bytes_needed - 1) * 8
  for (var i = 0; i < bytes_needed; i++) {
    rval += byteArray[i] * Math.pow(2, p)
    p -= 8
  }

  // Use & to apply the mask and reduce the number of recursive lookups
  rval = rval & mask

  if (rval >= range) {
    // Integer out of acceptable range
    return getRandomInt(min, max)
  }
  // Return an integer that falls within the range
  return min + rval
}
