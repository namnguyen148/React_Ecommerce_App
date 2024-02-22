import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }} >
      <Container className="text-center">
        <Row>
          <Col>
            <h1>404 - Không tìm thấy trang</h1>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <Button variant="primary" onClick={goBack}>Trở lại trang trước</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
