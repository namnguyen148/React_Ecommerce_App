import React from "react";
import { Table } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import "../assets/css/IconTable.css";

export default function CustomerTable({
  data,
  handelEditModal,
  currentPage,
  perPage,
  handelOrderDetailModal,
}) {
  return (
    <div>
      <Table responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Người dùng</th>
            <th>Số điện thoại</th>
            <th>Ngày đặt</th>
            <th>Ngày hủy</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => {
            const customerCount = (currentPage - 1) * perPage + index + 1;
            let statusColor;
            switch (customer.status) {
              case 0:
                statusColor = "red";
                break;
              case 1:
                statusColor = "green";
                break;
              case 2:
                statusColor = "orange";
                break;
              case 3:
                statusColor = "brown";
                break;
              case 4:
                statusColor = "purple";
                break;
              default:
                statusColor = "black";
            }
            return (
              <tr key={customerCount}>
                <td>{customerCount}</td>
                <td>{customer.name}</td>
                <td>{customer.tel_num}</td>
                <td>{customer.order_date}</td>
                <td>{customer.cancel_date}</td>
                <td>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(customer.total_price)}
                </td>
                <td style={{ color: statusColor }}>
                  {customer.status === 0 && "Đã hủy đơn hàng"}
                  {customer.status === 1 && "Đã đặt hàng"}
                  {customer.status === 2 && "Xác nhận giao hàng"}
                  {customer.status === 3 && "Đã giao"}
                  {customer.status === 4 && "Hoàn thành"}
                </td>
                <td>
                  <MdOutlineRemoveRedEye
                    className="iconOrder mx-1"
                    style={{ fontSize: "24px" }}
                    onClick={() => handelOrderDetailModal(customer)}
                  />
                  {customer.status === 0 || customer.status === 4 ? (
                    ""
                  ) : (
                    <BiPencil
                      className="iconEdit mx-1"
                      style={{ fontSize: "24px" }}
                      onClick={() => handelEditModal(customer)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
