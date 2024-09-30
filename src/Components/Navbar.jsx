import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch=useDispatch()

    return (
        <nav className=" p-4 ">
            <div className="container mx-auto flex justify-between items-center">
                {/* Links */}
                <ul className="flex space-x-6 text-black">
                    <li className="hover:text-gray-200">
                        <a href="/">MartX</a>
                    </li>

                </ul>

                {/* Right side (e.g., Login/Signup buttons) */}
                <div>
                    {
                        isAuthenticated ? (
                            <Link to="/" className="bg-whitepx-4 py-2 rounded">
                                Logout
                            </Link>
                        ) : (
                            <Link to="/signup" className="bg-whitepx-4 py-2 rounded"
                           
                            >
                                Sign Up
                            </Link>
                        )
                    }

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
