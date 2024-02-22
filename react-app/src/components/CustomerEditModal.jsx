import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as formik from "formik";
import * as yup from "yup";
import React from "react";
import axios from "../config/axiosCustom";

export default function CustomerEditModal({
  data,
  showEditModal,
  handleCloseEditModal,
}) {
  const { Formik } = formik;
  const schema = yup.object().shape({
    status: yup.string().required("Trạng thái không được để trống"),
  });

  const handleCloseModel = () => {
    handleCloseEditModal();
  };

  const handleSubmit = async (values) => {
    
    try {
      console.log('update edit status', values);
      const customer = {
        customer_id: data.customer_id, 
        total_price: data.total_price, 
        order_date: data.order_date};
        const merge = {...customer, ...values}
      await axios.put(`orders/edit`, merge);
      handleCloseModel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseModel} size="sm">
      <Modal.Header closeButton className="text-center">
        <Modal.Title>Trang thái đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={{
            // product_name: data.name,
            // product_price: data.product_price,
            // description:
            //   data.description === null ? "" : data.description,
            // is_sales: data.is_sales,
            // product_image: data.product_image,
            status: data.status,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="validationFormik04">
                    <p>Họ & tên: {data.name}</p>
                    <p>Email: {data.email}</p>
                    {/* <p>Địa chỉ: {data.address}</p> */}
                    <p>Ngày đặt: {data.order_date}</p>
                    {data.cancel_date ? 
                      <p>Ngày hủy: {data.cancel_date}</p>
                    : null}
                    <Form.Label>Trạng thái:</Form.Label>
                    <Form.Select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      isInvalid={touched.status && !!errors.status}
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="0">Đã hủy đơn hàng</option>
                      <option value="1">Đã đặt hàng</option>
                      <option value="2">Xác nhận giao hàng</option>
                      <option value="3">Đã giao</option>
                      <option value="4">Hoàn thành</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
              </Row>
              <Row className="mb-3">
                <Col className="d-flex justify-content-end grid gap-2">
                  <Button variant="secondary" onClick={handleCloseModel}>
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Xác nhận
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
