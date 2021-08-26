import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import './navbar.css'
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
const NavBar = ({ currentUser, currentBoard, logout, userRole }) => {
  const {boardId} = currentBoard;
  return (
    <React.Fragment>
      <IconContext.Provider value={{ color: "white" }}>
      <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand style={{color: "#45A29E"}} ><AiIcons.AiOutlineBug color="#45A29E" size="2rem"/> Bug Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav">
      <span>
        <GiIcons.GiHamburgerMenu color="#45A29E" size="2rem"/>
      </span>
    </Navbar.Toggle>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {currentUser.length !== 0 &&
        <Nav.Link className="customNavLink" as={Link} to="/"> <FiIcons.FiClipboard /><span className="ms-2" style={{color: "#fff"}}>All Boards</span></Nav.Link>
        }
      {currentBoard.length !== 0 && 
      <React.Fragment>
        <Nav.Link className="customNavLink" as={Link} to={`/ShowBoard/${boardId}`}> <AiIcons.AiFillHome /><span className="ms-2" style={{color: "#fff"}}>Board Home</span></Nav.Link>
        {userRole === "Admin" &&
        <Nav.Link  className="customNavLink" as={Link} to="/Invite"><IoIcons.IoMdPeople /><span className="ms-2" style={{color: "#fff"}}>Invite Coworkers</span></Nav.Link>
        }
        <Nav.Link className="customNavLink" as={Link} to="/Notes"><BsIcons.BsPencilSquare /><span className="ms-2" style={{color: "#fff"}}>Notes</span></Nav.Link>
        <Nav.Link className="customNavLink" as={Link} to="/ViewCalendar"><AiIcons.AiOutlineCalendar /><span className="ms-2" style={{color: "#fff"}}>View Calendar</span></Nav.Link>
        <Nav.Link className="customNavLink" as={Link} to="/Chat"><AiIcons.AiOutlineMessage /><span className="ms-2" style={{color: "#fff"}}>Chat</span></Nav.Link>
        <Nav.Link className="customNavLink" as={Link} to="/Email"><AiIcons.AiOutlineMail /><span className="ms-2" style={{color: "#fff"}}>Email</span></Nav.Link>
        </React.Fragment>
      }
      {currentUser.length === 0 && 
      <React.Fragment>
        <Nav.Link className="customNavLink" as={Link} to="/Login"><AiIcons.AiOutlineLogin /><span className="ms-2" style={{color: "#fff"}}>Login</span></Nav.Link>
      <Nav.Link className="customNavLink" as={Link} to="/Signup"><BsIcons.BsPencilSquare /><span className="ms-2" style={{color: "#fff"}}>Signup</span></Nav.Link>
      </React.Fragment>
      } 
      {currentUser.length !== 0 &&
      <Nav.Link className="customNavLink" as={Link} onClick={logout}><FiIcons.FiLogOut /><span className="ms-2" style={{color: "#fff"}}>Logout</span></Nav.Link>
      }
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      </IconContext.Provider>
    </React.Fragment>
  );
};

export default NavBar;
