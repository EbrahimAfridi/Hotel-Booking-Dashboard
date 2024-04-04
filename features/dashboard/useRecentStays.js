import {useSearchParams} from "react-router-dom";
import {subDays} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getStaysAfterDate} from "../../services/apiBookings.js";

export function useRecentStays () {
  const [searchParams] = useSearchParams();

  // If the URL has a query parameter called "last", we will use that number to get the bookings from the last X days
  // Otherwise, we will get the bookings from the last 7 days.
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  // This queryData will be passed to the functions in apiBookings.js
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out)");

  return { isLoading, stays, confirmedStays, numDays };
}