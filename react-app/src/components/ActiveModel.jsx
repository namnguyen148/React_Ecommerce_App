import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../config/axiosCustom';

function ActiveModal({
  dataUser,
  showActiveModal,
  handleCloseActiveModal,
}) {
  async function updateData() {
    try {
      const value = dataUser?.id;
      await axios.patch(`/users/update/${value}`);
      handleCloseActiveModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal
        show={showActiveModal}
        onHide={handleCloseActiveModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Khóa / Mở khóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có muốn khóa/mở khóa thành viên {dataUser?.name} không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseActiveModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={updateData}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ActiveModal;