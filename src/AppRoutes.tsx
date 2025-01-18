import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

import PreSignUpPage from '@/components/PreSignUpPage/PreSignUpPage'
import WeightPage from '@/pages/WeightPage/WeightPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PreSignUpPage />}/>
                <Route path='/weight' element={<WeightPage />}/>
                <Route path='*' element={<NotFoundPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
