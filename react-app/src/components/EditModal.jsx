import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as formik from "formik";
import * as yup from "yup";

function EditUserModal({ 
  handleClose, 
  show, 
  editUser, 
  fetchEditData,
  loadingEdit,
  userEditMessage
 }) {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Tên người dùng không được trống")
      .max(200, "Tên người dùng tối đa 200 ký tự")
      .test("csrf-safe", "Tên người dùng không đúng định dạng", (value) => {
        return !/[&<>"=/]/.test(value);
      }),
    email: yup
      .string()
      .required("Email không được trống")
      .email("Email không đúng định dạng")
      .test(
        "csrf-safe",
        "Email không được chứa các ký tự đặc biệt",
        (value) => {
          return !/[&<>"'=/]/.test(value);
        }
      ),
    password: yup
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .test(
        "csrf-safe",
        "Mật khẩu không được chưa các ký tự đặc biệt",
        (value) => {
          return !/[&<>"'=/]/.test(value);
        }
      ),
    group_role: yup.string().required("Nhóm không được trống"),
    is_active: yup.string().required("Trạng thái không được trống"),
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              fetchEditData(values);
            }}
            initialValues={{
              id: editUser.id,
              name: editUser.name,
              email: editUser.email,
              password: editUser.password,
              group_role: editUser.group_role,
              is_active: editUser.is_active,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Tên người dùng:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Nhập tên người dùng"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
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
                      isInvalid={errors.email}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="validationFormik03">
                    <Form.Label>Mật khẩu:</Form.Label>
                    <Form.Control
                      type="text"
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
                  <Form.Group as={Col} md="6" controlId="validationFormik02">
                    <Form.Label>Nhóm:</Form.Label>
                    <Form.Select
                      name="group_role"
                      value={values.group_role}
                      onChange={handleChange}
                      isInvalid={errors.group_role}
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
                  <Form.Group as={Col} md="6" controlId="validationFormik02">
                    <Form.Label>Trạng thái:</Form.Label>
                    <Form.Select
                      name="is_active"
                      value={values.is_active}
                      onChange={handleChange}
                      isInvalid={errors.is_active}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Đang hoạt động</option>
                      <option value="0">Tạm khóa</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.is_active}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {userEditMessage && (
                  <div className="alert alert-danger text-center">
                    {userEditMessage}
                  </div>
                )}
                <Row className="mb-3">
                  <Col className="d-flex justify-content-end grid gap-2">
                    <Button variant="secondary" onClick={handleClose}>
                      Hủy
                    </Button>
                    <Button type="submit" variant="primary" disabled={loadingEdit}>
                      {loadingEdit ? "Đang xử lý..." : "Lưu"}
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

export default EditUserModal;
