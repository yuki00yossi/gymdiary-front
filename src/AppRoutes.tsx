import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PreSignUpPage from '@/components/PreSignUpPage/PreSignUpPage';
import WeightPage from '@/pages/user/WeightPage/WeightPage';
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';
import TrainingRecordPage from '@/pages/user/TrainingRecordPage/TrainingRecordPage';
import SignupPage from './pages/user/SignupPage/SignupPage';
import VerifyEmailPage from '@/pages/user/VerifyEmailPage/VerifyEmailPage';
import DashboardPage from './pages/user/DashboardPage/DashboardPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/trainer/pre-signup" element={<PreSignUpPage />} />
        {/* 認証関連ページ */}
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="user/email/verify" element={<VerifyEmailPage />} />

        {/* ユーザーログインページ */}
        <Route path="/user/dashboard" element={<DashboardPage />} />
        <Route path="/weight" element={<WeightPage />} />
        <Route path="/training/record" element={<TrainingRecordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
