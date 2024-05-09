import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => toast.success("User successfully created! Please verify the account from your email.")
  });

  return { signup, isLoading };
}