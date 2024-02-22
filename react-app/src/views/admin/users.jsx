import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import queryString from "query-string";
import axios from "../../config/axiosCustom";
import UsersHeader from "../../components/Header";
import FormSearch from "../../components/FormSearch";
import UserTable from "../../components/UserTable";
import UserPagination from "../../components/UserPagination";
import EditUserModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";
import ActiveModal from "../../components/ActiveModel";
import AddModal from "../../components/AddModal";
import LoadingScreen from "../../components/LoadingScreen";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [userModal, setUserModal] = useState([]);
  const [dataSearch, setDataSearch] = useState({});
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userAddMessage, setUserAddMessage] = useState("");
  const [userEditMessage, setUserEditMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [perPage, setPerPage] = useState("");
  const [totalUser, setTotalUser] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [lastPages, setLastPages] = useState(5);

  const handleClose = () => {
    setShow(false);
    setUserEditMessage("");
  };
  const handleCloseActiveModal = () => {
    fetchSearchData(dataSearch);
    setShowActiveModal(false);
  };
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setUserAddMessage("");
    fetchSearchData(dataSearch);
  };
  const handleCloseDeleteModal = () => {
    fetchSearchData(dataSearch);
    setShowDeleteModal(false);
  };

  async function fetchSearchData(values) {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({ url: "/users/list", query: values })
      );
      setUsers(response.data.data.data);
      setPages(response.data.data.links);
      const $data = response.data.data.data;
      setCurrentPage(response.data.data.current_page);
      setPerPage(response.data.data.per_page);
      setTotalUser(response.data.data.total);
      setUserMessage("");
      if ($data.length === 0) {
        setUserMessage("Không có dữ liệu");
      }
      setLastPages(response.data.data.last_page)

    } catch (error) {
      console.error(error);
      setUserMessage("Không có dữ liệu");
    }
  }

  useEffect(() => {
    fetchSearchData(dataSearch);
  }, [dataSearch]);

  async function fetchEditData(values) {
    setLoadingEdit(true);
    setLoadingScreen(true);
    setUserEditMessage("");
    setTimeout(async () => {
      try {
        await axios.put(
          queryString.stringifyUrl({ url: "/users/edit", query: values })
        );
        handleClose();
        fetchSearchData(dataSearch);
      } catch (error) {
        console.error(error);
        setUserEditMessage("Email đã tồn lại");
      }
      setLoadingEdit(false);
      setLoadingScreen(false);
    });
  }
  async function fetchAddModal(values) {
    setLoading(true);
    setUserAddMessage("");
    setLoadingScreen(true);
    setTimeout(async () => {
      try {
        await axios.post(
          queryString.stringifyUrl({ url: "/users/add", query: values })
        );
        handleCloseAddModal();
      } catch (error) {
        console.error(error);
        setUserAddMessage("Email đã tồn tại");
      }
      setLoading(false);
      setLoadingScreen(false);
    });
  }

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

  function handleEditUser(values) {
    setUserModal(values);
    setShow(true);
  }
  function handleDeleteUser(values) {
    setUserModal(values);
    setShowDeleteModal(true);
  }
  function handleActiveUser(values) {
    setUserModal(values);
    setShowActiveModal(true);
  }
  function handleAddUser() {
    setShowAddModal(true);
  }

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <UsersHeader />
      <br />
      <Container>
        {loadingScreen && <LoadingScreen />}
        <FormSearch
          totalUser={totalUser}
          handelSearch={handelSearch}
          handleAddUser={handleAddUser}
          fetchSearchData={fetchSearchData}
        />
        <UserTable
          perPage={perPage}
          currentPage={currentPage}
          users={users}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
          handleActiveUser={handleActiveUser}
        />
        {userMessage && (
          <div className="alert alert-danger text-center">{userMessage}</div>
        )}
        <UserPagination
          pages={pages}
          handelSearch={handelSearch}
          totalPage={lastPages}
        />
        <EditUserModal
          loadingEdit={loadingEdit}
          userEditMessage={userEditMessage}
          editUser={userModal}
          show={show}
          handleClose={handleClose}
          fetchEditData={fetchEditData}
        />
        <DeleteModal
          dataUser={userModal}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
        <ActiveModal
          dataUser={userModal}
          showActiveModal={showActiveModal}
          handleCloseActiveModal={handleCloseActiveModal}
        />
        <AddModal
          loading={loading}
          userAddMessage={userAddMessage}
          showAddModal={showAddModal}
          handleCloseAddModal={handleCloseAddModal}
          fetchAddModal={fetchAddModal}
        />
      </Container>
    </div>
  );
}
