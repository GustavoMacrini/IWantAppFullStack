import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function Header() {
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <Link as={Link} to='/'>IWantApp</Link>
                </Navbar.Brand>
                <Nav className="me-auto">
                    {/*<Nav.Link as={Link} to='/productShowcase'>Pedidos</Nav.Link>*/}
                    <Nav.Link as={Link} to='/products' onClick={handleLinkClick} >Produtos</Nav.Link>
                    {/*<Nav.Link as={Link} to='/productShowcase'>Pricing</Nav.Link>*/}
                </Nav>
                <Nav>
                    <Button as={Link} to='/login'>
                        Login
                    </Button>
                </Nav>
            </Container>
        </Navbar>                   
    )
}

export default Header;