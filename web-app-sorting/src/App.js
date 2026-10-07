import logo from './logo.svg';
import React from 'react';
import MainPage from './pages/MainPage';
import CreateArticle from './pages/CreateArticle'; 
import FullArticle from './pages/FullArticle';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import ResetArticlePage from './pages/ResetPassword';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/add-post" element={<CreateArticle/>} />
        <Route path="/posts/:id" element={<FullArticle/>} />
        <Route path="/posts/:id/edit" element={<CreateArticle/>} />
        <Route path="/reset-password/:id/:token" element={<ResetArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
