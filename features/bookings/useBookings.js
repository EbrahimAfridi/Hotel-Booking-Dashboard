import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useBookings() {

  // To get search params from the URL
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
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

  // 3. PAGINATION page = konse page par hai
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // 4. Query: Fetching data from supabase using react-query
  const {
    data: {data: bookings, count} = {},
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({filter, sortBy, page}),
  });

  // 5. Pre-fetching data for the next page
  const totalPages = Math.ceil(count / PAGE_SIZE);

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({filter, sortBy, page: (page + 1)}),
    })
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({filter, sortBy, page: (page - 1)}),
    })
  }


  return {isLoading, error, bookings, count};
}
