import { getRandomInt } from './get-random-int'

export const shuffleArray = async (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomInt(0, i)
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
