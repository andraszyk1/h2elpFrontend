

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from '../../front/src/components/Dashboard'
import Home from '../../front/src/components/Home'
import Login from '../../front/src/components/Login'
import Logout from '../../front/src/components/Logout'
import NavBar from '../../front/src/components/NavBar'
import { TicketPostAddForm } from '../../front/src/components/TicketPostAddForm'
import TicketSinglePage from '../../front/src/components/TicketSinglePage'
import TicketsScreen from '../../front/src/components/TicketsScreen'
import UserProfile from '../../front/src/components/UserProfile'
import UsersScreen from '../../front/src/components/UsersScreen'
import TicketAddByCategory from './components/TicketAddByCategory'
import PrivateRoutes from './routes/PrivateRoutes'
import { Container } from '@chakra-ui/react'
import TicketEditForm from './components/TicketEditForm'


function App() {
  return (
    <Router>
      <>
        <NavBar  />
        <Container maxW='90%'>
          <PrivateRoutes>
              <Route path='/logout' element={<Logout />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/tickets/add' element={<TicketAddByCategory />} />
              <Route path='/tickets/edit/:id' element={<TicketEditForm />} />
              <Route path='/users' element={<UsersScreen />} />
              <Route path='/users/:login' element={<UserProfile />} />
              <Route path='/tickets' element={<TicketsScreen />} />
     
              <Route path='/tickets/:id' element={<TicketSinglePage />} />
              <Route path='/tickets/post/add/:id' element={<TicketPostAddForm />} />
          </PrivateRoutes>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>

        </Container>

      </>
    </Router>
  )
}
export { Routes }
export default App
