import './App.css'

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import SignIn from './pages/SignIn/SignIn'
import VerifyUser from './components/VerifyUser'
function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route element={<VerifyUser/>}>
        <Route path='/' element={<Home/>}/>
        </Route>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
