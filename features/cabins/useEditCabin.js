import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabins} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const {mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) =>  createEditCabins(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin successfully edited ");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {isEditing, editCabin};
}
