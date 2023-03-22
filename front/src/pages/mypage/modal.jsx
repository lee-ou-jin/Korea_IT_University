import { React,  useState, Fragment } from 'react';
import Modaly from '../components/modaly';
import "../css/modal.css"

function Modal() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Fragment>
      <button onClick={openModal}>모달팝업</button>
      
      <Modaly open={modalOpen} close={closeModal} header="ddddd">
      </Modaly>
    </Fragment>
  );
}

export default Modal;
