import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &:hover,
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }

  html, body {
    height: 100%;
  }
  
  body::-webkit-scrollbar {
    display: none;
  }

  html {
    height: -webkit-fill-available;
  }


  body,
  input,
  button,
  textarea,
  .MuiPaper-root,
  .MuiPopover-paper {
    font-size: 1rem;
    font-family: Poppins !important;
    font-weight: normal;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ul {
    list-style: none;
  }
`;
