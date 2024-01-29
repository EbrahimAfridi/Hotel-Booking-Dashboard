import GlobalStyles from "../styles/GlobalStyles.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import H1 from '../ui/Heading.jsx';
import styled from "styled-components";
import Row from "../ui/Row.jsx";

const StyledApp = styled.div`
  background-color: whitesmoke;
  padding: 20px;
`

function App() {
  return (
    <>
      <GlobalStyles/>
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <H1 as="h1">The Cabin House</H1>
            <div>
              <H1 as="h2">The Cabin House</H1>
              <Button>Check in</Button>
              <Button variation="secondary" size="small">Check out</Button>
            </div>
          </Row>
          <Row>
            <H1 as="h3">The Cabin House</H1>
            <div>
              <Input placeholder="Number of guests"/>
              <Input placeholder="Number of guests "/>
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  )
}

export default App
