import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
  html{
    font-size: 18px;
    font-size: clamp(1rem, 0.9122rem + 0.3801vw, 1.3rem);
  }
  body {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    margin: 0;
    background: ${({ theme }) => theme.colors.lighter};
    color: ${({ theme }) => theme.colors.dark};
    font-family: ${({ theme }) => theme.fonts.prim};
    font-size: ${({ theme }) => theme.fonts.md};
    line-height: ${({ theme }) => theme.lines.lg}
  }
  h1, h2, h3, h4, h5 {
      font-weight: bold;
      line-height: ${({ theme }) => theme.lines.md};
  }
  h1 {
      font-size: ${({ theme }) => theme.fonts.h1};
  }
  h2 {
      font-size: ${({ theme }) => theme.fonts.h2};
  }
  h3 {
      font-size: ${({ theme }) => theme.fonts.h3};
  }
  h4 {
      font-size: ${({ theme }) => theme.fonts.h4};
  }
  h5 {
      font-size: ${({ theme }) => theme.fonts.h5};
  }
  .container{
    width: 100%;
    max-width: ${({ theme }) => theme.sizes.lg};
    margin: 0 auto;
    padding-left: clamp(1rem, 5vw, 7rem);
    padding-right: clamp(1rem, 5vw, 7rem);
  }
`;

export default GlobalStyles;
