import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { auth } from '../config/firebase.config';
import Swal from 'sweetalert2';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name, photoURL });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registration successful!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Google registration successful!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto p-10">
            <Helmet>
                <title>BookHaven | Register</title>
            </Helmet>
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
            <form onSubmit={handleRegister} className="max-w-md mx-auto bg-gray-300 text-gray-700 p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded text-white"
                        required
                    />
                </div>
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
                    <label className="block text-sm font-bold mb-2">Photo URL</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="w-full p-2 border rounded text-white"
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Register
                </button>
            </form>
            <div className="text-center mt-4">
                <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
                <button
                    onClick={handleGoogleRegister}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                >
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
