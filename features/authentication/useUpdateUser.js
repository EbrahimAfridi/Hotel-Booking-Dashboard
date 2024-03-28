import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateUserData} from "../../services/apiAuth.js";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {mutate: updateUser, isLoading: isUpdating} = useMutation({
    mutationFn: updateUserData,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated.");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}
