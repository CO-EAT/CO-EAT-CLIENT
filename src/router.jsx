import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import PickPage from 'pages/PickPage';
import ResultPage from 'pages/ResultPage';
import HostPage from 'pages/HostPage';
import SettingPage from 'pages/SettingPage';
import NonExistLinkPage from 'pages/NonExistLinkPage';
import useRoomInfo from 'cores/hooks/useRoomInfo';
import DonePage from 'pages/DonePage';

function Router() {
  const { roomStateContext } = useRoomInfo();
  const checkIsValidAccess = (pageToBeRender) => {
    const { inviteCode, userInfo } = roomStateContext;
    const storedRoomState = sessionStorage?.getItem('roomInfo');
    if (!storedRoomState && (!inviteCode || !userInfo.nickname)) return <Navigate to="/" />;
    return pageToBeRender;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<HostPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/pick" element={checkIsValidAccess(<PickPage />)} />
        <Route path="/result" element={checkIsValidAccess(<ResultPage />)} />
        <Route path="/done" element={<DonePage />} />
        <Route path="/error" element={<NonExistLinkPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
