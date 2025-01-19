import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

import PreSignUpPage from '@/components/PreSignUpPage/PreSignUpPage'
import WeightPage from '@/pages/user/WeightPage/WeightPage'
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';
import TrainingRecordPage from '@/pages/user/TrainingRecordPage/TrainingRecordPage';
import SentVerifyEmail from '@/pages/user/VerifyEmail/SentVerifyEmail';
import SignupPage from './pages/user/SignupPage/SignupPage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PreSignUpPage />}/>
                <Route path='/user/signup' element={ <SignupPage /> }/>
                <Route path='user/email/sent-verify-mail' element={<SentVerifyEmail />} />
                <Route path='/weight' element={<WeightPage />}/>
                <Route path='/training/record' element={<TrainingRecordPage />}/>
                <Route path='*' element={<NotFoundPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
