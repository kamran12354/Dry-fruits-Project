import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO ONLY */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-16 w-16 object-cover rounded-full shadow-md"
          />
        </Link>

        {/* MENU */}
        <div className="hidden sm:flex items-center gap-8 text-gray-700 font-medium">

          <Link 
            to="/about"
            className="hover:text-orange-600 transition"
          >
            About
          </Link>



          <Link 
            to="/contact" 
            className="hover:text-orange-600 transition"
          >
            Contact
          </Link>

          <Link 
            to="/faqs" 
            className="hover:text-orange-600 transition"
          >
            FAQs
          </Link>

          <Link 
            to="/returns" 
            className="hover:text-orange-600 transition"
          >
           Returns
          </Link>

          <Link 
            to="/privacypolicy" 
            className="hover:text-orange-600 transition"
          >
           PrivacyPolicy
          </Link>

          

          <Link 
            to="/products" 
            className="hover:text-orange-600 transition"
          >
            Products
          </Link>

          {/* CART */}
          <Link 
            to="/cart" 
            className="hover:text-orange-600 transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25h10.5l1.644-7.978a1.125 1.125 0 00-1.097-1.347H5.106m0 0L4.125 3.75M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm8.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Cart
          </Link>

          {/* ADMIN LINK */}
          {user?.role === "admin" && (
            <Link 
              to="/admin" 
              className="hover:text-orange-600 transition"
            >
              Admin
            </Link>
          )}

          {/* AUTH BUTTONS */}
          {user ? (
            <div className="flex items-center gap-4">

              <button
                onClick={logout}
                className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm shadow-md transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-1.5 border border-gray-300 rounded-full text-gray-700 text-sm hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm shadow-md transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
