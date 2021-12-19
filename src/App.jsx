import RoomProvider from 'cores/contexts/RoomProvider';
import GlobalStyle from 'styles/globalStyle';
import Router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RoomProvider>
        <Router />
      </RoomProvider>
    </>
  );
}

export default App;
