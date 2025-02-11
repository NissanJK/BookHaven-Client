import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/borrowed-books')
            .then(res => {
                setBorrowedBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching borrowed books:', err);
                setLoading(false);
            });
    }, [axiosSecure]);

    const handleReturn = (borrowId) => {
        axiosSecure.post('/return', { borrowId })
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Book returned successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setBorrowedBooks(prevBooks =>
                    prevBooks.filter(book => book._id !== borrowId)
                );
            })
            .catch(err => {
                console.error('Error returning book:', err);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Failed to return the book!',
                    text: err.response?.data?.message || 'Unexpected error occurred.',
                    showConfirmButton: true,
                });
            });
    };

    return (
        <div className="py-10 bg-gray-700">
            <Helmet>
                <title>BookHaven | Borrowed Books</title>
            </Helmet>
            <div className="w-11/12 mx-auto min-h-screen">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">Borrowed Books</h2>

                {loading ? (
                    <div className='flex justify-center items-center h-screen'>
                        <span className="loading loading-infinity loading-lg"></span>
                    </div>
                ) : borrowedBooks.length === 0 ? (
                    <p className="text-center text-gray-300 text-2xl">You have no borrowed books at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {borrowedBooks.map(book => (
                            <div key={book._id} className="bg-gray-600 card p-2 rounded-lg shadow hover:shadow-lg transition">
                                <img src={book.coverImage} alt={book.title} className="h-60 object-cover gloss rounded" />
                                <div className="card-body">
                                    <h3 className="text-xl font-bold mt-2 text-gray-100">{book.title}</h3>
                                    <p className="text-sm text-gray-300">Category: {book.category}</p>
                                    <p className="text-sm text-gray-300">Borrowed Date: {new Date(book.createdAt).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-300">Return Date: {new Date(book.returnDate).toLocaleDateString()}</p>
                                    <button
                                        className="btn btn-danger mt-2 hover:bg-red-700 transition"
                                        onClick={() => handleReturn(book._id)}
                                    >
                                        Return
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BorrowedBooks;
