import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";

export function useBookings() {

  // To get search params from the URL
  const [searchParams] = useSearchParams();

  // 1. FILTER
  const filteredValue = searchParams.get("status");

  // Here {filter: "status", value: filteredValue, method: methodOfChoice} is an object that will be passed to the
  // getBookings function to define the column and value to filter by also the method to use (eq, gte, lte, etc.)
  const filter = !filteredValue || filteredValue === 'all' ? null : {field: "status", value: filteredValue};

  // const filter = !filteredValue || filteredValue === 'all' ? null : {field: "totalPrice", value: 5000, method: "gte"};

  // 2. SORT
  const sortByRaw = searchParams.get("sort-by") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {field, direction};

  // Fetching data from supabase using react-query
  const {
    data: bookings,
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  });

  return {isLoading, error, bookings};
}
