import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateBooking} from "../../services/apiBookings.js";

export function useCheckout() {

  const queryClient = useQueryClient();

  const {mutate: checkout, isLoading: isCheckingOut} = useMutation({
      mutationFn: (bookingId) => updateBooking(bookingId, {
        status: 'checked-out',
      }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} Checked out successfully`);
        queryClient.invalidateQueries({ active: true });
      },
      onError: (error) => {
        toast.error("Error checking out");
        console.error(error);
      },
    });

    return {checkout, isCheckingOut};
}