import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";
import toast from "react-hot-toast";


export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {isDeleting, deleteBooking};
}
