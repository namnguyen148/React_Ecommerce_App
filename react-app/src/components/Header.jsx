import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthUser from './AuthUser';

export default function UsersHeader() {
  const {logout} = AuthUser();
  const userString = localStorage.getItem('user');
  const user_detail = JSON.parse(userString);
  const shouldShowUsersLink = user_detail !== "editor" && user_detail !== "reviewer";
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand className="fw-bold fs-4 px-2" href="/admin/products">Mini Store</Navbar.Brand>
        {/* <img src="https://themewagon.github.io/MiniStore/images/main-logo.png" alt="" /> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {shouldShowUsersLink && (
              <Nav.Link href="/admin/users">Người dùng</Nav.Link>
            )}
            <Nav.Link href="/admin/products">Sản phẩm</Nav.Link>
            <Nav.Link href="/admin/orders">Đơn hàng</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              {user_detail}
            </Navbar.Text>
            <Nav.Link onClick={logout}>|| Đăng xuất</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
