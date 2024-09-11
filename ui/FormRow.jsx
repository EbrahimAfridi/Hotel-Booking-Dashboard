import styled from "styled-components";
import {breakpoints} from "../utils/constants.js";

const StyledFormRow = styled.div`
    @media (max-width: ${breakpoints.mobile}) {
        grid-template-columns: 1fr 1fr;
        gap: 1.4rem;
        padding: 1rem;
    }
    
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;
    padding: 1.2rem 0;
    
    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        @media (max-width: ${breakpoints.mobile}) {
            justify-content: center;
        }
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

// eslint-disable-next-line react/prop-types
function FormRow({children, error, label}) {
    return (
        <StyledFormRow>
            {/* eslint-disable-next-line react/prop-types */}
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <Error>{error}</Error>}
        </StyledFormRow>
    )
}

export default FormRow
