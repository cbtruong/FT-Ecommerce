import React from 'react'
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Add from './pages/Add';
const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='' element={<Add/>}/>
      </Routes>
    </>
  )
}

export default App
