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
import NotFoundPage from './containers/NotFoundPage';
import PricingPage from './containers/PricingPage';
import Footer from './components/Footer';
import { Flex, Spacer } from '@chakra-ui/react';

function AppRoutes() {
    const { loggedUser } = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books.books);

    return (
        <BrowserRouter>
            <NavBar />
            <Flex direction="column" minH={'100vh'}>
                <div>
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
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route
                            path="/books/:bookId"
                            element={<BookPage books={books} />}
                        />
                        <Route path="/404" element={<NotFoundPage />} />
                        <Route
                            path={`/checkout/${loggedUser?.id}`}
                            element={
                                <PrivateRoute>
                                    <CheckoutPage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
                <Spacer />
                <Footer />
            </Flex>
        </BrowserRouter>
    );
}

export default function AppRouter() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100hv',
            }}
        >
            <AppRoutes />
        </div>
    );
}
