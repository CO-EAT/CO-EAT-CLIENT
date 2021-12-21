import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import PickPage from 'pages/PickPage';
import ResultPage from 'pages/ResultPage';
import HostPage from 'pages/HostPage';
import SettingPage from 'pages/SettingPage';
import NonExistLinkPage from 'pages/NonExistLinkPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<HostPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/pick" element={<PickPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/error" element={<NonExistLinkPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
