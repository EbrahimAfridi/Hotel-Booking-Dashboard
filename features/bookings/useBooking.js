import  {useQuery} from "@tanstack/react-query";
import {getBooking} from "../../services/apiBookings.js";
import {useParams} from "react-router-dom";

export function useBooking() {
  // Getting id from the url
  const {bookingId} = useParams();
  
  // Fetching data from superbase using react-query
  const { data: booking, isLoading, error } = useQuery({ queryKey: ['bookings'], queryFn: () => getBooking(bookingId), retry: false});

  return {isLoading, error, booking};
}
