import RoomProvider from 'cores/contexts/RoomProvider';
import GlobalStyle from 'styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import media from 'styles/mediaQueries';
import Router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RoomProvider>
        <ThemeProvider theme={media}>
          <Router />
        </ThemeProvider>
      </RoomProvider>
    </>
  );
}

export default App;
