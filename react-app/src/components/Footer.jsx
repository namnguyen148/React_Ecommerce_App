import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialFacebook,
} from "react-icons/sl";
import image01 from "../assets/banner/footer01.jpeg";
import image02 from "../assets/banner/footer02.jpeg";
import image03 from "../assets/banner/footer03.jpeg";
import "../assets/css/Footer.css";

export default function Footer() {
  return (
    <footer className="bg-body-secondary">
      <Row className="mx-5">
        <Col className="col-lg-3 col-sm-4 col-12">
          <p className="footer-font">CHĂM SÓC KHÁCH HÀNG</p>
          <ul className="list-unstyled footer-font-ul">
            <li>
              <Link className="text-decoration-none text-black">
                Trung Tâm Trợ Giúp
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                MiniStore Blog
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                MiniStore Mall
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Hướng Dẫn Mua Hàng
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Hướng Dẫn Bán Hàng
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Thanh Toán
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                MiniStore Xu
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Vận Chuyển
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Trả Hàng & Hoàn Tiền
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Chính Sách Bảo Hành
              </Link>
            </li>
          </ul>
        </Col>
        <Col className="col-lg-3 col-sm-4 col-12">
          <p className="footer-font">VỀ MINISTORE</p>
          <ul className="list-unstyled footer-font-ul">
            <li>
              <Link className="text-decoration-none text-black">
                Giới Thiệu Về MiniStore Việt Nam
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Tuyển Dụng
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Điều Khoản MiniStore
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Chính Sách Bảo Mật
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Chính Hãng
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Kênh Người Bán
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Flash Sales
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Chương Trình Tiếp Thị Liên Kết MiniStore
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                Liên Hệ Với Truyền Thông
              </Link>
            </li>
          </ul>
        </Col>
        <Col className="col-lg-2 col-sm-4 col-12">
          <p className="footer-font">THANH TOÁN</p>
          <img
            className="img-fluid rounded"
            src={image01}
            alt="imagefooter"
            style={{ height: "100px" }}
          />
          <p className="footer-font-p">ĐƠN VỊ VẬN CHUYỂN</p>
          <img
            className="img-fluid rounded"
            src={image02}
            alt="imagefooter"
            style={{ height: "125px" }}
          />
        </Col>
        <Col className="col-lg-2 col-sm-4 col-12">
          <p className="footer-font">THEO DÕI CHÚNG TÔI TRÊN</p>
          <ul className="list-unstyled footer-font-ul">
            <li>
              <Link className="text-decoration-none text-black">
                <SlSocialFacebook className="footer-icon" /> Facebook
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                <SlSocialInstagram className="footer-icon" /> Instagram
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none text-black">
                <SlSocialLinkedin className="footer-icon" /> LinkedIn
              </Link>
            </li>
          </ul>
        </Col>
        <Col className="col-lg-2 col-sm-4 col-12">
          <p className="footer-font">TẢI ỨNG DỤNG MINISTORE NGAY THÔI</p>
          <img
            className="img-fluid rounded"
            src={image03}
            alt="imagefooter"
            style={{ height: "100px" }}
          />
        </Col>
      </Row>
      <hr />
      <Row className="mx-5">
        <Col className="col-lg-4 col-sm-4 col-12 footer-font-nation ">
          <p>© 2023 MiniStore. Tất cả các quyền được bảo lưu.</p>
        </Col>
        <Col className="col-lg-8 col-sm-8 col-12 text-end footer-font-nation">
          <p>
            Quốc gia & Khu vực: Singapore Indonesia Thái Lan Malaysia Việt Nam
            Philippines Brazil México Colombia Chile Đài Loan
          </p>
        </Col>
      </Row>
    </footer>
  );
}
