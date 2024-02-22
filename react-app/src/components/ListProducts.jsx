import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingScreen";
import { useMediaQuery } from "react-responsive";
import NoImage from "../assets/no-image.jpeg";

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

  const isMediumScreen = useMediaQuery({ minWidth: 995, maxWidth: 1200 });
  const isSmallScreen = useMediaQuery({ minWidth: 768, maxWidth: 995 });
  const getColumnClass = () => {
    if (isMediumScreen) {
      return "col-md-4 col-sm-6 col-xs-8 col-12 mb-4";
    }
    if (isSmallScreen) {
      return "col-md-5 col-sm-6 col-xs-8 col-12 mb-4";
    } else {
      return "col-md-3 col-sm-6 col-xs-8 col-12 mb-4";
    }
  };

  const ShowProducts = () => {
    return (
      <>
        {data.map((product, index) => {
          return (
            <div
              id={product.product_id}
              key={product.product_id}
              className={getColumnClass()}
            >
              <div className="card text-center h-100" key={product.product_id}>
                <Link to={`/product_details/${product.product_id}`}>
                  <img
                    className="card-img-top p-3"
                    src={
                      !product.product_image
                        ? `${NoImage}`
                        : `${process.env.REACT_APP_URL}/storage/products/${product.product_image}`
                    }
                    alt="Card"
                    height={300}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    {/* {product.product_name} */}
                    {product.product_name.length > 50
                      ? `${product.product_name.substring(0, 50)}...`
                      : product.product_name}
                  </h5>
                  <p
                    className="card-text"
                    style={{ color: product.is_sales === 2 ? "red" : "green" }}
                  >
                    {/* {product.is_sales} */}
                    {product.is_sales === 0
                      ? "Ngừng bán"
                      : product.is_sales === 1
                      ? "Đang bán"
                      : "Hết hàng"}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">
                    {formattedPrices[index]}
                  </li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                {/* <div className="card-body">
                  <button 
                    className="btn btn-outline-dark btn-sm m-1" 
                    onClick={() => addToCartHandler(product)}
                    disabled={product.is_sales === 2}
                  >
                    {product.is_sales === 2 ? 'Tạm Nghỉ bán' : 'Thêm Vào Giỏ Hàng'}
                  </button>
                  <Link to={"/product_details/" + product.product_id} className="btn btn-dark btn-sm m-1">
                    Mua Ngay
                  </Link>
                </div> */}
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h4 className=" text-center">DANH SÁCH SẢN PHẨM</h4>
            <hr />
          </div>
        </div>
        <div className="row justify-content-start">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
