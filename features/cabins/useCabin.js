import {getCabins} from "../../services/apiCabins.js";
import {useQuery} from "@tanstack/react-query";

export function useCabin() {

  // Fetching data from superbase using react-query
  const {
    data: cabins,
    isLoading,
    error
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return {isLoading, error, cabins};
}
