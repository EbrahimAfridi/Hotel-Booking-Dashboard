import styled, { css } from "styled-components";
import {breakpoints} from "../utils/constants.js";


const Form = styled.form`
  /* Mobile Styles */
  @media (max-width: ${breakpoints.mobile}) {
    width: 40rem;
    padding: 2rem;
  }

  ${(props) =>
      props.type === "regular" &&
      css`
          padding: 2.4rem 4rem;

          /* Box */
          background-color: var(--color-grey-0);
          border: 1px solid var(--color-grey-100);
          border-radius: var(--border-radius-md);
      `}

  ${(props) =>
      props.type === "modal" &&
      css`
        width: 80rem;
      `}

  overflow: hidden;
  font-size: 1.4rem;
`;



Form.defaultProps = {
  type: "regular",
};

export default Form;
