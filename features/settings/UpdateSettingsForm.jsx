import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useUpdateSetting} from "./useUpdateSetting.js";

function UpdateSettingsForm() {

  // fetching setting data

  // We destructured settingsData, and it does not have values initially i.e.,
  // on first render, so we assigned a fallback value equals to an empty object
  const {isLoading, settingsData: {minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice} = {}} = useSettings();

  // Custom hook: update settings
  const {isUpdating, updateSetting} = useUpdateSetting();

  // When data is loading
  if (isLoading) return <Spinner/>

  function handleUpdate(e, field) {
    const {value} = e.target;

    if(!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' onBlur={(e) => handleUpdate(e, "minBookingLength")} disabled={isUpdating} defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' onBlur={(e) => handleUpdate(e, "maxBookingLength")} disabled={isUpdating} defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")} disabled={isUpdating} defaultValue={maxGuestsPerBooking} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' onBlur={(e) => handleUpdate(e, "breakfastPrice")} disabled={isUpdating} defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
