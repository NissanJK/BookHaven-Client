import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const BooksByCategory = () => {
    const { category } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        setError(null);

        axiosSecure.get(`/books/category/${category}`)
            .then(({ data }) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching books:', err);
                setError('Failed to fetch books.');
                setLoading(false);
            });
    }, [category, axiosSecure]);

    if (loading) return <div className='flex justify-center items-center h-svh'><span className="loading loading-infinity loading-lg"></span></div>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className='py-10 bg-gray-700'>
            <Helmet>
                <title>BookHaven | Books on {category}</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-100">Books in {category}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mx-auto">
                {books.map((book) => (
                    <div key={book._id} className="bg-gray-600 card p-2 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                    <img src={book.image} alt={book.name} className="w-full h-40 object-cover rounded gloss" 
                    />
                    <div className="flex-grow space-y-2">
                        <h2 className="text-xl font-bold mt-2 text-gray-100">{book.name}</h2>
                        <p className="text-sm text-gray-300">Author: {book.authorName}</p>
                        <p className="text-sm text-gray-300">Category: {book.category}</p>
                        <p className="text-sm text-gray-300">Quantity: {book.quantity}</p>
                        <ReactStars count={5} value={book.rating} size={24} edit={false} />
                    </div>
                    <Link to={`/books/${book._id}`} className="btn btn-secondary mt-4 ">
                        Details
                    </Link>
                </div>
                
                ))}
            </div>
        </div>
    );
};

export default BooksByCategory;
