import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../config/axiosCustom";
import NoImage from "../assets/no-image.jpeg";
import { addToCart } from "../redux/reducer/CartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty + 1;
      return newQty;
    });
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if (newQty < 1) {
        newQty = 1;
      }
      return newQty;
    });
  };

  const addToCartHandler = (product) => {
    let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };
    // console.log('tempProduct có giá trị là:',tempProduct);
    dispatch(addToCart(tempProduct));
    navigate("/cart");
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await axios.get(`/products/product_details/${id}`);
      // console.log("response product :", response.data.data);
      // console.log("data product :", data);
      const data = response.data.data;
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              {/* <Skeleton height={30} width={250} /> */}
              <Skeleton height={90} />
              {/* <Skeleton height={40} width={70} /> */}
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3 d-flex justify-content-center align-items-center">
              <img
                className="img-thumbnail"
                src={
                  !product.product_image
                    ? `${NoImage}`
                    : `${process.env.REACT_APP_URL}/storage/products/${product.product_image}`
                }
                alt={product.product_name}
                style={{ height: "400px" }}
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="display-9">{product.product_name}</h4>
              <h4 className="display-9  my-4">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.product_price)}
              </h4>
              <p
                className="lead"
                style={{ color: product.is_sales === 2 ? "red" : "green" }}
              >
                {/* {product.is_sales} */}
                {product.is_sales === 0
                  ? "Ngừng bán"
                  : product.is_sales === 1
                  ? "Đang bán"
                  : "Hết hàng"}
              </p>
              <p className="lead">{product.description}</p>
              <div className="d-flex mb-4">
                <span className="mt-2">Số lượng: </span>
                <div
                  className="flex px-3"
                  style={{ border: "1px solid #bfbfbf", marginLeft: "9px" }}
                >
                  <button className="btn px-3" onClick={() => decreaseQty()}>
                    -
                  </button>
                  <span className="flex flex-center mx-3">{qty}</span>
                  <button className="btn px-3" onClick={() => increaseQty()}>
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn btn-outline-dark"
                onClick={() => addToCartHandler(product)}
                disabled={product.is_sales === 2}
              >
                {product.is_sales === 2 ? "Tạm Nghỉ bán" : "Thêm Vào Giỏ Hàng"}
              </button>
              {product.is_sales === 2 ? (
                <Link to="/products" className="btn btn-dark mx-3">
                  Tiếp tục mua hàng
                </Link>
              ) : (
                // <Link to="/cart" className="btn btn-dark mx-3">
                //   Mua Ngay
                // </Link>
                null
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <br />
        <h2 className="text-center">
          {" "}
          <Link to="/products" className="text-dark text-decoration-none">
            Sản phẩm
          </Link>{" "}
          /
          <Link to="#" className="text-dark text-decoration-none">
            {" "}
            Mô tả sản phẩm
          </Link>
          <hr />
        </h2>
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
