import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import {useBooking} from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {HiArrowDownOnSquare, HiArrowUpOnSquare} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import Menus from "../../ui/Menus.jsx";
import {useCheckout} from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {useDeleteBooking} from "./useDeleteBooking.js";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking();
  const {checkout, isCheckingOut} = useCheckout();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner/>;
  if (!booking) return <Empty resource={booking}/>;

  const {status, id: bookingId} = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {
          status === "unconfirmed" && (
            <Button icon={<HiArrowDownOnSquare/>}
                    onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Button>
          )
        }
        {
          status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare/>}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )
        }
        <Modal>

          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId, {
                onSettled: () => navigate(-1)}
              )}
              disabled={isDeleting}
            />
          </Modal.Window>

        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
