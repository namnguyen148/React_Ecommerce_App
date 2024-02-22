import Modal from "react-bootstrap/Modal";
import React from "react";
import NoImage from "../assets/no-image.jpeg";

export default function ProductEditModal({
  showModal,
  handleCloseModal,
  dataOrderDetail,
  dataOrder,
}) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>THÔNG TIN CHI TIẾT ĐƠN HÀNG</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">DANH SÁCH SẢN PHẨM</h5>
                  </div>
                  <div className="card-body">
                    {dataOrderDetail.map((item) => {
                      return (
                        <div key={item.product_id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-6 col-md-6">
                              <div className="d-flex justify-content-center align-items-center mb-4">
                                <img
                                  class="rounded"
                                  src={
                                    !item.product_image
                                      ? `${NoImage}`
                                      : `${process.env.REACT_APP_URL}/storage/products/${item.product_image}`
                                  }
                                  alt={item.product_image}
                                  height={100}
                                  width={100}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <p className="text-center">
                                <strong>
                                  {item.product_name.length > 50
                                    ? `${item.product_name.substring(0, 50)}...`
                                    : item.product_name}
                                </strong>
                              </p>
                              <p className="text-center">
                                <strong>
                                  <span className="text-muted">
                                    {item.quantity}
                                  </span>
                                  {""}
                                  {" x "}
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.product_price)}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">ĐƠN HÀNG</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        {/* <span>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Math.round(subtotal))}
                      </span> */}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Phí vận chuyển:
                        <span>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(dataOrder.shipping_fee)}
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
                            }).format(Math.round(dataOrder.total_price))}
                          </strong>
                        </span>
                      </li>

                      {dataOrder.note_customer ? (
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                          Ghi chú: {dataOrder.note_customer}
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
