import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { BiTrash } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import "../assets/css/IconTable.css";
import React, { useState } from "react";

const Orders = ({ data, handelCancelOrder, handelSearch, handelOrderDetailModal }) => {
  const [all, setAll] = useState(true);
  const [success, setSuccess] = useState(false);
  const [transport, setTransport] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [cancel, setcancel] = useState(false);
  const [finish, setFinish] = useState(false);

  const handleLinkClick = (status) => {
    // Update state based on the clicked link
    setAll(status === "all");
    setSuccess(status === "success");
    setTransport(status === "transport");
    setDelivered(status === "delivered");
    setcancel(status === "cancel");
    setFinish(status === "finish");
    // Call your search function
    handelSearch({}, status);
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h4 className="text-center">
          {" "}
          <Link to="/" className="text-dark text-decoration-none">
            Trang chủ
          </Link>{" "}
          /
          <Link to="/order" className="text-dark text-decoration-none">
            {" "}
            Đơn hàng
          </Link>{" "}
        </h4>
      </div>
      <hr />
      <div className="container py-3">
        <div className="row my-4">
          <div className="col-md-5 col-lg-3 order-md-start">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light text-center">
                <h6 className="mb-0">THEO DÕI ĐƠN HÀNG</h6>
              </div>
              <div className="card-body">
                  <Link
                    className={`statusOrder list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 ${all ? "bg-secondary-subtle" : ""}`}
                    onClick={() => handleLinkClick("all")}
                  >
                    <strong>Tất cả</strong>
                  </Link>
                  <Link
                    className={`statusOrder list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 ${success ? "bg-secondary-subtle" : ""}`}
                    onClick={() => handleLinkClick("success")}
                  >
                    <strong>Đặt hàng thành công</strong>
                  </Link>
                  <Link
                    className={`statusOrder list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 ${transport ? "bg-secondary-subtle" : ""}`}
                    onClick={() => handleLinkClick("transport")}
                  >
                    <strong>Đang giao hàng</strong>
                  </Link>
                  <Link 
                    className={`statusOrder list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 ${delivered ? "bg-secondary-subtle" : ""}`}
                    onClick={() => handleLinkClick("delivered")}
                  >
                    <strong>Đã giao</strong>
                  </Link>
                  <Link 
                    className={`statusOrder list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 ${cancel ? "bg-secondary-subtle" : ""}`}
                    onClick={() => handleLinkClick("cancel")}
                  >
                    <strong>Đã hủy</strong>
                  </Link>
                  <Link 
                    className={`statusOrder list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 ${finish ? "bg-secondary-subtle" : ""}`}
                    onClick={() => handleLinkClick("finish")}
                  >
                    <strong>Hoàn thành</strong>
                  </Link>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-9">
            <div className="card mb-4">
              <div className="card-header py-3 text-center">
                <h6 className="mb-0">ĐƠN HÀNG</h6>
              </div>
              <div className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Ngày đặt</th>
                      <th>Ngày hủy</th>
                      <th>Tổng tiền hàng</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                    // .filter((order) => order.status === 1)
                    .map((order, index) => {
                      // console.log("order show : =>", index);
                      let statusColor;
                      switch (order.status) {
                        case 0:
                          statusColor = 'red';
                          break;
                        case 1:
                          statusColor = 'green'; 
                          break;
                        case 2:
                          statusColor = 'orange';
                          break;
                        case 3:
                          statusColor = 'brown';
                          break;
                        case 4:
                          statusColor = 'purple';
                          break;
                        default:
                          statusColor = 'black';
                      }
                      return (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.order_date}</td>
                          <td>
                            {order.cancel_date}
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
                          <td style={{ color: statusColor }}>
                            {order.status === 0 && "Đã hủy đơn hàng"}
                            {order.status === 1 && "Đã đặt hàng"}
                            {order.status === 2 && "Xác nhận giao hàng"}
                            {order.status === 3 && "Đã giao"}
                            {order.status === 4 && "Hoàn thành"}
                          </td>
                          <td>
                            <MdOutlineRemoveRedEye
                              className="iconOrder mx-1"
                              style={{ fontSize: "24px" }}
                              onClick={() => handelOrderDetailModal(order)}
                            />
                            {order.status === 1 &&
                            <BiTrash
                              className="deleteProduct mx-1"
                              style={{ fontSize: "24px" }}
                              onClick={() => handelCancelOrder(order)}
                            />
                            }
                          </td>
                        </tr>
                        )
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
