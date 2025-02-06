import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PreSignUpPage from '@/components/PreSignUpPage/PreSignUpPage';
import WeightPage from '@/pages/user/WeightPage/WeightPage';
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';
import SignupPage from './pages/user/SignupPage/SignupPage';
import VerifyEmailPage from '@/pages/user/VerifyEmailPage/VerifyEmailPage';
import DashboardPage from '@/pages/user/DashboardPage/DashboardPage';
import LoginPage from '@/pages/user/LoginPage/LoginPage';
import DashboardWorkout from '@/pages/user/Workouts/Dashboard';
import ProtectedRoute from '@/utils/ProtectedRoute';
import UnauthorizedPage from '@/pages/errors/UnauthorizedPage';
import { AuthProvider } from './utils/AuthContext';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/trainer/pre-signup" element={<PreSignUpPage />} />
          {/* ------------- 一般ユーザー用ルート ------------- */}
          {/* 認証不要ルート */}
          <Route path="/user/signup" element={<SignupPage />} />
          <Route path="user/email/verify" element={<VerifyEmailPage />} />
          <Route path="/user/login" element={<LoginPage />} />

          {/* 要認証ルート（一般ユーザー） */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedUserTypes={['member']}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/weight"
            element={
              <ProtectedRoute allowedUserTypes={['member']}>
                <WeightPage />
              </ProtectedRoute>
            }
          />
          <Route path="/user/workouts" element={<DashboardWorkout />} />

          {/* ------------- エラールート ------------- */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          {/* ------------- トレーナー用ルート ------------- */}

          {/* ------------- 404ページ ------------- */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
