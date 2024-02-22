import React from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NoImage from "../assets/no-image.jpeg";
import { FaMinus, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { FaArrowCircleLeft } from "react-icons/fa";
import "../assets/css/IconTable.css";
import { removeFromCart, toggleCartQty, clearCart } from '../redux/reducer/CartSlice';
import Col from "react-bootstrap/Col";

const Cart = () => {
  const {
    data: cartProducts,
    deliveryCharge,
  } = useSelector((state) => state.CartSlice);

  // console.log("cart test show cartProducts:", cartProducts);
  // console.log("cart test show totalItems:", totalItems);
  // console.log("cart test show totalAmount:", totalAmount);
  // console.log("cart test show deliveryCharge:", deliveryCharge);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Giỏ hàng trống</h4>
            <Link to="/products" className="btn  btn-outline-dark mx-4">
              <FaArrowCircleLeft /> Quay lại mua hàng
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = deliveryCharge;
    let total = 0;

    cartProducts.map((item) => {
      return (subtotal += item.product_price * item.quantity);
    });

    cartProducts.map((item) => {
      return (total += item.quantity);
    });

    if (subtotal >= 500000) {
      shipping = 0;
    }
    
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">DANH SÁCH SẢN PHẨM</h5>
                  </div>
                  <div className="card-body">
                    {cartProducts.map((item) => {
                      return (
                        <div key={item.product_id}>
                          <div className="row d-flex align-items-center">
                          <div className="col-lg-3 col-md-12">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                              <img
                                class="rounded"
                                src={
                                  !item.product_image
                                    ? `${NoImage}`
                                    : `${process.env.REACT_APP_URL}/storage/products/${item.product_image}`
                                }
                                alt={item.product_image}
                                
                               height={150}
                               width={150}
                              />
                            </div>
                          </div>

                            <div className="col-lg-5 col-md-6">
                              <p className="text-center" >
                                <strong>
                                {item.product_name.length > 50 ? `${item.product_name.substring(0, 50)}...` : item.product_name}
                                </strong>
                              </p>
                              <p className="text-center" >
                                <strong>
                                  <span className="text-muted">{item.quantity}</span>{""}
                                  {" x "}
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.product_price)}
                                </strong>
                              </p>
                            </div>
                            
                            <div className="col-lg-4 col-md-6">
                              <div className="d-flex justify-content-center align-items-center mb-4">
                                <div className="flex px-3" style={{ border: '1px solid #bfbfbf' ,marginRight: '5px' }}>
                                <Col className="d-flex justify-content-end grid gap-2">
                                <button className=" btn"
                                  onClick={() => dispatch(toggleCartQty({product_id: item.product_id, type: "DEC"}))}
                                  >
                                    <FaMinus />
                                  </button>
                                  <span className="flex flex-center mt-2">{item.quantity}</span>
                                  <button className=" btn"
                                  onClick={() => dispatch(toggleCartQty({product_id: item.product_id, type: "INC"}))}
                                  >
                                    <FaPlus />
                                  </button>
                                </Col>
                                </div>
                                <button className="deleteProduct btn px-3"
                                onClick={() => dispatch(removeFromCart(item.product_id))}
                                >
                                  <FaRegTrashCan/>
                                </button>
                              </div>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      );
                    })}
                    <Link
                      className="btn btn-danger btn-block"
                      onClick={() => dispatch(clearCart())}
                    >
                      XÓA HẾT
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">TẠM TÍNH</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Sản phẩm ({total})
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
                      
                      {
                        subtotal > 500000?
                        null:
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                        Ghi chú: Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                        </li>
                      }
                    </ul>
                    <Col className="d-flex justify-content-end grid gap-2">
                      <Link to="/products" className="btn btn-outline-dark mx-2">
                          TIẾP TỤC MUA HÀNG
                      </Link>
                      <Link
                        to="/checkout"
                        className="btn btn-dark btn-block"
                      >
                        THANH TOÁN
                      </Link>
                    </Col>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h4 className="text-center">
          {" "}
          <Link to="/products" className="text-dark text-decoration-none">
            Sản phẩm
          </Link>{" "}
          /
          <Link to="/cart" className="text-dark text-decoration-none">
            {" "}
            Giỏ hàng
          </Link>
        </h4>
        <hr />
        {cartProducts.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Cart;
