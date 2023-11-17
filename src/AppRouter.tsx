import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import RegistrationPage from './containers/RegistrationPage';
import LoginPage from './containers/LoginPage';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/registrationPage"
                    element={<RegistrationPage />}
                />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}
