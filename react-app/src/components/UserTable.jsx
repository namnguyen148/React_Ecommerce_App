import React from "react";
import { Table } from "react-bootstrap";
import { BiPencil, BiTrash, BiUserX } from "react-icons/bi";
import "../assets/css/IconTable.css";

export default function UserTable({
  users,
  handleEditUser,
  handleDeleteUser,
  handleActiveUser,
  currentPage,
  perPage,
}) {
  const getEmail = JSON.parse(localStorage.getItem('email'));
  return (
    <div>
      <Table responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Nhóm</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.is_delete !== 1)
            .map((user, index) => {
              const userCount = (currentPage - 1) * perPage + index + 1;
              const isCurrentUser = user.email === getEmail;
              return (
                <tr key={userCount}>
                  <td>{userCount}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.group_role}</td>
                  <td style={{ color: user.is_active === 1 ? "green" : "red" }}>
                    {user.is_active === 1 ? "Đang hoạt động" : "Tạm khóa"}
                  </td>
                  <td>
                  {isCurrentUser ? (
                      null
                    ) : (
                      <>
                        <BiPencil
                          style={{ fontSize: "24px" }}
                          className="iconEdit"
                          onClick={() => handleEditUser(user)}
                        />
                        <BiTrash
                          style={{ fontSize: "24px" }}
                          className="iconDelete"
                          onClick={() => handleDeleteUser(user)}
                        />
                        <BiUserX
                          style={{ fontSize: "24px" }}
                          className="iconActive"
                          onClick={() => handleActiveUser(user)}
                        />
                      </>
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
