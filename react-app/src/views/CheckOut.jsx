import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaArrowCircleLeft } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import * as formik from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import AuthUser from "../components/AuthUser";
import Row from "react-bootstrap/Row";
import axios from "../config/axiosCustom";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/reducer/CartSlice";
import { useDispatch } from "react-redux";
import AddAddressModal from "../components/AddAddressModal";
import queryString from "query-string";

const Checkout = () => {
  const { data: cartProducts, deliveryCharge } = useSelector(
    (state) => state.CartSlice
  );
  const { customer } = AuthUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const [checkButton, setCheckButton] = useState(true);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Không có sản phẩm trong giỏ hàng!</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <FaArrowCircleLeft /> Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const fetchCheckAddress = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/address/check",
          query: { customer_id: customer.customer_id },
        })
      );
      console.log("phan hoi check address", response.data.data);
      if (response.data.data === true) {
        setShowAddModal(false);
      } else {
        setShowAddModal(true);
      }
    } catch (error) {
      console.error("get list provinces error:", error);
    }
  };

  const fetchAddress = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/address/list",
          query: { customer_id: customer.customer_id },
        })
      );
      const addressData = response.data.data.data[0];
      if (addressData) {
        // console.log('data của address checkout', addressData);
        setDataAddress(addressData);
        setCheckButton(false);
      } else {
        const errorAddr = {
          name: "Chưa tạo địa chỉ",
          tel_num: "Chưa tạo địa chỉ",
          address: "Chưa tạo địa chỉ",
        };
        setDataAddress(errorAddr);
      }
    } catch (error) {
      console.error("get list provinces error:", error);
    }
  };

  const handleCloseAddModal = () => {
    fetchAddress();
    setShowAddModal(false);
  };

  useEffect(() => {
    fetchCheckAddress();
    fetchAddress();
  }, []);

  const handleCheckOut = async (values) => {
    try {
      // await axios.put("/customers/edit", values);
      const response = await axios.post("/orders/add", values);
      const order_id = response.data.data.id;
      const updatedCartProducts = cartProducts.map((item) => ({
        ...item,
        customer_id: customer.customer_id,
        order_id: order_id,
      }));

      updatedCartProducts.forEach(async (item) => {
        await axios.post("/order_details/add", item);
      });

      dispatch(clearCart());
      localStorage.removeItem("cart");

      navigate("/order");
    } catch (error) {
      console.error("order response Error:", error);
    }
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = deliveryCharge;
    let totalItems = 0;
    let product_id = null;

    cartProducts.forEach((item) => {
      subtotal += item.product_price * item.quantity;
      totalItems += item.quantity;
      product_id = item.product_id;
    });

    if (subtotal >= 500000) {
      shipping = 0;
    }

    const { Formik } = formik;
    const schema = yup.object().shape({
      // name: yup
      //   .string()
      //   .required("Họ và tên không được trống")
      //   .min(5, "Họ và tên tối thiểu 5 ký tự")
      //   .max(255, "Họ và tên không được quá 255 ký tự")
      //   .matches(/^[^\d]+$/, "Họ và tên không được chứa số"),

      // tel_num: yup
      //   .string()
      //   .required("Số điện thoại không được trống")
      //   .min(10, "Số điện thoại tối thiểu 10 ký tự")
      //   .max(20, "Số điện thoại không được quá 20 ký tự")
      //   .matches(/^\d+$/, "Số điện thoại không được chứa chữ"),

      // email: yup
      //   .string()
      //   .required("Email không được trống")
      //   .email("Email không đúng định dạng")
      //   .min(10, "Email tối thiểu 10 ký tự")
      //   .max(100, "Email không được quá 100 ký tự")
      //   .test("csrf-safe", "Email không đúng định dạng", (value) => {
      //     return !/[&<>"'=/]/.test(value);
      //   }),

      // address: yup
      //   .string()
      //   .required("Địa chỉ không được trống")
      //   .max(255, "Địa chỉ không được quá 255 ký tự"),

      note_customer: yup.string().max(255, "Mô tả không được quá 255 ký tự"),
    });

    return (
      <>
        <div className="container py-5">
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              console.log(values);
              handleCheckOut(values);
            }}
            initialValues={{
              customer_id: customer.customer_id,
              email: customer.email,
              name: dataAddress.name,
              tel_num: dataAddress.tel_num,
              address: dataAddress.address
                ? dataAddress.address
                : `${dataAddress.addr_det ? dataAddress.addr_det + ", " : ""}${
                    dataAddress.ward ? dataAddress.ward + ", " : ""
                  }${dataAddress.district ? dataAddress.district + ", " : ""}${
                    dataAddress.province ? dataAddress.province : ""
                  }`,
              status: 1,
              payment_method: 1,
              total_price: subtotal + shipping,
              price_buy: subtotal + shipping,
              quantity: totalItems,
              product_id: product_id,
              shipping_fee: shipping,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <div className="row my-4">
                <div className="col-md-5 col-lg-4 order-md-last">
                  <div className="card mb-4">
                    <div className="card-header py-3 bg-light">
                      <h5 className="mb-0">TẠM TÍNH</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Sản phẩm ({totalItems})
                          <span>
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(Math.round(subtotal))}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Phí vận chuyển
                          <span>
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(shipping)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Tổng tiền:</strong>
                          </div>
                          <span>
                            <strong>
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(Math.round(subtotal + shipping))}
                            </strong>
                          </span>
                        </li>
                        {subtotal > 500000 ? null : (
                          <li className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                            Ghi chú: Miễn phí vận chuyển cho đơn hàng trên
                            500.000đ
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-8">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">THÔNG TIN GIAO HÀNG</h5>
                    </div>
                    <div className="card-body">
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationFormik01"
                          >
                            <Form.Label>Họ và Tên:</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Vui lòng nhập họ và tên"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={errors.name}
                              readOnly={true}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
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
                              readOnly={true}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.tel_num}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group controlId="validationFormik04">
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập địa chỉ liên hệ"
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              isInvalid={touched.address && errors.address}
                              readOnly={true}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.address}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <hr className="my-4" />

                        <h5 className="mb-3">PHƯƠNG THỨC THANH TOÁN</h5>

                        <div className="row gy-3">
                          <p>- Thanh toán sau khi nhận hàng (COD)</p>
                        </div>
                        <Row className="mb-3">
                          <Form.Group
                            className="mb-3"
                            controlId="validationFormik05"
                          >
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="note_customer"
                              placeholder="Mô tả sản phẩm"
                              value={values.note_customer}
                              onChange={handleChange}
                              isInvalid={errors.note_customer}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.note_customer}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        {/* {userEditMessage && (
                      <div className="alert alert-danger text-center">
                        {userEditMessage}
                      </div>
                    )} */}
                        <Row className="mb-3">
                          <Col className="d-flex justify-content-end grid gap-2">
                            <Button variant="secondary" href="/cart">
                              Quay lại
                            </Button>
                            <Button
                              type="submit"
                              variant="primary"
                              disabled={checkButton}
                            >
                              Xác nhận
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h2 className="text-center">
          {" "}
          <Link to="/products" className="text-dark text-decoration-none">
            Sản phẩm
          </Link>{" "}
          /
          <Link to="/cart" className="text-dark text-decoration-none">
            {" "}
            Giỏ hàng
          </Link>{" "}
          /
          <Link to="/checkout" className="text-dark text-decoration-none">
            {" "}
            CheckOut
          </Link>{" "}
        </h2>
        <hr />
        {cartProducts.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <AddAddressModal
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
      />
    </>
  );
};

export default Checkout;
