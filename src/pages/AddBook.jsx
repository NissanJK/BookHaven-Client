import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const AddBook = () => {
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        quantity: '',
        authorName: '',
        category: '',
        shortDescription: '',
        rating: '',
    });

    const categories = ['Novel', 'Thriller', 'History', 'Drama', 'Sci-Fi'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image || !formData.name || !formData.authorName || !formData.category || !formData.rating) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fill in all required fields!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const formDataToSend = new FormData();
        console.log(formDataToSend)
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            const response = await axios.post('http://localhost:5000/books', formDataToSend, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Book Data Has been added.",
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormData({
                    image: '',
                    name: '',
                    quantity: '',
                    authorName: '',
                    category: '',
                    shortDescription: '',
                    rating: '',
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed to add the book!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "An error occurred while adding the book!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="w-10/12 mx-auto p-6 bg-gray-700 rounded shadow-md my-10">
            <Helmet>
                <title>BookHaven | Add Book</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center">Add a New Book</h2>
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
                    <label className="block mb-2 font-medium">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="block w-full border rounded px-3 py-2"
                        placeholder="Enter quantity"
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
                    <label className="block mb-2 font-medium">Short Description</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="block w-full border rounded px-3 py-2"
                        placeholder="Write a short description"
                        rows="4"
                    ></textarea>
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
                    Add Book
                </button>
            </form>
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Book Content</h3>
                <p className="text-gray-500">
                    Add a new book to the library. Please ensure all information is accurate before submitting.
                </p>
            </div>
        </div>
    );
};

export default AddBook;
