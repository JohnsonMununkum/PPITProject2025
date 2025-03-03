import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//NavigationBar includes links that direct user to a different page
const NavBar = () => {
    return (
        <Navbar>
            <Container>
            <Navbar.Brand href="/">
            <img src="/Images/logo.jpeg" alt="logo" width="100" height="100" />            </Navbar.Brand>
            <Nav className="nav">
              <Nav.Link href="/">Menu</Nav.Link>
              <Nav.Link href="/">Order to your Door</Nav.Link>
              <Nav.Link href="/">About</Nav.Link>
              <Nav.Link href="/AccountLogin">Account Login</Nav.Link>
              <Nav.Link href="/">Reservations</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;