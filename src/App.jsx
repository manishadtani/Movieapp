import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

const App = () => {
  return (
    <div className='bg-[#1f1E24] w-full h-screen'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<div>About</div>} />
        <Route path='/contact' element={<div>Contact</div>} />
      </Routes>
    </div>
  )
}

export default App