import styled from "styled-components";

export const StyledInput = styled.input`
  outline: none;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 5px;
`;
