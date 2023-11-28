import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import PrivateRoute from './routes/PrivateRoute';
import DashboardPage from './containers/DashboardPage';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginPage" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
