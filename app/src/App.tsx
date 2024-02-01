import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import Home from './components/Home';
import Topics from './components/Topics';
import Users from './components/Users';
import Profile from './components/profile';


function App() {
  return (
    <div className='flex w-screen justify-center items-center'>
    <Router>
    <div className='flex justify-center w-[1600px]'>
      <SideBar />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/topics" element={<Topics/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  </Router>
    </div>
  )
}

export default App
