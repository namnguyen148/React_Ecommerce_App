import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as formik from "formik";
import * as yup from "yup";

function UserModal({
  showAddModal,
  handleCloseAddModal,
  fetchAddModal,
  loading,
  userAddMessage,
}) {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Tên người dùng không được trống")
      .test("csrf-safe", "Tên không đúng định dạng", (value) => {
        return !/[&<>{}$#%^*!/"'=/]/.test(value);
      }),
    email: yup
      .string()
      .required("Email không được trống")
      .max(255, "Email tối đa 255 ký tự")
      .email("Email không đúng định dạng")
      .matches(/^[A-Za-z0-9@.]+$/, "Email không đúng định dạng"),
    group_role: yup.string().required("Nhóm không được trống"),
    password: yup
      .string()
      .required("Mật khẩu không được trống")
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .test("csrf-safe", "Mật khẩu không đúng định dạng", (value) => {
        return !/[&<>!$#%*|"'=/]/.test(value);
      }),
  });
  
  return (
    <>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              fetchAddModal(values);
            }}
            initialValues={{
              name: "",
              group_role: "",
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="7" controlId="validationFormik01">
                    <Form.Label>Tên người dùng:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Nhập tên người dùng"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="5" controlId="validationFormik02">
                    <Form.Label>Nhóm:</Form.Label>
                    <Form.Select
                      name="group_role"
                      value={values.group_role}
                      onChange={handleChange}
                      isInvalid={touched.group_role && !!errors.group_role}
                    >
                      <option value="">Chọn nhóm</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="reviewer">Reviewer</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.group_role}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="validationFormik03">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="validationFormik04">
                    <Form.Label>Mật khẩu:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mật khẩu"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {userAddMessage && (
                  <div className="alert alert-danger text-center">
                    {userAddMessage}
                  </div>
                )}
                <Row className="mb-3">
                  <Col className="d-flex justify-content-end grid gap-2">
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                      Hủy
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? "Đang xử lý..." : "Lưu"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserModal;
