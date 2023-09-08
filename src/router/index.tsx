import { Navigate, Route, Routes } from 'react-router-dom';
import { PATHS } from '../constants/Paths';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/Singup';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

const Router = () => {
  return (
    <Routes>
      <Route path={PATHS.AUTH.LOGIN} element={<Login />} />
      <Route path={PATHS.AUTH.SIGNUP} element={<SignUp />} />
      <Route path={PATHS.HOME} element={<HomePage />} />
      <Route path={PATHS.ERRORS.NOT_FOUND} element={<NotFoundPage />} />
      <Route
        path={'*'}
        element={<Navigate to={PATHS.ERRORS.NOT_FOUND} replace={true} />}
      />
    </Routes>
  );
};

export default Router;
