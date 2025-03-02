import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { auth } from '../config/firebase.config';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login successful!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Google login successful!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto p-10">
            <Helmet>
                <title>BookHaven | Login</title>
            </Helmet>
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleLogin} className="max-w-md mx-auto bg-gray-300 text-gray-700 p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded text-white"
                        required
                    />
                </div>
                <div className="flex justify-between items-center">
                    <Link to="/forget-password" state={{ email }} className="text-blue-500 hover:underline">
                        Forget Password?
                    </Link>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Login
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <p>Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></p>
                <button
                    onClick={handleGoogleLogin}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
