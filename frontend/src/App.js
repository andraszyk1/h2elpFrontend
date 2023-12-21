
import React from 'react'
import UsersScreen from './components/UsersScreen'
import TicketsScreen from './components/TicketsScreen'
import TicketSinglePage from './components/TicketSinglePage'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { TicketEditForm } from './components/TicketEditForm'
import { TicketAddForm } from './components/TicketAddForm'
import Login from './components/Login'
import Logout from './components/Logout'
import UserProfile from './components/UserProfile'
import Dashboard from './components/Dashboard'
import { TicketAddAccept } from './components/TicketAddAccept'
import { Container } from 'react-bootstrap'
import { TicketPostAddForm } from './components/TicketPostAddForm'

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/tickets/add' element={<TicketAddForm />} />
            <Route  path='/tickets/edit/:id' exact element={<TicketEditForm />} />
            <Route path='/users' element={<UsersScreen />} />
            <Route path='/users/:login' element={<UserProfile />} />
            <Route path='/tickets' element={<TicketsScreen />} />
            {/* <Route path='/tickets/:filter' element={<TicketsScreen />} /> */}
            <Route path='/tickets/accept/:id' element={<TicketAddAccept />} />
            <Route path='/tickets/:id' element={<TicketSinglePage />} />
            <Route path='/tickets/post/add/:id' element={<TicketPostAddForm />} />
          </Routes>
        </Container>
      </>
    </Router>
  )
}
export {Routes}
export default App
