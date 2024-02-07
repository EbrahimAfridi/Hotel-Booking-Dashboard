import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";

// eslint-disable-next-line react/prop-types
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {

  // Custom Hooks
  const {isAdding, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();

  // Loading status
  const isWorking = isAdding || isEditing;

  // Variables for editing cabins.
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);  // editId ? true : false

  // Adding default values in the edit form.
  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // error handling using RQs formState
  const {errors} = formState;

  function onSubmit(data) {
    // here string true when link/superbase && data.image[0] when fileList true i.e., uploaded from PC/input
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({newCabinData: {...data, image: image}, id: editId}, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        }
      });
    }else {
      createCabin({...data, image: image},
        {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        }
      });
    }
  }

  // Error while form submission
  function onError() {
    // Jonas also commented this part because we have given the fallback value as an empty object, and when this
    //  component renders, it throws an error undefined which is ugly to see, so ignore printing this error.
    // console.error(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {
          ...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {
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
        <Input type="number" id="regularPrice" disabled={isWorking} {
          ...register("regularPrice", {
            required: "This field is required",
            min: {
              // value: 1,
              message: "Price should be at least one"
            }
          })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking}
               defaultValue={0}
               {...register("discount", {
                 required: "This field is required",
                 validate: (value) => value <= getValues().regularPrice || "Discount should be less than the regular price"
               })
               }/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking}
                  defaultValue=""
                  {...register("description",
                    {
                      required: "This field is required",
                    })
                  }/>
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" accept="image/*"
                   disabled={isWorking}
                   defaultValue=""
                   {...register("image",
                     {
                       required: isEditSession ? false : "This field is required",
                     })}
        />
      < /FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : "Create new cabin"}</Button>
      </FormRow>

    </Form>
  );
}

export default CreateCabinForm;
