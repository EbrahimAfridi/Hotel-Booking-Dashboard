import {useSearchParams} from "react-router-dom";
import {subDays} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getBookingsAfterDate} from "../../services/apiBookings.js";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // If the URL has a query parameter called "last", we will use that number to get the bookings from the last X days
  // Otherwise, we will get the bookings from the last 7 days.
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  // This queryData will be passed to the functions in apiBookings.js
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}