import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Logo from "../ui/Logo.jsx";
import Heading from "../ui/Heading.jsx";
import {breakpoints} from "../utils/constants.js";

const LoginLayout = styled.main`
    /* Mobile Styles */
    @media (max-width: ${breakpoints.mobile}) {
        grid-template-columns: 40rem;
    }
    position: relative;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);
    overflow-x: hidden;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo/>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm/>
    </LoginLayout>
  )
}

export default Login;
