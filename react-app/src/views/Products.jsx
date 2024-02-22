import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ListProduct from "../components/ListProducts";
import axios from "../config/axiosCustom";
import queryString from "query-string";
import ProductPagination from "../components/UserPagination";
import { useSelector } from "react-redux";
import Footer from "../components/Footer"

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [lastPages, setLastPages] = useState(5);
  const [dataSearch, setDataSearch] = useState({});
  const [emptyMessage, setEmptyMessage] = useState("");
  const { data: searchProducts } = useSelector((state) => state.SearchSlice);

  const fetchListProducts = async (values) => {
    try {
      setLoading(true);
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/products/list_products",
          query: values,
        })
      );
      setData(response.data.data.data);
      const data = response.data.data.data;
      setEmptyMessage("");
      if (data.length === 0) {
        setEmptyMessage("Không có dữ liệu");
      }
      setPages(response.data.data.links);
      setLastPages(response.data.data.last_page)
      setLoading(false);
    } catch (error) {
      console.error("get list products error:", error);
    }
  };
  
  function handelSearch(values, type) {
    if (type === "navbar") {
      return setDataSearch(values);
    }
    if (type === "reduxUpdate") {
      return setDataSearch(values);
    }
    const merge = { ...dataSearch, ...values };
    return setDataSearch(merge);
  }

  useEffect(() => {
    handelSearch(searchProducts[0], "reduxUpdate");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProducts]);

    useEffect(() => {
      fetchListProducts(dataSearch);
  }, [dataSearch]);
  
  return (
    <>
      <Navbar />
      <ListProduct 
        data={data}
        loading={loading}
      />
      {emptyMessage && (
          <div className="alert alert-danger text-center mx-5 my-5">{emptyMessage}</div>
        )}
      <ProductPagination
        loading={loading}
        pages={pages}
        handelSearch={handelSearch} 
        totalPage={lastPages}
      />
      <Footer />
    </>
  );
};

export default Products;
