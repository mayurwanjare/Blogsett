import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

const CustomNavbar = () => {

  let navigate=useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [login,setLogin]=useState(false)
  const [user,setUser]=useState(undefined)

  useEffect(()=>{

    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())

  },[login])

  const logout=()=> {
    doLogout(()=>{
      //Logged out
      setLogin(false)
      navigate("/")
      
    })
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" className="px-5">
        <NavbarBrand tag={ReactLink} to="/"><b>BlogSett</b></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

            <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="/contact">Contact us</DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
                <DropdownItem tag={ReactLink} to="https://instagram.com/_.mayur___">Instagram</DropdownItem>
                <DropdownItem tag={ReactLink} to="https://www.linkedin.com/in/mayur-wanjare-880157355?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>

            {
              login && (
                <>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile-info"  >
                    Profile Info
                  </NavLink>
                </NavItem>

              

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard" >
                    {user.email}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>

                </>
              )
            }

             {
              !login && (
                <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
                </>
              )
             }


          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
