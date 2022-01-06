import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import CopyPassword from '../components/copy-password'

import styles from './password-generator.module.css'

import { generate } from '../utils/generate'

const PasswordGenerator = () => {
  const [config, setConfig] = useState({
    type: 'password',
    pwLength: 24,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: false,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    includeAmbiguousChars: false,
    passphraseLength: 6,
    includeNumberInPassphrase: false,
    titlecasePassphrase: false,
    uppercasePassphrase: false,
    eleet: false,
    separator: '-',
  })
  let pw = generate(config)

  useEffect(() => {
    document.title =
      'Generate cryptographically secure passwords/passphrases · pwizard'
  })

  const onChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })
  }

  return (
    <div className={styles.container}>
      <h1>pwizard</h1>
      <p>
        Generate{' '}
        <a href="https://en.wikipedia.org/wiki/Cryptographically-secure_pseudorandom_number_generator">
          cryptographically secure
        </a>{' '}
        passwords/passphrases.
      </p>
      <div className={styles.generatedPw}>{pw}</div>
      <div className={styles.buttons}>
        <button onClick={() => setConfig({ ...config })}>Regenerate</button>
        <CopyPassword text={pw} />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.type}>
            <div className={styles.title}>Type</div>
            <label className={styles.formControl}>
              <input
                type="radio"
                name="type"
                id="password"
                value="password"
                onChange={onChange}
                checked={config.type === 'password'}
              />
              Password
            </label>
            <label className={styles.formControl}>
              <input
                type="radio"
                name="type"
                id="passphrase"
                value="passphrase"
                onChange={onChange}
                checked={config.type === 'passphrase'}
              />
              Passphrase
            </label>
          </div>
          <div className={styles.options}>
            <div className={styles.title}>Options</div>
            {config.type === 'password' ? (
              <>
                <label>
                  <input
                    type="range"
                    name="pwLength"
                    id="pwLength"
                    min="8"
                    max="128"
                    value={config.pwLength}
                    onChange={onChange}
                  />
                  <br />
                  Length: {config.pwLength}
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="includeLowercase"
                    id="includeLowercase"
                    checked={config.includeLowercase}
                    onChange={onChange}
                  />
                  Lowercase (a-z)
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="includeUppercase"
                    id="includeUppercase"
                    checked={config.includeUppercase}
                    onChange={onChange}
                  />
                  Uppercase (A-Z)
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="includeNumbers"
                    id="includeNumbers"
                    checked={config.includeNumbers}
                    onChange={onChange}
                  />
                  Numbers (0-9)
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="includeSymbols"
                    id="includeSymbols"
                    checked={config.includeSymbols}
                    onChange={onChange}
                  />
                  Symbols (!@#$%^&*)
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="includeAmbiguousChars"
                    id="includeAmbiguousChars"
                    checked={config.includeAmbiguousChars}
                    onChange={onChange}
                  />
                  Ambiguous characters (l, IO, 01)
                </label>
              </>
            ) : (
              <>
                <label>
                  <input
                    type="range"
                    name="passphraseLength"
                    id="pass"
                    min="4"
                    max="20"
                    value={config.passphraseLength}
                    onChange={onChange}
                  />
                  <br />
                  Length: {config.passphraseLength}
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="titlecasePassphrase"
                    id="titlecasePassphrase"
                    checked={config.titlecasePassphrase}
                    onChange={onChange}
                  />
                  Titlecase
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="uppercasePassphrase"
                    id="uppercasePassphrase"
                    checked={config.uppercasePassphrase}
                    onChange={onChange}
                  />
                  Uppercase
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="includeNumberInPassphrase"
                    id="includeNumberInPassphrase"
                    checked={config.includeNumberInPassphrase}
                    onChange={onChange}
                  />
                  Include number
                </label>
                <label className={styles.formControl}>
                  <input
                    type="checkbox"
                    name="eleet"
                    id="eleet"
                    checked={config.eleet}
                    onChange={onChange}
                  />
                  13375p34k
                </label>
                <label>
                  Separator:
                  <input
                    type="text"
                    name="separator"
                    id="separator"
                    maxLength="1"
                    onFocus={(e) => e.target.select()}
                    value={config.separator}
                    checked={config.separator}
                    onChange={onChange}
                  />
                </label>
              </>
            )}
          </div>
        </form>
      </div>
      <p>
        <Link to="/password-strength">Password strength checker</Link> &middot;{' '}
        <a href="https://github.com/rsapkf/pwizard">Source</a>
      </p>
    </div>
  )
}

export default PasswordGenerator
