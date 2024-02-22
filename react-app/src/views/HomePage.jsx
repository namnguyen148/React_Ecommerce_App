import Navbar from "../components/Navbar";
import Main from "../components/main"
import Product from "../components/Products"
import Footer from "../components/Footer"
import queryString from "query-string";
import axios from "../config/axiosCustom";
import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    } catch (error) {
      console.error("get list products error:", error);
    }
  };
  
  useEffect(() => {
    fetchListProducts();
  }, []);
  
  return (
    <>
      <Navbar />
      <br/>
      <Main />
      <Product 
        data={data}
        loading={loading}
      />
      <Footer />
    </>
  );
}

export default Home;
