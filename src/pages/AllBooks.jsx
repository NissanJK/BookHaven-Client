import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import useAuth from '../hooks/useAuth';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showAvailable, setShowAvailable] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth(); 

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://library-management-system-server-swart.vercel.app/books', {
                    withCredentials: true,
                });
                setBooks(response.data);
                setFilteredBooks(response.data);
                const uniqueCategories = Array.from(new Set(response.data.map((book) => book.category)));
                setCategories(['All', ...uniqueCategories]);
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
        let filtered = books;

        if (showAvailable) {
            filtered = filtered.filter((book) => book.quantity > 0);
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter((book) => book.category === selectedCategory);
        }

        if (searchText.trim()) {
            filtered = filtered.filter((book) =>
                book.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredBooks(filtered);
    }, [showAvailable, selectedCategory, searchText, books]);

    const handleDetails = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    const handleUpdate = (bookId) => {
        navigate(`/update-book/${bookId}`);
    };

    return (
        <div className="w-10/12 mx-auto my-10">
            <Helmet>
                <title>BookHaven | All Books</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center">All Books</h2>

            <div className="mb-4 flex flex-col md:flex-row flex-wrap gap-4 justify-between md:items-center">
                <button
                    onClick={() => setShowAvailable((prev) => !prev)}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
                >
                    {showAvailable ? 'Show All Books' : 'Show Available Books'}
                </button>

                <input
                    type="text"
                    placeholder="Search by book name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-4 py-2 border rounded md:w-1/3"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-gray-700 text-white rounded"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                    <div key={book._id} className="p-4 bg-gray-700 rounded shadow-md flex flex-col justify-between">
                        <div>
                            <img
                                src={book.image}
                                alt={book.name}
                                className="w-full h-40 object-cover rounded mb-4 gloss"
                            />
                            <h3 className="text-lg font-bold mb-2">{book.name}</h3>
                            <p className="text-sm mb-1">Author: {book.authorName}</p>
                            <p className="text-sm mb-1">Category: {book.category}</p>
                            <p className="text-sm mb-1">Rating: {book.rating} / 5</p>
                            <p className="text-sm mb-2">Quantity: {book.quantity}</p>
                        </div>
                        <div>
                            {user?.email === 'admin@bookhaven.com' ? ( 
                                <button
                                    onClick={() => handleUpdate(book._id)}
                                    className="block w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 mt-4"
                                >
                                    Update
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleDetails(book._id)}
                                    className="block w-full bg-gray-600 text-white font-medium py-2 rounded hover:bg-gray-700 mt-4"
                                >
                                    Details
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;
