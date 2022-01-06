import React, { useState } from 'react'

import { copyToClipboard } from '../utils/copy-to-clipboard'

const CopyPassword = ({ text }) => {
  const [buttonText, setButtonText] = useState('Copy')

  return (
    <button
      onClick={() => {
        copyToClipboard(text)
        setButtonText('Copied!')
        setTimeout(() => setButtonText('Copy'), 1500)
      }}
    >
      {buttonText}
    </button>
  )
}

export default CopyPassword
