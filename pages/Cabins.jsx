import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import Button from "../ui/Button.jsx";
import {useState} from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable/>
        {/* Here show => !show means change the state, i.e., toggle the state  */}
        <Button onClick={() => setShowForm((show) => !show)}>Add a new cabin</Button>
        {
          showForm && <CreateCabinForm showForm={showForm} setShowForm={setShowForm}/>
        }
      </Row>
    </>
  );
}

export default Cabins;
