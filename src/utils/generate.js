import { getRandomInt } from './get-random-int'
import { shuffleArray } from './shuffle'
import { capitalize } from './capitalize'
import { leetspeak } from './leetspeak'

import { words } from '../data/wordlist'

export const generate = (options) =>
  options.type === 'password'
    ? generatePassword(options)
    : generatePassphrase(options)

// Implementation based on https://github.com/bitwarden/jslib/blob/193434461dbd9c48fe5dcbad95693470aec422ac/common/src/services/passwordGeneration.service.ts
const generatePassword = (options) => {
  let charSet = ''
  let lowercase = 'abcdefghijkmnopqrstuvwxyz'
  let uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  let numbers = '23456789'
  let symbols = '!@#$%^&*'
  if (options.includeAmbiguousChars) {
    lowercase += 'l'
    uppercase += 'IO'
    numbers += '01'
  }

  if (options.includeLowercase) {
    charSet += lowercase
  }
  if (options.includeUppercase) {
    charSet += uppercase
  }
  if (options.includeNumbers) {
    charSet += numbers
  }
  if (options.includeSymbols) {
    charSet += symbols
  }

  const minLength =
    options.minUppercase +
    options.minLowercase +
    options.minNumbers +
    options.minSymbols
  if (options.pwLength < minLength) {
    options.pwLength = minLength
  }

  const positions = []
  if (options.includeLowercase && options.minLowercase > 0) {
    for (let i = 0; i < options.minLowercase; i++) {
      positions.push('l')
    }
  }
  if (options.includeUppercase && options.minUppercase > 0) {
    for (let i = 0; i < options.minUppercase; i++) {
      positions.push('u')
    }
  }
  if (options.includeNumbers && options.minNumbers > 0) {
    for (let i = 0; i < options.minNumbers; i++) {
      positions.push('n')
    }
  }
  if (options.includeSymbols && options.minSymbols > 0) {
    for (let i = 0; i < options.minSymbols; i++) {
      positions.push('s')
    }
  }
  while (positions.length < options.pwLength) {
    positions.push('a')
  }

  shuffleArray(positions)

  let password = ''
  for (let i = 0; i < options.pwLength; i++) {
    let currentCharSet
    switch (positions[i]) {
      case 'l':
        currentCharSet = lowercase
        break
      case 'u':
        currentCharSet = uppercase
        break
      case 'n':
        currentCharSet = numbers
        break
      case 's':
        currentCharSet = symbols
        break
      case 'a':
        currentCharSet = charSet
        break
      default:
        break
    }

    if (currentCharSet.length > 0) {
      const randomCharIndex = getRandomInt(0, currentCharSet.length - 1)
      password += currentCharSet.charAt(randomCharIndex)
    } else {
      continue
    }
  }

  return password || leetspeak('Never-Gonna-Give-You-Up')
}

const generatePassphrase = (options) => {
  let wordList = []
  for (let i = 0; i < options.passphraseLength; i++) {
    const wordIndex = getRandomInt(0, words.length - 1)
    wordList[i] = words[wordIndex]
  }

  if (options.includeNumberInPassphrase) {
    const idx = getRandomInt(0, wordList.length - 1)
    wordList[idx] = wordList[idx] + getRandomInt(0, 9)
  }

  if (options.titlecasePassphrase && !options.uppercasePassphrase) {
    wordList = wordList.map((word) => capitalize(word))
  }

  if (options.uppercasePassphrase) {
    wordList = wordList.map((word) => word.toUpperCase())
  }

  if (options.eleet) {
    wordList = wordList.map((word) => leetspeak(word))
  }

  return wordList.join(options.separator || '-')
}
