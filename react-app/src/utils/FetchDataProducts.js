
import axios from "../config/axiosCustom";
import queryString from "query-string";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [pages, setPages] = useState([]);
  // const [lastPages, setLastPages] = useState(5);
  const [dataSearch, setDataSearch] = useState({});

  // const fetchListProducts = async (values) => {
  //   try {
  //     setLoading(true);
  //     // console.log("data products vlueas:", values);
  //     const response = await axios.get(
  //       queryString.stringifyUrl({
  //         url: "/products/list_products",
  //         query: values,
  //       })
  //     );
  //     setData(response.data.data.data);
  //     console.log('danh sach san phẩm:',data);
  //     setPages(response.data.data.links);
  //     setLastPages(response.data.data.last_page)
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("get list products error:", error);
  //   }
  // };

  function handelSearch(values, type) {
    navigate("/products")
    if (type === "navbar") {
      console.log("value sau khi nhan navbar:", values);
      return setDataSearch(values);
    }
    if (type === "navbarSearch") {
      console.log("value sau khi nhan navbar:", values);
      return setDataSearch(values);
    }
    const merge = { ...dataSearch, ...values };
    console.log("value sau khi merger navbar:", merge);
    return setDataSearch(merge);
  }

  // useEffect(() => {
  //   // console.log("dataserach trc khi hienr thi:", dataSearch);
  //   fetchListProducts(dataSearch);
  // }, [dataSearch]);

  // useEffect(() => {
  //   console.log("data products:", data);
  // }, [data]);
  return{
    // data,
    // loading,
    // pages,
    // lastPages,
    dataSearch,
    setDataSearch,
    // fetchListProducts,
    handelSearch
  }
}
