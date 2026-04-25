import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeMain from './pages/Home/HomeMain'
import SignUp from './pages/SignUp/SignUpI'
import Login from './pages/Login/Login'

const routes = (
  <Router>
    <Routes>
      <Route path='dashboard' element={<HomeMain />} />
      <Route path='/' element={<Login />} />
      <Route path='signUp' element={<SignUp />} />
    </Routes>
  </Router>
)


const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
