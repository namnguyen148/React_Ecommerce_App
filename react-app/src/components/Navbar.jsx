import { VscAccount } from "react-icons/vsc";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthUser from "../components/AuthUser";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "../config/axiosCustom";
import React, { useState, useEffect } from "react";
import * as formik from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { addDataSearch } from "../redux/reducer/SearchSlice";
import { useNavigate } from "react-router-dom";
import "../assets/css/Categories.css";

export default function NavScrollHomePage() {
  const { logoutCustomer, customerToken } = AuthUser();
  const { data: cartProducts } = useSelector((state) => state.CartSlice);
  const [data, setData] = useState([]);
  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup
      .string()
      .test("csrf-safe", "Tên không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutCustomer();
    window.location.reload();
  };

  const fetchListCategories = async (values) => {
    try {
      const response = await axios.get("/categories/list", values);
      setData(response.data.data);
      // console.log("danh sach san phẩm:", response.data.data);
    } catch (error) {
      console.error("get list categories error:", error);
    }
  };

  useEffect(() => {
    fetchListCategories();
  }, []);

  const RecursiveCategory = ({ category, handelSearch }) => {
    if (!category.children || category.children.length === 0) {
      return (
        <NavDropdown.Item
          key={category.id}
          title={category.name}
          onClick={() => {
            dispatch(addDataSearch({ cat_id: category.id }, "navbar"));
            navigate("/products");
          }}
        >
          {category.name}
        </NavDropdown.Item>
      );
    } else {
      return (
        <NavDropdown
          className="navbarCategories"
          key={category.id}
          title={category.name}
          id={`nav-dropdown`}
          drop="end"
        >
          {category.children.map((childCategory) => (
            <RecursiveCategory
              key={childCategory.id}
              category={childCategory}
              handelSearch={handelSearch}
            />
          ))}
        </NavDropdown>
      );
    }
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-light bg-body-secondary py-3 sticky-top"
    >
      <Container fluid>
        <Navbar.Brand className="fw-bold fs-4 px-2" href="/">
          Mini Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100vh" }}
            navbarScroll
          >
            <Nav.Link href="/">Trang Chủ</Nav.Link>
            <NavDropdown
              title="Sản phẩm"
              id="navbarScrollingDropdown"
              alignRight
            >
              <NavDropdown.Item href="/products">Tất cả</NavDropdown.Item>
              {data.map((category) => (
                <RecursiveCategory key={category.id} category={category} />
              ))}
            </NavDropdown>
          </Nav>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              dispatch(addDataSearch(values));
              navigate("/products");
            }}
            initialValues={{
              product_name: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} className="my-form">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder=" Tìm kiếm"
                    name="product_name"
                    value={values.product_name}
                    onChange={handleChange}
                    isInvalid={touched.product_name && !!errors.product_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.product_name}
                  </Form.Control.Feedback>
                  <Button type="submit" className="BtnSearchProducts btn btn-dark">
                    <BiSearchAlt2 style={{ fontSize: "24px" }} />
                  </Button>
                </InputGroup>
              </Form>
            )}
          </Formik>
          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Header>
                  <Row>
                    {!customerToken && (
                      <Link to="/login" className="btn btn-outline-dark mb-3">
                        Đăng nhập
                      </Link>
                    )}
                    {!customerToken && (
                      <Link to="/register" className="btn btn-outline-dark">
                        Đăng ký
                      </Link>
                    )}
                    {customerToken && (
                      <Link
                        className="btn btn-outline-dark"
                        onClick={handleLogout}
                      >
                        Đăng Xuất
                      </Link>
                    )}
                  </Row>
                </Popover.Header>
                <Popover.Body className="text-center">
                  <Row className="orderProducts">
                  {customerToken && (
                    <>
                      <Link to="/order" className="text-decoration-none text-dark">
                        Theo Dõi Đơn Hàng
                      </Link>
                      <hr />
                      <Link to="/order_history" className="text-decoration-none text-dark">
                        Lịch Sử Đơn Hàng
                      </Link>
                      <hr />
                      <Link to="/address" className="text-decoration-none text-dark">
                        Thêm địa chỉ mới
                      </Link>
                      <hr />
                    </>
                  )}
                  </Row>
                </Popover.Body>
              </Popover>
            }
          >
            <Link className="btn">
              <VscAccount style={{ fontSize: "24px" }} />
            </Link>
          </OverlayTrigger>
          <Link to="/cart" className="btn" style={{ position: "relative" }}>
            <MdShoppingCart style={{ fontSize: "24px" }} />
            {cartProducts.length >= 1 && (
              <span
                className="badge bg-danger"
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "0px",
                  minWidth: "20px",
                  padding: "5px",
                  fontSize: "9px",
                  borderRadius: "50%",
                  textAlign: "center",
                }}
              >
                {cartProducts.length}
              </span>
            )}
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
