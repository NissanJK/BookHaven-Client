import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-gray-200 py-6">
            <div className="w-11/12 md:w-9/12 mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-6 gap-5">
                    <div>
                        <div className="flex gap-2 items-center text-2xl font-bold text-white">
                            BookHaven
                            <img src="./logo.jpg" alt="" className="rounded-full size-8 mt-2" />
                        </div>
                        <p className="mt-1 text-sm text-gray-200">
                            Your ultimate destination for exploring, borrowing, and managing books.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Contact Us</h2>
                        <p className="mt-1 text-sm">Email: support@bookhaven.com</p>
                        <p className="text-sm">Phone: +880 171207****</p>
                        <p className="text-sm">Address: ABC Road, Chattogram, Bangladesh</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Follow Us</h2>
                        <div className="flex gap-4 mt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-2xl hover:text-white transition-colors"></FaFacebook>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-2xl hover:text-white transition-colors"></FaTwitter>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-2xl hover:text-white transition-colors"></FaInstagram>
                            </a>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="text-center pt-6">
                    <p className="text-sm text-gray-200">
                        &copy; {new Date().getFullYear()} BookHaven. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
