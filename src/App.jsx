import PickProvider from 'cores/contexts/PickProvider';
import RoomProvider from 'cores/contexts/RoomProvider';
import GlobalStyle from 'styles/globalStyle';
import Router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RoomProvider>
        <PickProvider>
          <Router />
        </PickProvider>
      </RoomProvider>
    </>
  );
}

export default App;
