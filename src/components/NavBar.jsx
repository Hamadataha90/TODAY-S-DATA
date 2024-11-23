import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavBar() {
  const location = useLocation();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
        <Navbar.Brand as={Link} to="/" className="container me-auto">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className='rounded-circle'
          />
        </Navbar.Brand>
        <Nav className="ms-auto" variant="tabs">
          <Nav.Link
            as={Link}
            to="/"
            active={location.pathname === '/'}
            style={{ color: location.pathname === '/' ? 'blue' : 'white' }}
          >
            Home
          </Nav.Link>
          
          <Nav.Link
            as={Link}
            to="/weather"
            active={location.pathname === '/weather'}
            style={{ color: location.pathname === '/weather' ? 'blue' : 'white' }}
          >
            Weather
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/currency"
            active={location.pathname === '/currency'}
            style={{ color: location.pathname === '/currency' ? 'blue' : 'white' }}
          >
            Currency
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/news"
            active={location.pathname === '/news'}
            style={{ color: location.pathname === '/news' ? 'blue' : 'white' }}
          >
            NEWS
          </Nav.Link>
          
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
