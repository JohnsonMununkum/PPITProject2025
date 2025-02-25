import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//NavigationBar includes links that direct user to a different page
const NavBar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="/">
            <img src="/Images/logo.jpeg" alt="logo" width="100" height="100" />            </Navbar.Brand>
            <Nav className="navbar">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;