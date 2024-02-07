import {formatCurrency} from "../../utils/helpers.js";
import styled from "styled-components";
import {useState} from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import {useCreateCabin} from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";


// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;

const Price = styled.div`
  font-family: "Sono",sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono",sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`;


function CabinRow({cabin}) {

  const [showForm, setShowForm] = useState(false);

  // Custom hook
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {isAdding, createCabin} = useCreateCabin();

  // eslint-disable-next-line react/prop-types
  const {id: cabinId, name, maxCapacity, image, discount, regularPrice, description} = cabin;

  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of - ${name}`,
      image,
      maxCapacity,
      description,
      regularPrice,
      discount
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt={name}/>
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <button onClick={handleDuplicateCabin} disabled={isAdding}><HiSquare2Stack/></button>
        <Modal>
          <Modal.Open opens="edit">
            <button><HiPencil/></button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin}/>
          </Modal.Window>
          <Modal.Open opens="delete">
            <button><HiTrash/></button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete disabled={isDeleting} resourceName="cabins" onConfirm={() => deleteCabin(cabinId)}/>
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          {/* This will open and close the menu list */}
          <Menus.Toggle id={cabinId}/>

          <Menus.List id={cabinId}>
            <Menus.Button onClick={handleDuplicateCabin} icon={<HiSquare2Stack/>}>Duplicate</Menus.Button>
            <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
          </Menus.List>

        </Menus.Menu>
      </div>

    </Table.Row>
  )
}

export default CabinRow
