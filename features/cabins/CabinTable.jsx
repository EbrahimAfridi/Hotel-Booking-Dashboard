import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import {useCabin} from "./useCabin.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";

function CabinTable() {

  // Custom hook
  const {isLoading, cabins} = useCabin();
  const [searchParams] = useSearchParams();

  // When loading data from supabase
  if (isLoading) return <Spinner/>;

  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if(filterValue === "all") filteredCabins = cabins;
  if(filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if(filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">

        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}
        />

      </Table>
    </Menus>
  )
}

export default CabinTable;

