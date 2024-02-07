import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";

export function useBookings() {

  // Fetching data from supabase using react-query
  const {
    data: bookings,
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return {isLoading, error, bookings};
}
