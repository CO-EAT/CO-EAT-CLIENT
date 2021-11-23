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

    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  * {
    box-sizing: border-box;
  }

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
