import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { BiSearchAlt2, BiX, BiPlus } from "react-icons/bi";
import React, { useState } from "react";
import "../assets/css/FormSearch.css"

export default function FormSearch({ handelSearch, handleAddUser,totalUser }) {
  const { Formik } = formik;
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ per_page: "10" });

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption({ per_page: newValue });
    const values = { per_page: newValue };
    handelSearch(values,'perPage')
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .test("csrf-safe", "Tên không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
    email: yup
      .string()
      .matches(/^[A-Za-z0-9@.]+$/, "Email không đúng định dạng"),
    group_role: yup.string(),
    is_active: yup.string(),
  });
  const loadingBtnClear = () => {
    setLoadingClear(true);
    setTimeout(() => {
      handelSearch(selectedOption,'clear');
      setLoadingClear(false);
    },500);
  };
  const loadingBtnAdd = () => {
    setLoadingAdd(true);
    setTimeout(() => {
      handleAddUser();
      setLoadingAdd(false);
    }, 500);
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        setLoadingSearch(true);
        setTimeout(() => {
          handelSearch(values, "search");
          setLoadingSearch(false);
        },500);
      }}
      initialValues={{
        name: "",
        email: "",
        group_role: "",
        is_active: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, resetForm }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-form">
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormik01">
              <Form.Label>Tên người dùng:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nhập họ tên"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik03">
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
                {errors.group}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>Trạng thái:</Form.Label>
              <Form.Select
                name="is_active"
                value={values.is_active}
                onChange={handleChange}
                isInvalid={touched.is_active && !!errors.is_active}
              >
                <option value="">Chọn trạng thái</option>
                <option value="1">Đang hoạt động</option>
                <option value="0">Tạm khóa</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.is_active}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Button
                variant="primary"
                disabled={loadingAdd}
                onClick={() => loadingBtnAdd()}
              >
                {loadingAdd ? (
                  "Đang xử lý..."
                ) : (
                  <>
                    <BiPlus style={{ fontSize: "24px" }} />
                    Thêm mới
                  </>
                )}
              </Button>
            </Col>
            <Col xs={12} md={6} className="text-end">
              <Button type="submit" className="me-2" disabled={loadingSearch}>
                {loadingSearch ? (
                  "Đang xử lý..."
                ) : (
                  <>
                    <BiSearchAlt2 style={{ fontSize: "24px" }} />
                    Tìm kiếm
                  </>
                )}
              </Button>
              <Button
                disabled={loadingClear}
                onClick={() => {
                  resetForm();
                  loadingBtnClear();
                }}
              >
                {loadingClear ? (
                  "Đang xử lý..."
                ) : (
                  <>
                    <BiX style={{ fontSize: "24px" }} />
                    Xóa tìm
                  </>
                )}
              </Button>
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={12} md={3} lg={2}>
              <Form.Select name="per_page" value={selectedOption.per_page} onChange={handleSelectChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={9} lg={10} className="text-end">
              <p>
                Hiển thị từ 1 đến {selectedOption.per_page > totalUser ? totalUser : selectedOption.per_page} trong tổng số {totalUser} người dùng
              </p>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}
