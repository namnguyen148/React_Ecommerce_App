import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../config/axiosCustom";
import AuthUser from "../components/AuthUser";
import queryString from "query-string";
import ProductPagination from "../components/UserPagination";
import ListOrder from "../components/ListOrder";
import OrderDetailModal from "../components/OrderDetailModal";

const Order = () => {
  const { customer } = AuthUser();
  const [data, setData] = useState([]);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [pages, setPages] = useState([]);
  const [lastPages, setLastPages] = useState(5);
  const [dataSearch, setDataSearch] = useState({
    customer_id: customer.customer_id,
  });
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handelOrderDetailModal = (values) =>{
    setShowModal(true);
    console.log('hàm lấy order id:', values);
    const data = {
      customer_id: customer.customer_id,
      order_id: values.id,
    };
    setDataOrder(values);
    // console.log('data order id:', data);
    fetchOrderDetail(data);
  }

  const fetchOrder = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/orders/list",
          query: values,
        })
      );
      setData(response.data.data.data);
      setPages(response.data.data.links);
      setLastPages(response.data.data.last_page);
      console.log('data order =', response.data);
    } catch (error) {
      console.error("get list orders error:", error);
    }
  };

  const fetchOrderDetail = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/order_details/list",
          query: values,
        })
      );
      console.log('data order response =', response.data.data.data);
      setDataOrderDetail(response.data.data.data);
    } catch (error) {
      console.error("get list orders error:", error);
    }
  };

  function handelSearch(values, type) {
    if (type === "all") {
      return setDataSearch({ customer_id: customer.customer_id });
    }
    if (type === "success") {
      return setDataSearch({ customer_id: customer.customer_id, status: "1" });
    }
    if (type === "cancel") {
      return setDataSearch({ customer_id: customer.customer_id, status: "0" });
    }
    if (type === "transport") {
      return setDataSearch({ customer_id: customer.customer_id, status: "2"  });
    }
    if (type === "delivered") {
      return setDataSearch({ customer_id: customer.customer_id, status: "3" });
    }
    if (type === "finish") {
      return setDataSearch({ customer_id: customer.customer_id, status: "4" });
    }

    const merge = { ...dataSearch, ...values };
    // console.log(" hanh dong merger: ", dataSearch);
    setDataSearch(merge);
  }

  useEffect(() => {
    fetchOrder(dataSearch);
  }, [dataSearch]);

  const handelCancelOrder = async (values) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await axios.patch(
        queryString.stringifyUrl({
          url: "/orders/update",
          query: values,
        })
      );
      handelSearch();
    } catch (error) {
      console.error("cancel orders error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <ListOrder
        data={data}
        handelCancelOrder={handelCancelOrder}
        handelSearch={handelSearch}
        handelOrderDetailModal={handelOrderDetailModal}
      />
      <ProductPagination
        pages={pages}
        handelSearch={handelSearch}
        totalPage={lastPages}
      />
      <OrderDetailModal
        dataOrder={dataOrder}
        dataOrderDetail={dataOrderDetail}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
export default Order;
