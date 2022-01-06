import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import zxcvbn from 'zxcvbn'

import ProgressBar from '../components/progress-bar'

import styles from './password-strength.module.css'

import { capitalize } from '../utils/capitalize'

const PasswordStrength = () => {
  const [input, setInput] = useState('')
  const {
    score,
    crack_times_display: { offline_fast_hashing_1e10_per_second: timeToCrack },
    feedback: { warning, suggestions },
  } = zxcvbn(input)

  useEffect(() => {
    document.title = 'Password strength checker · pwizard'
  })

  return (
    <div className={styles.container}>
      <h2>Password strength checker</h2>
      <p>
        <strong>
          <u>Note</u>
        </strong>
        : This tool does not store any information entered on this page.
      </p>
      <p>
        <Link to="/">&larr; Password generator</Link>
      </p>
      <input
        type="text"
        name="input-password"
        id="input-password"
        placeholder="Enter a password"
        autoFocus
        onFocus={(e) => e.target.select()}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={styles.indicators}>
        {warning && <div className={styles.warning}>&#9888; {warning}</div>}{' '}
        {suggestions.length > 0 && (
          <div>
            <span className={styles.indicator}>Suggestions:</span>
            <ul className={styles.suggestions}>
              {suggestions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <span className={styles.indicator}>Time to crack:</span>
          {capitalize(timeToCrack)}
        </div>
        <div>
          <span className={styles.indicator}>Score based on guessability:</span>
          <div style={{ display: 'inline-block' }}>
            <ProgressBar progress={score * 25} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordStrength
