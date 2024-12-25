import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../config/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser?.email) {
                    const user = { email: currentUser.email };
                    const response = await axios.post('https://library-management-system-server-swart.vercel.app/jwt', user, { withCredentials: true });
                    console.log('JWT token issued:', response.data);
                    setUser(currentUser);
                } else {
                    await axios.post('https://library-management-system-server-swart.vercel.app/logout', {}, { withCredentials: true });
                    console.log('Logged out successfully');
                    setUser(null);
                }
            } catch (error) {
                console.error('Error in authentication flow:', error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
