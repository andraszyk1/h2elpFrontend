
import React from 'react';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import { Navbar,NavDropdown } from "react-bootstrap";
import { useSelector } from 'react-redux';
import {PiUsersThreeFill,PiSuitcaseSimpleBold,PiUserDuotone} from 'react-icons/pi'
import {MdLogout} from 'react-icons/md'
import {IoHome} from 'react-icons/io5'
import { Link } from 'react-router-dom';
import BreadCrumbs from './BreadCrumbs';
export default function NavBar(){
  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
  const account=useSelector(state=>state.auth.loggedUser);
    return(
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
    
        <Navbar.Brand href="#">Helpdesk
  
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            {isAuthenticated ?
            <>
            <div className='nav-link' ><Link style={{color:'black',width:'10rem',height:'10rem'}} to="/dashboard" title="Strona główna"> <IoHome/></Link></div>
            {/* <div className='nav-link' ><Link  title="Dashboard" to="/dashboard"> <TbSitemap/></Link></div> */}
            <div className='nav-link' ><Link title="Użytkownicy" to="/users"> <PiUsersThreeFill/></Link></div>
            <div className='nav-link' ><Link to="/tickets"> <PiSuitcaseSimpleBold/></Link></div>
     
            <NavDropdown title={account.login} id="navbarScrollingDropdown">
      
            <NavDropdown.Item><Link to={`/users/`+account.login}><PiUserDuotone/> Profile</Link></NavDropdown.Item>
              <NavDropdown.Item  href="/logout"><MdLogout/> Wyloguj</NavDropdown.Item>
          
            </NavDropdown>
        {"    "}
     
         
            </>
            :""
            // <Nav.Link href="/login" title="Zaloguj"><PiUserDuotone/></Nav.Link>
          
          }
          
          </Nav>
          <Nav>
          {isAuthenticated ?  <BreadCrumbs/>:""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}