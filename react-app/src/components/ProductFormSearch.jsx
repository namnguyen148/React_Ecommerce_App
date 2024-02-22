import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { BiSearchAlt2, BiX, BiPlus, BiDollarCircle } from "react-icons/bi";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";
import "../assets/css/FormSearch.css"

function FormSearch({
  user_detail,
  handelSearch,
  handelAddModal,
  totalProduct,
}) {
  const { Formik } = formik;
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ per_page: "10" });

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption({ per_page: newValue });
    const values = { per_page: newValue };
    handelSearch(values, "perPage");
  };

  const schema = yup.object().shape({
    product_name: yup
      .string()
      .test("csrf-safe", "Tên sản phẩm không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
    is_sales: yup
      .string()
      .test("csrf-safe", "Trạng thái không đúng định dạng", (value) => {
        return !/[&<>"'=/]/.test(value);
      }),
    start_price: yup.string(),
    last_price: yup.string(),
  });

  const loadingBtnClear = (values) => {
    setLoadingClear(true);
    setTimeout(() => {
      handelSearch(selectedOption,'clear');
      setLoadingClear(false);
    }, 500);
  };
  const loadingBtnAdd = () => {
    setLoadingAdd(true);
    setTimeout(() => {
      handelAddModal();
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
        product_name: "",
        is_sales: "",
        start_price: "",
        last_price: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, resetForm }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-form">
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormik01">
              <Form.Label>Tên sản phẩm:</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                placeholder="Nhập tên sản phẩm"
                value={values.product_name}
                onChange={handleChange}
                isInvalid={touched.product_name && !!errors.product_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.product_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label>Trạng thái:</Form.Label>
              <Form.Select
                name="is_sales"
                value={values.is_sales}
                onChange={handleChange}
                isInvalid={touched.is_sales && !!errors.is_sales}
              >
                <option value="">Chọn trạng thái</option>
                <option value="0">Ngừng bán</option>
                <option value="1">Đang bán</option>
                <option value="2">Hết hàng</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.is_sales}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik03">
              <Form.Label>Giá bán từ:</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <BiDollarCircle style={{ fontSize: "24px" }} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="start_price"
                  placeholder=".00"
                  value={values.start_price}
                  onChange={handleChange}
                  isInvalid={touched.start_price && errors.start_price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_price}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>Giá bán đến:</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <BiDollarCircle style={{ fontSize: "24px" }} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="last_price"
                  placeholder=".00"
                  value={values.last_price}
                  onChange={handleChange}
                  isInvalid={touched.last_price && !!errors.last_price}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              {user_detail !== "reviewer" && (
                <Button
                  variant="primary"
                  disabled={loadingAdd}
                  onClick={loadingBtnAdd}
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
              )}
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
                onClick={(values) => {
                  resetForm();
                  loadingBtnClear(values);
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
              <Form.Select
                name="per_page"
                value={selectedOption.per_page}
                onChange={handleSelectChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={9} lg={10} className="text-end">
              <p>
                Hiển thị từ 1 đến {selectedOption.per_page > totalProduct ? totalProduct : selectedOption.per_page} trong tổng số{" "}
                {totalProduct} sản phẩm
              </p>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default FormSearch;
