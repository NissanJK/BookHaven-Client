import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth'; 
import Modal from '../components/Modal';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth(); 

    useEffect(() => {
        axiosSecure.get(`/books/${id}`)
            .then(({ data }) => setBook(data))
            .catch(error => console.error('Error fetching book details:', error));
    }, [id, axiosSecure]);

    const handleBorrow = (returnDate) => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!returnDate) {
            setModalOpen(false);
            return;
        }

        axiosSecure.post('/borrow', { bookId: id, returnDate })
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Book borrowed successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setModalOpen(false);
            })
            .catch((error) => {
                console.error('Error borrowing book:', error);
                const errorMessage = error.response?.data?.message || 'Failed to borrow the book.';
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    if (!book) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div className='flex justify-center py-10'>
            <Helmet>
                <title>BookHaven | {book.name} Details</title>
            </Helmet>

            <div className='card bg-gray-600 p-3 w-11/12 mx-auto'>
                <div className='mb-8'>
                    <button onClick={() => navigate(-1)} className="btn btn-outline">
                        Back
                    </button>
                </div>
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-100">{book.name}</h1>
                <img src={book.image} alt={book.name} className="h-60 object-cover gloss" />
                <p className='mt-5 text-gray-300'>Author: {book.authorName}</p>
                <p className='text-gray-300'>Category: {book.category}</p>
                <p className='text-gray-300'>Quantity: {book.quantity}</p>
                <p className='text-gray-300'>Description: {book.shortDescription}</p>
                <ReactStars count={5} value={book.rating} size={24} edit={false} />
                {user ? (
                    <button
                        disabled={book.quantity === 0}
                        onClick={() => setModalOpen(true)}
                        className="btn btn-primary mt-4"
                    >
                        {book.quantity === 0 ? 'Out of Stock' : 'Borrow'}
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="btn btn-primary mt-4"
                    >
                        Log in to Borrow
                    </button>
                )}
                {isModalOpen && <Modal onSubmit={handleBorrow} />}
            </div>
        </div>
    );
};

export default BookDetails;
