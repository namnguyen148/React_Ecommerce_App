import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingScreen";
import NoImage from "../assets/no-image.jpeg";
import Row from "react-bootstrap/Row";

const Products = ({ data, loading }) => {
  const [formattedPrices, setFormattedPrices] = useState([]);
  useEffect(() => {
    const formattedPricesArray = data.map((product) =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(product.product_price)
    );
    setFormattedPrices(formattedPricesArray);
  }, [data]);

  const ShowProducts = () => {
    return (
      <>
        {data.map((product, index) => {
          return (
            <div
              id={product.product_id}
              key={product.product_id}
              className="container-product-card"
            >
              <div className="card text-center" key={product.product_id}>
                <Link to={`/product_details/${product.product_id}`}>
                  <img
                    className="card-img-top"
                    src={
                      !product.product_image
                        ? `${NoImage}`
                        : `${process.env.REACT_APP_URL}/storage/products/${product.product_image}`
                    }
                    alt="Card"
                    height={200}
                    width={200}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title product-title">
                    {product.product_name.length > 50
                      ? `${product.product_name.substring(0, 50)}...`
                      : product.product_name}
                  </h5>
                  <p
                    className="card-text mb-0"
                    style={{ color: product.is_sales === 2 ? "red" : "green" }}
                  >
                    {/* {product.is_sales} */}
                    {product.is_sales === 0
                      ? "Ngừng bán"
                      : product.is_sales === 1
                      ? "Đang bán"
                      : "Hết hàng"}
                  </p>
                  {/* <p className="card-text">
                    {product.description ? product.description.substring(0, 30) : ''}...
                  </p> */}
                  <span className="product-price">
                    {formattedPrices[index]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Row className="mt-4">
        <div className="col-12 text-center">
          <span className=" fs-4 fw-semibold">SẢN PHẨM MỚI</span>
          <hr />
        </div>
      </Row>
      <div className="container-product">
        <Row className="container-row">
          {loading ? <Loading /> : <ShowProducts />}
        </Row>
        {!loading && (
          <div className="container-btn-see-more mb-4">
            <Link
              to={"/products"}
              className="btn btn-outline-dark btn-see-more"
            >
              Xem Thêm
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
