import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const UpdateBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        authorName: '',
        category: '',
        rating: '',
    });
    const categories = ['Novel', 'Thriller', 'History', 'Drama', 'Sci-Fi'];

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/books/${bookId}`, {
                    withCredentials: true,
                });
                setFormData(response.data);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to fetch book details!',
                    text: 'Please try again later.',
                });
            }
        };
        fetchBookDetails();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/books/${bookId}`,
                formData,
                { withCredentials: true }
            );

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Book updated successfully!',
                });
                navigate('/all-books');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to update book!',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'An error occurred!',
                text: 'Please try again later.',
            });
        }
    };

    return (
        <div className="w-10/12 mx-auto p-6 bg-gray-700 rounded shadow-md my-10">
            <Helmet>
                <title>BookHaven | Update Book</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center">Update Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Book Cover Image</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="block w-full border rounded px-3 py-2"
                        placeholder="Enter Cover Image URL"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Book Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full border rounded px-3 py-2"
                        placeholder="Enter book title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Author Name</label>
                    <input
                        type="text"
                        name="authorName"
                        value={formData.authorName}
                        onChange={handleChange}
                        className="block w-full border rounded px-3 py-2"
                        placeholder="Enter author name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="block w-full border rounded px-3 py-2"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        className="block w-full border rounded px-3 py-2"
                        placeholder="Enter rating (1-5)"
                    />
                </div>
                <button
                    type="submit"
                    className="block w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;
