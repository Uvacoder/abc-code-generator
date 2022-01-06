import React from 'react'
import { Routes, Route } from 'react-router-dom'

import PasswordGenerator from './pages/password-generator'
import PasswordStrength from './pages/password-strength'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PasswordGenerator />} />
        <Route path="password-strength" element={<PasswordStrength />} />
      </Routes>
    </div>
  )
}

export default App
