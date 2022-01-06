export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    throw new Error('cannot copy')
  }
}
