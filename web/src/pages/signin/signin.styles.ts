import styled from "styled-components";

export const StyledSignInContainer = styled.main`
  display: flex;
  height: 100vh;
`;

export const StyledSignInLeft = styled.section`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  height: 100%;
  width: 45%;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 7.5rem;
    height: 75%;
  }

  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    background: ${(props) => props.theme.colors.secondary};
    height: 25%;
    text-align: center;
    padding: 5rem;

    header {
      font-size: 1.75rem;
      line-height: 1;
      font-weight: 700;
    }

    p {
      font-weight: 400;
    }
  }
`;

export const StyledSignInRight = styled.section`
  height: 100%;
  width: 55%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 70%;

    input {
      padding: 1rem;
    }

    button {
      padding: 1rem;
      font-weight: 700;
      font-size: 1.25rem;
    }
  }
`;
