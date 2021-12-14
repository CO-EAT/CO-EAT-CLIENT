import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  #root, body, html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    font-size: 40%;
    @media screen and (min-width: 1920px) {
      font-size: 62.5%;
    }

    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
