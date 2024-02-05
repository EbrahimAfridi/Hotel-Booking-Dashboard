import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {
  return(
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add a new cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm/>
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//
//   return (
//     <div>
//       {/* Here show => !open means change the state, i.e., toggle the state  */}
//       <Button onClick={() => setIsOpenModal((open) => !open)}>
//         Add a new cabin
//       </Button>
//       {
//         isOpenModal && <Modal onClose={() => setIsOpenModal(false)}> <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/> </Modal>
//       }
//     </div>
//   )
// }

export default AddCabin
