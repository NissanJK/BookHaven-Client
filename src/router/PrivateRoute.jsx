import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user.email !== "admin@bookhaven.com") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
