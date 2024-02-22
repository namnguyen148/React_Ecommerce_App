import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import "../assets/css/IconTable.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FiFilter } from "react-icons/fi";
import * as formik from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import AuthUser from "../components/AuthUser";

const Orders = ({ data, handelOrderDetailModal, fetchOrder, emptyMessage }) => {
    const { Formik } = formik;
    const { customer } = AuthUser();
    const schema = yup.object().shape({
    order_id: yup.string(),
    order_date_start: yup.string(),
    order_date_end: yup.string(),
    total_price_start: yup.string(),
    total_price_end: yup.string(),
  });
  return (
    <>
      <div className="container my-3 py-3">
        <h4 className="text-center">
          {" "}
          <Link to="/" className="text-dark text-decoration-none">
            Trang Chủ
          </Link>{" "}
          /
          <Link className="text-dark text-decoration-none">
            {" "}
            Lịch Sử Đơn Hàng
          </Link>{" "}
        </h4>
      </div>
      <hr />
      <div className="container py-4">
        <div className="col-md-12 col-lg-12">
          <div className="card mb-4">
            <div className="card-header py-3 text-start">
              <h5 className="mb-0">LỊCH SỬ ĐƠN HÀNG</h5>
              <h6 className="mb-0 my-3">Hiển thị thông tin các sản phẩm bạn đã mua tại MiniStore</h6>
            </div>
            <div className="card-body">
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  const formattedValues = {
                    ...values,
                    order_date_start: values.order_date_start ? format(values.order_date_start, "yyyy-MM-dd") : null,
                    order_date_end: values.order_date_end ? format(values.order_date_end, "yyyy-MM-dd") : null,
                    customer_id: customer.customer_id,
                  };
                  fetchOrder(formattedValues);
                  // console.log('merge values ',formattedValues);
                }}
                initialValues={{
                  order_id: '',
                  order_date_start: '',
                  order_date_end: '',
                  total_price_start: '',
                  total_price_end: '',
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors, resetForm, setFieldValue }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="2" controlId="validationFormik01" className="mb-2">
                        <Form.Label className="form-label-bold" >Mã đơn:</Form.Label>
                        <Form.Control
                          type="text"
                          name="order_id"
                          placeholder="Mã đơn"
                          value={values.order_id}
                          onChange={handleChange}
                          isInvalid={touched.order_id && !!errors.order_id}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.order_id}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="2" controlId="validationFormik02" className="mb-2">
                        <Form.Label className="form-label-bold">Ngày đặt:</Form.Label>
                        <DatePicker
                          selected={values.order_date_start}
                          onChange={(date) => handleChange({ target: { name: "order_date_start", value: date } })}
                          selectsStart
                          startDate={values.order_date_start}
                          endDate={values.order_date_end}
                          placeholderText="Từ ngày"
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          isInvalid={touched.order_date_start && !!errors.order_date_start}
                          withPortal
                          customInput={<Form.Control/>}
                          popperPlacement="top-end"
                          popperModifiers={{
                            offset: {
                              enabled: true,
                              offset: "5px, 10px"
                            },
                            preventOverflow: {
                              enabled: true,
                              escapeWithReference: false,
                              boundariesElement: "viewport"
                            }
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.order_date_start}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="2" controlId="validationFormik03" className="mb-2 endDate">
                        <DatePicker
                          selected={values.order_date_end}
                          onChange={(date) => handleChange({ target: { name: "order_date_end", value: date } })}
                          selectsEnd
                          startDate={values.order_date_start}
                          endDate={values.order_date_end}
                          minDate={values.order_date_start}
                          placeholderText="Đến ngày"
                          dateFormat="dd/MM/yyyy"
                          isInvalid={touched.order_date_end && !!errors.order_date_end}
                          withPortal
                          customInput={
                            <Form.Control
                              type="text"
                              placeholder="Đến ngày"
                              value={values.order_date_end}
                              onChange={() => {}}
                              isInvalid={touched.order_date_end && !!errors.order_date_end}
                            />
                          }
                          popperPlacement="top-end"
                          popperModifiers={{
                            offset: {
                              enabled: true,
                              offset: "5px, 10px"
                            },
                            preventOverflow: {
                              enabled: true,
                              escapeWithReference: false,
                              boundariesElement: "viewport"
                            }
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.order_date_end}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="2" controlId="validationFormik04" className="mb-2">
                        <Form.Label className="form-label-bold" >Tổng tiền:</Form.Label>
                        <Form.Control
                          type="text"
                          name="total_price_start"
                          placeholder="Số tiền từ"
                          value={values.total_price_start}
                          onChange={handleChange}
                          isInvalid={touched.total_price_start && !!errors.total_price_start}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.total_price_start}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="2" controlId="validationFormik05" className="priceEnd">
                        <Form.Control
                          type="text"
                          name="total_price_end"
                          placeholder="Số tiền đến"
                          value={values.total_price_end}
                          onChange={handleChange}
                          isInvalid={touched.total_price_end && !!errors.total_price_end}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.total_price_end}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="btnFilter btn btn-dark btn-end">
                        <FiFilter className="filterIcon" />
                      </Button>
                      <Button className="btnClear btn btn-dark btn-end" onClick={() => {
                        resetForm();
                        fetchOrder({customer_id: customer.customer_id});
                        }}>
                        Xóa
                      </Button>
                    </Row>
                  </Form>
                )}
              </Formik>
              <hr />
              <Table responsive>
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Ngày đặt</th>
                    <th>Ngày hủy</th>
                    <th>Tổng tiền hàng</th>
                    <th>Thanh toán</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data
                  // .filter((order) => order.status === 1)
                  .map((order, index) => {
                    const formattedOrderDate = new Date(order.order_date).toLocaleDateString("en-GB");
                    const formattedCancelDate = order.cancel_date
                    ? new Date(order.cancel_date).toLocaleDateString("en-GB")
                    : "";
                    return (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{formattedOrderDate}</td>
                        <td>
                          {formattedCancelDate}
                        </td>
                        <td>
                          {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(order.total_price)}
                        </td>
                        <td>
                          {order.payment_method === 1 ? 'Khi nhận hàng' : 'Hình thức khác'}
                        </td>
                        <td style={{ color: order.status === 0 ? 'red' : 'green' }} > 
                          {order.status === 0 && "Đã hủy đơn hàng"}
                          {order.status === 1 && "Đã đặt hàng"}
                          {order.status === 2 && "Xác nhận giao hàng"}
                          {order.status === 3 && "Đã giao"}
                          {order.status === 4 && "Hoàn Thành"}
                        </td>
                        <td>
                          <MdOutlineRemoveRedEye
                            className="iconOrder mx-1"
                            style={{ fontSize: "24px" }}
                            onClick={() => handelOrderDetailModal(order)}
                          />
                        </td>
                      </tr>
                      )
                  })}
                </tbody>
              </Table>
            </div>
            {emptyMessage && (
              <div className="alert alert-danger text-center mx-5 my-5">{emptyMessage}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
