import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-page py-10 text-gray-100">
            <Helmet>
                <title>BookHaven | About</title>
            </Helmet>
            <div className="w-11/12 mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">About BookHaven</h1>
                    <p className="text-lg text-gray-300">
                        Your ultimate destination for discovering, borrowing, and cherishing books.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8">
                    <div className="bg-gray-600 p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-300">
                            At BookHaven, our mission is to inspire a love for reading and learning by providing a wide
                            array of books, a serene environment, and exceptional services to our community. We aim to
                            foster knowledge, creativity, and a lifelong passion for books.
                        </p>
                    </div>
                    <div className="bg-gray-600 p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                        <p className="text-gray-300">
                            We envision a world where books are accessible to everyone, empowering individuals to grow
                            intellectually and emotionally. BookHaven strives to be a sanctuary for readers and learners
                            of all ages.
                        </p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-center mb-6">Why Choose BookHaven?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-600 p-6 rounded-lg shadow text-center">
                            <h3 className="text-xl font-semibold mb-3">Vast Collection</h3>
                            <p className="text-gray-300">
                                Explore thousands of books across diverse genres, from classics to modern bestsellers.
                            </p>
                        </div>
                        <div className="bg-gray-600 p-6 rounded-lg shadow text-center">
                            <h3 className="text-xl font-semibold mb-3">Community Events</h3>
                            <p className="text-gray-300">
                                Join book clubs, author meet-and-greets, and engaging workshops held monthly.
                            </p>
                        </div>
                        <div className="bg-gray-600 p-6 rounded-lg shadow text-center">
                            <h3 className="text-xl font-semibold mb-3">Seamless Online Services</h3>
                            <p className="text-gray-300">
                                Enjoy hassle-free online catalog browsing, reservations, and renewals.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-gray-300 mb-6">
                        Be part of a vibrant community that celebrates books and reading. Whether you're a casual reader
                        or a bookworm, BookHaven welcomes you!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
