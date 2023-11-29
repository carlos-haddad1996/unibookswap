import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store/rootReducer';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const { loggedUser } = useSelector((state: RootState) => state.user);

    if (!loggedUser) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}
