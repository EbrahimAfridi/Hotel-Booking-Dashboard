import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {useLogout} from "./useLogout.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

export default function Logout() {
  const {logout, isLoading} = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {isLoading ? <SpinnerMini/> : <HiArrowRightOnRectangle/>}
    </ButtonIcon>
  );
}
