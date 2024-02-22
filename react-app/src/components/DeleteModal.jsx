import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../config/axiosCustom';

export default function DeleteModal({
  handleCloseDeleteModal,
  showDeleteModal,
  dataUser
}) {
    async function DeleteData() {
      try {
        const value = dataUser?.id;
        await axios.delete(`/users/delete/${value}`);
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
          <Modal.Title className='text-danger'>Xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có muốn xoá thành viên {dataUser?.name} không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={DeleteData}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
