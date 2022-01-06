import React from 'react'

import styles from './progress-bar.module.css'

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{ width: `${progress}%` }}>
        <span className={styles.label}>{`${progress}%`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
