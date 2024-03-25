import {useUser} from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If a user is not authenticated, redirect to login page
  useEffect(() => {
    if(!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading show spinner
  if(isLoading) return <FullPage> <Spinner/> </FullPage>


  // 4. If a user is authenticated, then render the app layout
  if(isAuthenticated) return children;
}
