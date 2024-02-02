import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCabins} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";


function CreateCabinForm({showForm, setShowForm}) {

  const queryClient = useQueryClient();
  const {register, handleSubmit, reset, getValues, formState} = useForm();

  const {errors} = formState;
  console.log(errors);

  const {mutate, isLoading: isAdding} = useMutation({
    mutationFn: (newCabin) => createCabins(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      reset();
      setShowForm((showForm) => !showForm);
    },
    onError: (error) => toast.error(error.message),
  });

  function onSubmit(data) {
    mutate({...data, image: data.image.at(0)});
  }

  function onError(error) {
    console.error(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isAdding} {
          ...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isAdding} {
          ...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least one"
            }
          })
        }/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isAdding} {
          ...register("regularPrice", {
            required: "This field is required",
            min: {
              // value: 1,
              message: "Price should be at least one"
            }
          })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isAdding}
               defaultValue={0}
               {...register("discount", {
                 required: "This field is required",
                 validate: (value) => value <= getValues().regularPrice || "Discount should be less than the regular price"
               })
               }/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isAdding}
                  defaultValue=""
                  {...register("description",
                    {
                      required: "This field is required",
                    })
                  }/>
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" accept="image/*"
                   disabled={isAdding}
                   defaultValue=""
                   {...register("image",
                     {
                       required: "This field is required",
                     })}
        />
          < /FormRow>

            <FormRow>
          {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding}>Add cabin</Button>
      </FormRow>
    </Form>
);
}

export default CreateCabinForm;
