import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { applyMediaQuery } from 'styles/mediaQueries';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 500;
  }

  #root, body, html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 35%;

    @media screen and (min-width: 1921px) {
      font-size: 62.5%;
    }

    ${applyMediaQuery('mobile')} {
        overflow: hidden;
    }
  }

  * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
    }
    font-family: Pretendard-Regular, sans-serif;
  }

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
