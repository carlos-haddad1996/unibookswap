import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import RegistrationPage from './containers/RegistrationPage';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginPage" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}
