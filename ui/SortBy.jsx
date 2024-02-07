import Select from "./Select.jsx";
import {useSearchParams} from "react-router-dom";

function SortBy({options}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort-by") || "";

  function handleOnChange(e){
    searchParams.set("sort-by", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} value={sort_by} type="white" onChange={handleOnChange}/>
  )
}

export default SortBy
