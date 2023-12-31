import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import PrivateRoute from './routes/PrivateRoute';
import DashboardPage from './containers/DashboardPage';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import BookPage from './components/BookPage';
import CheckoutPage from './containers/CheckoutPage';

function AppRoutes() {
    const { loggedUser } = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books.books);

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginPage" element={<LoginPage />} />
                <Route
                    path={`/dashboard/${loggedUser?.id}`}
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/books/:bookId"
                    element={<BookPage books={books} />}
                />
                <Route
                    path={`/checkout/${loggedUser?.id}`}
                    element={
                        <PrivateRoute>
                            <CheckoutPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default function AppRouter() {
    return (
        <div>
            <AppRoutes />
        </div>
    );
}
