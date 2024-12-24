import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/books', {
                    withCredentials: true,
                });
                setBooks(response.data);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to fetch books!',
                    text: 'Please try again later.',
                });
            }
        };
        fetchBooks();
    }, []);

    const handleUpdate = (bookId) => {
        navigate(`/update-book/${bookId}`);
    };

    return (
        <div className="w-10/12 mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6 text-center">All Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book._id} className="p-4 bg-gray-700 rounded shadow-md">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-40 object-cover rounded mb-4 gloss"
                        />
                        <h3 className="text-lg font-bold mb-2">{book.name}</h3>
                        <p className="text-sm mb-1">Author: {book.authorName}</p>
                        <p className="text-sm mb-1">Category: {book.category}</p>
                        <p className="text-sm mb-2">Rating: {book.rating} / 5</p>
                        <button
                            onClick={() => handleUpdate(book._id)}
                            className="block w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;
