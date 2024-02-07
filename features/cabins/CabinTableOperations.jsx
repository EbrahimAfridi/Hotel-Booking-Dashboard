import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField={"discount"}
              options={[
                {value: "all", label: "All"},
                {value: "no-discount", label: "No discount"},
                {value: "with-discount", label: "With discount"}
              ]}
      />
    </TableOperations>
  )
}

export default CabinTableOperations
