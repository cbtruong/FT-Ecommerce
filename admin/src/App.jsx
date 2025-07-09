import React from 'react'
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Add from './pages/Add';
import Sidebar from './components/Sidebar';
const App = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
      <Navbar/>
      <hr/>
      <div className='flex w-full'>
        <Sidebar/>
      </div>
      <Routes>
        <Route path='' element={<Add/>}/>
      </Routes>
      </>
    </div>
  )
}

export default App
