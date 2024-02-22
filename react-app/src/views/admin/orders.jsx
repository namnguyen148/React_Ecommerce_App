import React, { useState, useEffect } from "react";
import UsersHeader from "../../components/Header";
import Container from "react-bootstrap/Container";
import CustomerTable from "../../components/CustomerTable";
import axios from "../../config/axiosCustom";
import queryString from "query-string";
import ProductPagination from "../../components/UserPagination";
import EditModal from "../../components/CustomerEditModal";
import OrderDetailModal from "../../components/OrderDetailModal";

export default function Orders() {

  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [dataSearch, setDataSearch] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [perPage, setPerPage] = useState("");
  const [lastPages, setLastPages] = useState(5);
  const [order, setOrder] = useState({});
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    fetchSearchData(dataSearch);
  };

  const handelOrderDetailModal = (values) =>{
    setShowModal(true);
    // console.log('hàm lấy order id:', values);
    const data = {
      customer_id: values.customer_id,
      order_id: values.id,
    };
    setDataOrder(values);
    // console.log('data values lấy từ con mắt order id:',data);
    fetchOrderDetail(data);
  }

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

  async function fetchSearchData(values) {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({ url: "/customers/list", query: values })
      );
      const $data = response.data.data.data;
      setProducts(response.data.data.data);
      setPages(response.data.data.links);
      setCurrentPage(response.data.data.current_page);
      setPerPage(response.data.data.per_page);
      // setTotalProduct(response.data.data.total);
      // console.log('dataorrder ben trang admin',response);
      setUserMessage("");
      if ($data.length === 0) {
        setUserMessage("Không có dữ liệu");
      }
      setLastPages(response.data.data.last_page)
    } catch (error) {
      console.error(error);
      setProducts([]);
      setUserMessage("Không có dữ liệu");
    }
  }

  useEffect(() => {
    fetchSearchData(dataSearch);
  }, [dataSearch]);

  function handelSearch(values, type) {
      const merge = { ...dataSearch, ...values };
      setDataSearch(merge);
  }
  function handelEditModal(values) {
    // setCustomerModal(values);
    setOrder(values);
    setShowEditModal(true);
  }
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <UsersHeader />
      <br />
      <br />
      <Container>
        <CustomerTable
          currentPage={currentPage}
          perPage={perPage}
          data={products}
          handelEditModal={handelEditModal}
          handelOrderDetailModal={handelOrderDetailModal}
        />
        {userMessage && (
          <div className="alert alert-danger text-center">{userMessage}</div>
        )}
        <ProductPagination 
          pages={pages} 
          handelSearch={handelSearch} 
          totalPage={lastPages}
        />
      </Container>
      <EditModal
        data={order}
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />
      <OrderDetailModal
        dataOrder={dataOrder}
        dataOrderDetail={dataOrderDetail}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}

