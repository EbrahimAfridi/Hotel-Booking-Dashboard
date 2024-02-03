import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabins} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin(){

  const queryClient = useQueryClient();

  const {mutate: createCabin, isLoading: isAdding} = useMutation({
    mutationFn: (newCabin) => createEditCabins(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {isAdding, createCabin};
}

