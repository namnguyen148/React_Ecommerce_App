import { Col, Button, Container, Card, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import AuthUser from "../components/AuthUser";
import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginForm() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email không được trống")
      .email("Email không đúng định dạng")
      .test("csrf-safe", "Email không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
    password: yup
      .string()
      .required("Mật khẩu không được trống")
      .max(50, "Mật khẩu không đúng định dạng")
      .test("csrf-safe", "Mật khẩu không chính xác", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
  });

  const { http, saveCustomerToken } = AuthUser();
  const [remember_token, setRemember_token] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    setErrorMessage("");
    try {
      values.remember_token = remember_token;
      const response = await http.post("/customers/login", values);
      saveCustomerToken(response.data.access_token, response.data.customer);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      }
      console.error("Login Error:", error);
      setLoading(false);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Col md={8} lg={6} xs={12}>
        <Card className="shadow">
          <Card.Body>
            <div className="mb-3 mt-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Đăng Nhập
              </h2>
              <hr className="my-4" />
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              <Formik
                validationSchema={schema}
                onSubmit={handleLogin}
                initialValues={{
                  email: "",
                  password: "",
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form className="mb-3" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        name="email"
                        type="text"
                        placeholder="Nhập email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Mật khẩu:</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="mb-3 form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={() => setRemember_token(!remember_token)}
                      />
                      <label className="form-check-label">Remember me</label>
                    </div>
                    <div className="mb-3 d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="btn btn-dark"
                      >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
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
                          Không phải là thành viên?
                          <Link
                            to="/register"
                            className="text-end text-decoration-none mx-1"
                          >
                            Đăng ký
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

export default LoginForm;
