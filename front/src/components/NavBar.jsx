
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { IoHome } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { PiSuitcaseSimpleBold, PiUserDuotone, PiUsersThreeFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ToastCustom from "./ToastCustom";
export default function NavBar() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const {loggedUser} = useSelector(state => state.auth);
  const { showToast, message, variant } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>

          <Navbar.Brand href="#home">HELPDESK</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isAuthenticated ?
              <>
                <Nav className="me-auto">
                  <div className='nav-link' ><Link to="/dashboard" title="Strona główna"> <IoHome /></Link></div>
                  <div className='nav-link' ><Link to="/users" title="Użytkownicy"> <PiUsersThreeFill /></Link></div>
                  <div className='nav-link' ><Link to="/tickets" title="Zgłoszenia"> <PiSuitcaseSimpleBold /></Link></div>

                </Nav>

                <Nav>
                  <NavDropdown title={loggedUser.login} id="navbarScrollingDropdown">
                    <NavDropdown.Item><Link to={`/users/` + loggedUser.login}><PiUserDuotone />Profil</Link></NavDropdown.Item>
                    <NavDropdown.Item> <Link to="/logout"><MdLogout /> Wyloguj</Link></NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
              : ""}
          </Navbar.Collapse>
          <ToastCustom  showToast={showToast} variant={variant} message={message} />
        </Container>
    
      </Navbar>

    </>


  )
}