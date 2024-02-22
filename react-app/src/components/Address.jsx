import React from "react";
import { FaPlus} from "react-icons/fa6";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { BiTrash } from "react-icons/bi";
import "../assets/css/IconTable.css";

export default function Address({handleAddModal, dataAddress, handleAddress, deleteAddress}) {
  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <Row className="justify-content-center my-4">
            <Col>
              <Card className="mb-4">
                <Card.Header>
                  <Row className="align-items-center">
                    <Col lg={8} md={6}>
                      <h5 className="mb-3">ĐỊA CHỈ CỦA TÔI</h5>
                    </Col>
                    <Col lg={4} md={6} className="d-flex justify-content-end">
                      <Button variant="outline-dark" onClick={()=>{handleAddModal()}}>
                        <FaPlus /> Thêm địa chỉ mới
                      </Button>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Stt</th>
                        <th>Họ & tên</th>
                        <th>Sđt</th>
                        <th>Địa chỉ</th>
                        <th>Phân loại</th>
                        <th>Trạng thái</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataAddress
                      .map((address, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{address.name}</td>
                            <td>{address.tel_num}</td>
                            <td className="addr_det">
                              {address.addr_det} , {address.ward} , {address.district} , {address.province}
                            </td>
                            <td>
                              {address.addr_opt === 1 && "Nhà riêng"}
                              {address.addr_opt === 2 && "Văn phòng"}
                            </td>
                            <td style={{ color: address.def_addr === 1 ? 'red' : '' }}>
                              {address.def_addr === 1 && "Mặc định"}
                            </td>
                            <td>
                            {address.def_addr !== 1 && (
                              <BiTrash
                                className="iconDelete"
                                style={{ fontSize: '24px' }}
                                onClick={() => deleteAddress(address.id)}
                              />
                            )}
                            </td>
                            <td>
                              <Button className="btnAddress btn btn-light"
                                onClick={()=>{handleAddress(address.id)}}
                                disabled={address.def_addr === 1}
                              >
                                Thiết lập mặc định
                              </Button>
                            </td>
                          </tr>
                          )
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}
