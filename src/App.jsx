import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

const H1 = styled.h1`
font-size: 30px;
font-weight: 600;
background-color: yellow;`

function App() {
  return (
    <>
      <GlobalStyles/>
      <div>
        <H1>The Cabin House</H1>
        <Button>Check in</Button>
        <Button>Check out</Button>
        <Input placeholder="Number of guests"/>
        <Input placeholder="Number of guests "/>
      </div>
    </>
  )
}

export default App
