
import React from 'react'
import UsersScreen from '../../front/src/components/UsersScreen'
import TicketsScreen from '../../front/src/components/TicketsScreen'
import TicketSinglePage from '../../front/src/components/TicketSinglePage'
import Home from '../../front/src/components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from '../../front/src/components/NavBar'
import { TicketEditForm } from '../../front/src/components/TicketEditForm'
import { TicketAddForm } from '../../front/src/components/TicketAddForm'
import Login from '../../front/src/components/Login'
import Logout from '../../front/src/components/Logout'
import UserProfile from '../../front/src/components/UserProfile'
import Dashboard from '../../front/src/components/Dashboard'
import { TicketAddAccept } from '../../front/src/components/TicketAddAccept'
import { Container } from 'react-bootstrap'
import { TicketPostAddForm } from '../../front/src/components/TicketPostAddForm'

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
            <Route  path='/tickets/edit/:id' element={<TicketEditForm />} />
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
