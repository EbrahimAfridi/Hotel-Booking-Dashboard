import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Logo from "../ui/Logo.jsx";
import Heading from "../ui/Heading.jsx";

const LoginLayout = styled.main`
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

// const Credentials = styled.div`
//     position: absolute;
//     top: 3.2rem;
//     right: 3.2rem;
//     display: grid;
//     gap: 1.6rem;
//     padding: 3.2rem;
//     background-color: var(--color-grey-50);
//     box-shadow: 0 0.4rem 1.2rem var(--shadow-sm);
//     text-align: center;
//
//     @media (max-width: 768px) {
//         top: 2rem;
//         right: 33%;
//         padding: 10px 0;
//     }
//
//     @media (max-width: 390px) {
//         top: 0;
//         right: 35%;
//         padding: 0;
//         gap: 1rem;
//         font-size: 12px;
//     }
// `;

function Login() {
  return (
    <LoginLayout>
      {/*<Credentials>*/}
      {/*  <Heading as="h3">Credentials</Heading>*/}
      {/*  <p>Email: test@test.com</p>*/}
      {/*  <p>Password: password</p>*/}
      {/*</Credentials>*/}
      <Logo/>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm/>
    </LoginLayout>
  )
}

export default Login;
