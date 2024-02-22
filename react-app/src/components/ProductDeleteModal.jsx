import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "../config/axiosCustom";

function ProductDeleteModal({
  showDeleteModal,
  handleCloseDeleteModal,
  deleteProduct,
}) {
  async function DeleteData() {
    try {
      const value = deleteProduct.product_id;
      await axios.delete(`/products/delete/${value}`);
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>- Tên sản phẩm: {deleteProduct.product_name}</p>
          <p>- Giá: {deleteProduct.product_price}</p>
          <p>
            - Trang thái:{" "}
            {deleteProduct.is_sales === 0
              ? "Ngừng bán"
              : deleteProduct.is_sales === 1
              ? "Đang bán"
              : "Hết hàng"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={DeleteData}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDeleteModal;
