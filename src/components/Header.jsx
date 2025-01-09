import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { Tooltip } from "react-tooltip";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "font-bold text-yellow-300" : "hover:text-gray-200"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-books"
                    className={({ isActive }) =>
                        isActive ? "font-bold text-yellow-300" : "hover:text-gray-200"
                    }
                >
                    All Books
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/add-book"
                            className={({ isActive }) =>
                                isActive ? "font-bold text-yellow-300" : "hover:text-gray-200"
                            }
                        >
                            Add Book
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/borrowed-books"
                            className={({ isActive }) =>
                                isActive ? "font-bold text-yellow-300" : "hover:text-gray-200"
                            }
                        >
                            Borrowed Books
                        </NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "font-bold text-yellow-300" : "hover:text-gray-200"
                    }
                >
                    About
                </NavLink>
            </li>
        </>
    );

    return (
        <header className="bg-blue-600 text-white p-4 sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold flex flex-col flex-grow lg:flex-grow-0">
                    {user && (
                        <div className="text-sm hidden md:flex">
                            Welcome, <span>{user.displayName || 'User'}</span>!
                        </div>
                    )}
                    <NavLink to="/" className="flex gap-2 items-center mt-2">
                        BookHaven
                        <img src="./logo.jpg" alt="" className="rounded-full size-8 hidden md:flex" />
                    </NavLink>
                </div>
                <ul className="hidden lg:flex items-center gap-4">{links}</ul>

                <div className="flex items-center gap-2 relative">
                    {user ? (
                        <>
                            <div
                                className="relative group"
                                data-tooltip-id="user-tooltip"
                                data-tooltip-content={user.displayName || "User"}
                                data-tooltip-place="left"
                            >
                                <img
                                    src={user.photoURL || "./logo.jpg"}
                                    alt={user.displayName}
                                    className="rounded-full w-10 h-10 cursor-pointer hidden md:flex"
                                />
                            </div>
                            <button
                                onClick={logout}
                                className="btn btn-error text-white"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="btn btn-success text-white"
                            >
                                Log In
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="btn btn-info text-white"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                    <Tooltip id="user-tooltip" />
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="btn btn-ghost">
                        {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <ul className="w-1/2 absolute top-24 right-0 bg-blue-700 p-4 rounded-lg shadow-lg z-50">
                        {links}
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
