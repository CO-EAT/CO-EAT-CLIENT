import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  #root, body, html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 35%;

    @media screen and (min-width: 1921px) {
      font-size: 62.5%;
    }
  }

  * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
    }
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
;
  }

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
