import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);
    const [view, setView] = useState('Card View');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://library-management-system-server-swart.vercel.app/books', {
                    withCredentials: true,
                });
                setBooks(response.data);
                setFilteredBooks(response.data);
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

    useEffect(() => {
        if (showAvailable) {
            setFilteredBooks(books.filter((book) => book.quantity > 0));
        } else {
            setFilteredBooks(books);
        }
    }, [showAvailable, books]);

    const handleUpdate = (bookId) => {
        navigate(`/update-book/${bookId}`);
    };

    return (
        <div className="w-10/12 mx-auto my-10">
            <Helmet>
                <title>BookHaven | All Books</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center">All Books</h2>

            <div className="mb-4 flex justify-between items-center">
                <button
                    onClick={() => setShowAvailable((prev) => !prev)}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700"
                >
                    {showAvailable ? 'Show All Books' : 'Show Available Books'}
                </button>
                <select
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    className="px-4 py-2 bg-gray-700 text-white rounded hidden lg:flex"
                >
                    <option value="Card View">Card View</option>
                    <option value="Table View">Table View</option>
                </select>
            </div>
            {view === 'Card View' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book) => (
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
                            <p className="text-sm mb-2">Quantity: {book.quantity}</p>
                            <button
                                onClick={() => handleUpdate(book._id)}
                                className="block w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="table-auto w-full mt-4 border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Image</th>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Author</th>
                            <th className="border border-gray-400 px-4 py-2">Category</th>
                            <th className="border border-gray-400 px-4 py-2">Rating</th>
                            <th className="border border-gray-400 px-4 py-2">Quantity</th>
                            <th className="border border-gray-400 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book._id}>
                                <td className="border border-gray-400 px-4 py-2">
                                    <img
                                        src={book.image}
                                        alt={book.name}
                                        className="w-20 h-20 object-cover gloss"
                                    />
                                </td>
                                <td className="border border-gray-400 px-4 py-2">{book.name}</td>
                                <td className="border border-gray-400 px-4 py-2">{book.authorName}</td>
                                <td className="border border-gray-400 px-4 py-2">{book.category}</td>
                                <td className="border border-gray-400 px-4 py-2">{book.rating}</td>
                                <td className="border border-gray-400 px-4 py-2">{book.quantity}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button
                                        onClick={() => handleUpdate(book._id)}
                                        className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllBooks;
