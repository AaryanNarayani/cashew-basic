import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import Signup from './routes/Signup'
import Signin from './routes/Signin'
import Error from './routes/Error'
import Dashboard from './routes/Dashboard'
import AuthHOC from './components/AuthHOC'
import Transfer from './routes/Transfer'
import Profile from './routes/Profile'
import History from './routes/History'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/error' element={<Error/>}></Route>
          <Route path='/dashboard' element={<AuthHOC><Dashboard/></AuthHOC>}></Route>
          <Route path='/transfer' element={<AuthHOC><Transfer/></AuthHOC>}></Route>
          <Route path='/profile' element={<AuthHOC><Profile/></AuthHOC>}></Route>
          <Route path='/history' element={<AuthHOC><History/></AuthHOC>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
