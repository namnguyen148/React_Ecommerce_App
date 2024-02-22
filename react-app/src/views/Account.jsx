import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Addrress from '../components/Address'
import AddAddressModal from '../components/AddAddressModal';
import axios from "../config/axiosCustom";
import queryString from "query-string";
import AuthUser from "../components/AuthUser";

const Account = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const { customer } = AuthUser();
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    fetchAddress();
  };
  const handleAddModal = () => {
    setShowAddModal(true);
  };

  const fetchAddress = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/address/list",
          query: {customer_id: customer.customer_id},
        })
      );
      // console.log('data của address', response.data.data.data);
      setDataAddress(response.data.data.data);
    } catch (error) {
      console.error("get list provinces error:", error);
    }
  };

  const handleAddress = async (addressID) => {
    try {
      const address = {customer_id: customer.customer_id, addressID: addressID}
      await axios.patch(
        queryString.stringifyUrl({
          url: "/address/update",
          query: address,
        })
      );
      fetchAddress();
      // console.log('data của address', response.data.data.data);
      // setDataAddress(response.data.data.data);
      // console.log('data updata  province', province);
      // console.log('data updata  district', district);
      // console.log('data updata ward', ward);

    } catch (error) {
      console.error("get list provinces error:", error);
    }
  };

  async function deleteAddress(values) {
    try {
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa địa chỉ này không?"
      );
  
      if (!isConfirmed) {
        return;
      }
      await axios.delete(`/address/delete/${values}`);
      fetchAddress();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h4 className="text-center">
          {" "}
          <Link to="/" className="text-dark text-decoration-none">
            Trang chủ
          </Link>{" "}
          /
          <Link to="/address" className="text-dark text-decoration-none">
            {" "}
            Địa chỉ của tôi
          </Link>
        </h4>
        <hr />
        <Addrress
          deleteAddress={deleteAddress}
          handleAddModal={handleAddModal}
          handleAddress={handleAddress}
          dataAddress={dataAddress}
        />
      </div>
      <AddAddressModal
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
      />
    </>
  );
};

export default Account;
