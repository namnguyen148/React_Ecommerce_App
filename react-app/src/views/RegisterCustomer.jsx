import { Col, Button, Container, Card, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import AuthUser from "../components/AuthUser";
import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Họ và tên không được trống")
      .min(5, "Họ và tên tối thiểu 5 ký tự")
      .max(255, "Họ và tên không được quá 255 ký tự")
      .matches(/^[^\d]+$/, "Họ và tên không được chứa số"),

    tel_num: yup
      .string()
      .required("Số điện thoại không được trống")
      .min(10, "Số điện thoại tối thiểu 10 ký tự")
      .max(20, "Số điện thoại không được quá 20 ký tự")
      .matches(/^\d+$/, "Số điện thoại không được chứa chữ"),

    email: yup
      .string()
      .required("Email không được trống")
      .email("Email không đúng định dạng")
      .min(10, "Email tối thiểu 10 ký tự")
      .max(100, "Email không được quá 100 ký tự")
      .test("csrf-safe", "Email không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),

    // address: yup
    //   .string()
    //   .required("Địa chỉ không được trống")
    //   .max(255, "Địa chỉ không được quá 255 ký tự"),

    password: yup
      .string()
      .required("Mật khẩu không được trống")
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .min(6, "Mật khẩu tối thiểu 6 ký tự")
      .test("csrf-safe", "Mật khẩu không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
    repassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Mật khẩu không được trống")
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .min(6, "Mật khẩu tối thiểu 6 ký tự")
      .test("csrf-safe", "Mật khẩu không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
  });

  const { http } = AuthUser();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setErrorMessage("");
    try {
      const response = await http.post("/customers/register", values);
      console.log("customer response:", response);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        // console.log('error login page:', errorMessage);
        setErrorMessage(errorMessage);
      }
      console.error("Register Error:", error);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Col md={8} lg={6} xs={12}>
        <Card className="shadow">
          <Card.Body>
            <div className="mb-3 mt-4">
              <h2 className="fw-bold mb-3 text-uppercase text-center">
                Đăng Ký
              </h2>
              <hr className="my-4" />
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  // console.log(values);
                  handleRegister(values);
                }}
                initialValues={{
                  name: "",
                  email: "",
                  tel_num: "",
                  password: "",
                  repassword: "",
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="6"
                        className="mb-3"
                        controlId="validationFormik01"
                      >
                        <Form.Label>Họ và Tên:</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Vui lòng nhập họ và tên"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={touched.name && errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        className="mb-3"
                        controlId="validationFormik02"
                      >
                        <Form.Label>Số điện thoại:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập số điện thoại"
                          name="tel_num"
                          value={values.tel_num}
                          onChange={handleChange}
                          isInvalid={touched.tel_num && errors.tel_num}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tel_num}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group controlId="validationFormik04">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Nhập email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && errors.email}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    {/* <Row className="mb-3">
                      <Form.Group controlId="validationFormik04">
                        <Form.Label>Địa chỉ:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập địa chỉ liên hệ"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          isInvalid={touched.address && errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row> */}
                    <Row className="mb-3">
                      <Form.Group controlId="validationFormik05">
                        <Form.Label>Mật khẩu:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nhập mật khẩu"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group controlId="validationFormik05">
                        <Form.Label>Mật khẩu lại:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                          name="repassword"
                          value={values.repassword}
                          onChange={handleChange}
                          isInvalid={touched.repassword && errors.repassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.repassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <div className="mb-3 d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn btn-dark"
                      >
                        Đăng ký
                      </Button>
                    </div>
                    <div class="row justify-content-between">
                      <div class="col-5">
                        <Link
                          to="/"
                          className="text-start text-decoration-none text-dark"
                        >
                          <FaArrowCircleLeft /> Quay lại
                        </Link>
                      </div>
                      <div class="col-7">
                        <p className=" text-end text-decoration-none">
                          Đã có tài khoản?
                          <Link
                            to="/login"
                            className="text-end text-decoration-none mx-1"
                          >
                            Đăng nhập
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default RegisterForm;
