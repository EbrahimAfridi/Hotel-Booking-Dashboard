import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import {useCabin} from "./useCabin.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

function CabinTable() {

  // Custom hook
  const {isLoading, cabins} = useCabin();
  const [searchParams] = useSearchParams();

  // When loading data from supabase
  if (isLoading) return <Spinner/>;
  if (!cabins.length) return <Empty resource="cabins"/>;


  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if(filterValue === "all") filteredCabins = cabins;
  if(filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if(filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  // 2. Sort
  const sortBy = searchParams.get("sort-by") || "startDate-asc";
  const [field, order] = sortBy.split("-"); // To split the name-asc into "name" and "asc" respectively.
  const modifier = order === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);


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
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}
        />

      </Table>
    </Menus>
  )
}

export default CabinTable;

