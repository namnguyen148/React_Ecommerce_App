import React from "react";
import image01 from "../assets/banner/banner01.jpeg";
import image02 from "../assets/banner/banner16.jpeg";
import image03 from "../assets/banner/banner03.jpeg";
import image04 from "../assets/banner/banner04.jpeg";
import image05 from "../assets/banner/banner05.jpeg";
import image06 from "../assets/banner/banner17.jpeg";
import image07 from "../assets/banner/banner14.jpeg";
import image08 from "../assets/banner/banner18.jpeg";
import image09 from "../assets/banner/banner13.jpeg";
import service01 from "../assets/images/service-01.png";
import service02 from "../assets/images/service-02.png";
import service03 from "../assets/images/service-03.png";
import service04 from "../assets/images/service-04.png";
import service05 from "../assets/images/service-05.png";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/HomePage.css";
import { Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Row className="rowBanner mb-2">
        <Col className="col-lg-8 col-sm-8 col-12 ">
          <Carousel className="CarouselContainer">
            <Carousel.Item>
              <Link to={`/products`}>
                <img className="d-block w-100" src={image01} alt="slide 1" />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products`}>
                <img className="d-block w-100" src={image02} alt="slide 2" />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products`}>
                <img className="d-block w-100" src={image03} alt="slide 3" />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products`}>
                <img className="d-block w-100" src={image04} alt="slide 4" />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products`}>
                <img className="d-block w-100" src={image05} alt="slide 5" />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products`}>
                <img className="d-block w-100" src={image06} alt="slide 6" />
              </Link>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="col-lg-4 col-sm-4 col-12 banner-content-right">
          <Link to={`/products`}>
            <img
              className="img-fluid rounded imgBanner"
              src={image07}
              alt="Card"
            />
          </Link>
          <Link to={`/products`}>
            <img className="img-fluid rounded mt-2" src={image08} alt="Card" />
          </Link>
        </Col>
      </Row>
      <Row className="rowBanner banner-content-bottom">
        <img className="img-fluid rounded" src={image09} alt="imagebanner09" />
      </Row>
      <section className="home-wapper-2 mt-3 mx-5">
        <div className="container-xxl">
          <div className="row">
              <div className="services">
                <div className="service d-flex align-items-center flex-column">
                  <Link to={`/products`}>
                    <img className="imgService" src={service01} alt="service" />
                  </Link>
                  <h6>Miễn Phí Ship 100%</h6>
                </div>
                <div className="service d-flex align-items-center flex-column">
                  <Link to={`/products`}>
                    <img  className="imgService" src={service02} alt="service" />
                  </Link>
                    <h6>Hộp quà siêu ưu đãi</h6>
                </div>
                <div className="service d-flex align-items-center  flex-column">
                  <Link to={`/products`}>
                    <img  className="imgService" src={service03} alt="service" />
                  </Link>
                    <h6>Hỗ trợ 24/7</h6>
                </div>
                <div className="service d-flex align-items-center flex-column">
                  <Link to={`/cart`}>
                    <img  className="imgService" src={service04} alt="service" />
                  </Link>
                    <h6>Voucher Giảm Đến 500.000Đ</h6>
                </div>
                <div className="service d-flex align-items-center flex-column">
                <Link to={`/cart`}>
                  <img  className="imgService" src={service05} alt="service" />
                </Link>
                    <h6>Thanh toán an toàn</h6>
                </div>
              </div>
          </div>
        </div>
      </section>
      {/* <section className="home-wapper-2 mt-3 mx-5">
        <div className="container-xxl">
          <div className="row">
              <div className="services">
                <div className="service d-flex align-items-center flex-column">
                  <img src={service01} alt="service" />
                  <h6>Miễn Phí Ship 100%</h6>
                </div>
                <div className="service d-flex align-items-center flex-column">
                  <img src={service02} alt="service" />
                    <h6>Hộp quà siêu ưu đãi</h6>
                </div>
                <div className="service d-flex align-items-center  flex-column">
                  <img src={service03} alt="service" />
                    <h6>Hỗ trợ 24/7</h6>
                </div>
                <div className="service d-flex align-items-center flex-column">
                  <img src={service04} alt="service" />
                    <h6>Voucher Giảm Đến 500.000Đ</h6>
                </div>
                <div className="service d-flex align-items-center flex-column">
                  <img src={service05} alt="service" />
                    <h6>Thanh toán an toàn</h6>
                </div>
              </div>
          </div>
        </div>
      </section> */}
      {/* <section className="home-wapper-3 py-5 mt-3 mx-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div>
                <p>DANH MỤC</p>
              </div>
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div className="d-flex align-items-center gap">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <Row className="rowBanner banner-content-bottom">
        <Col className="col-lg-4 col-sm-4 col-12 ">
          <img
            className="img-fluid rounded"
            src={image07}
            alt="imagebanner09"
          />
        </Col>
        <Col className="col-lg-4 col-sm-4 col-12 ">
          <img
            className="img-fluid rounded"
            src={image06}
            alt="imagebanner09"
          />
        </Col>
        <Col className="col-lg-4 col-sm-4 col-12 ">
          <img
            className="img-fluid rounded"
            src={image05}
            alt="imagebanner09"
          />
        </Col>
      </Row> */}
    </>
  );
};

export default Home;
