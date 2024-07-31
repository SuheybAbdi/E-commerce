import React from "react";
import { Badge } from "@mui/material";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

const Header = ({ count }) => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const MotionLink = motion(Link);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/devStore" className="text-white text-2xl font-bold no-underline">
        Suhieb  Store
        </Link>
        <div className="hidden md:flex space-x-4">
          <MotionLink
            to="/home"
            className="text-white text-lg no-underline hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
          >
            Home
          </MotionLink>
          <MotionLink
            to="/about"
            className="text-white text-lg no-underline hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
          >
            About
          </MotionLink>
          <MotionLink
            to="/products"
            className="text-white text-lg no-underline hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
          >
            Products
          </MotionLink>
          <MotionLink
            to="/contact"
            className="text-white text-lg no-underline hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
          >
            Contact Us
          </MotionLink>
          <Link to="/shoppingCart/id" className="relative text-white no-underline">
            <Badge badgeContent={count} color="secondary">
              <BsCart className="text-white" fontSize={30} />
            </Badge>
          </Link>
          {isAuthenticated && (
            <p className="text-[#00c497] font-semibold tracking-wider">
              {user.email}
            </p>
          )}
          
        </div>
        <div className="md:hidden flex items-center">
          <button className="outline-none mobile-menu-button">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden mobile-menu">
        <ul>
          <li>
            <Link
              to="/home"
              className="block text-sm px-2 py-4 text-white no-underline hover:bg-gray-700 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block text-sm px-2 py-4 text-white no-underline hover:bg-gray-700 transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="block text-sm px-2 py-4 text-white no-underline hover:bg-gray-700 transition duration-300"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block text-sm px-2 py-4 text-white no-underline hover:bg-gray-700 transition duration-300"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/shoppingCart/id"
              className="block text-sm px-2 py-4 text-white no-underline hover:bg-gray-700 transition duration-300"
            >
             
            </Link>
          </li>
          
          
        </ul>
      </div>
    </nav>
  );
};

export default Header;
