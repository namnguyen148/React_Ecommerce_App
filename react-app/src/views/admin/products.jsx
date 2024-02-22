import React, { useState, useEffect } from "react";
import UsersHeader from "../../components/Header";
import Container from "react-bootstrap/Container";
import ProductFormSearch from "../../components/ProductFormSearch";
import ProductTable from "../../components/ProductTable";
import axios from "../../config/axiosCustom";
import queryString from "query-string";
import ProductPagination from "../../components/UserPagination";
import AddProduct from "../../components/ProductAddModal";
import EditProduct from "../../components/ProductEditModal";
import DeleteModal from "../../components/ProductDeleteModal";
import LoadingScreen from "../../components/LoadingScreen";

function Products() {
  const userString = localStorage.getItem("user");
  const user_detail = JSON.parse(userString);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [productModal, setProductModal] = useState([]);
  const [dataSearch, setDataSearch] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [perPage, setPerPage] = useState("");
  const [totalProduct, setTotalProduct] = useState("");
  const [image, setImage] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [lastPages, setLastPages] = useState(5);

  const handleCloseAddModal = () => {
    setImage(null);
    setShowAddModal(false);
    setIsEditMode(false);
    fetchSearchData(dataSearch);
  };
  const handleCloseEditModal = () => {
    setImage(null);
    setShowEditModal(false);
    fetchSearchData(dataSearch);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    fetchSearchData(dataSearch);
  };

  async function fetchSearchData(values) {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({ url: "/products/list", query: values })
      );
      const $data = response.data.data.data;
      setProducts(response.data.data.data);
      setPages(response.data.data.links);
      setCurrentPage(response.data.data.current_page);
      setPerPage(response.data.data.per_page);
      setTotalProduct(response.data.data.total);
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
    if (type === "perPage" || type === "search") {
      const merge = { ...dataSearch, ...values };
      if (dataSearch && dataSearch.page !== undefined) {
        merge.page = "1";
      }
      setDataSearch(merge);
    } else if (type === "page") {
      const merge = { ...dataSearch, ...values };
      setDataSearch(merge);
    } else {
      setDataSearch(values);
    }
  }
  function handelAddModal() {
    setShowAddModal(true);
  }
  function handelEditModal(values) {
    setProductModal(values);
    setShowEditModal(true);
    setIsEditMode(true);
  }
  function handelDeleteModal(values) {
    setProductModal(values);
    setShowDeleteModal(true);
  }

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <UsersHeader />
      <br />
      <Container>
        {loadingScreen && <LoadingScreen />}
        <ProductFormSearch
          totalProduct={totalProduct}
          user_detail={user_detail}
          handelSearch={handelSearch}
          handelAddModal={handelAddModal}
        />
        <ProductTable
          currentPage={currentPage}
          perPage={perPage}
          user_detail={user_detail}
          products={products}
          handelEditModal={handelEditModal}
          handelDeleteModal={handelDeleteModal}
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
      <AddProduct
        setLoadingScreen={setLoadingScreen}
        image={image}
        setImage={setImage}
        isEditMode={isEditMode}
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
      />
      <EditProduct
        setLoadingScreen={setLoadingScreen}
        image={image}
        setImage={setImage}
        dataProduct={productModal}
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />
      <DeleteModal
        deleteProduct={productModal}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </div>
  );
}

export default Products;
