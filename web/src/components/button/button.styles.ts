import styled from "styled-components";

export const StyledButton = styled.button<{ secondary?: boolean }>`
  border: none;
  outline: none;
  border-radius: 2.5px;
  background: ${(props) =>
    props.secondary
      ? props.theme.colors.secondary
      : props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;
