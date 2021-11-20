import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import PickPage from 'pages/PickPage';
import ResultPage from 'pages/ResultPage';
import ResultMealPage from 'pages/ResultMealPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pick" element={<PickPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/resultMeal" element={<ResultMealPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
