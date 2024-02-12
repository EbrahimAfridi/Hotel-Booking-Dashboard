import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateBooking} from "../../services/apiBookings.js";
import {useNavigate} from "react-router-dom";

export function useCheckin() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: checkin, isLoading: isCheckingIn} = useMutation({
      mutationFn: (bookingId) => updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
      }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} Checked in successfully`);
        queryClient.invalidateQueries({active: true});
        navigate("/");
      },
      onError: (error) => {
        toast.error("Error checking in");
        console.error(error);
      },
    });

    return {checkin, isCheckingIn};
}