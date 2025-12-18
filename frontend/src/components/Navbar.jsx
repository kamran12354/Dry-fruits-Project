import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-14 w-14 object-cover rounded-full shadow-md"
          />
        </Link>

        {/* HAMBURGER (Mobile only) */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-8 text-gray-700 font-medium">

          <Link to="/about" className="hover:text-orange-600 transition">About</Link>
          <Link to="/contact" className="hover:text-orange-600 transition">Contact</Link>
          <Link to="/faqs" className="hover:text-orange-600 transition">FAQs</Link>
          <Link to="/returns" className="hover:text-orange-600 transition">Returns</Link>
          <Link to="/privacypolicy" className="hover:text-orange-600 transition">Privacy Policy</Link>
          <Link to="/products" className="hover:text-orange-600 transition">Products</Link>

          {/* CART */}
          <Link to="/cart" className="hover:text-orange-600 transition flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25h10.5l1.644-7.978a1.125 1.125 0 00-1.097-1.347H5.106m0 0L4.125 3.75M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm8.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Cart
          </Link>

          {/* ADMIN LINK */}
          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-orange-600 transition">
              Admin
            </Link>
          )}

          {/* AUTH BUTTONS */}
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm shadow-md transition"
            >
              Logout
            </button>
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

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md border-t animate-slide-down">
          <div className="flex flex-col p-4 text-gray-700 gap-4 font-medium">

            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/faqs" onClick={() => setMenuOpen(false)}>FAQs</Link>
            <Link to="/returns" onClick={() => setMenuOpen(false)}>Returns</Link>
            <Link to="/privacypolicy" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>

            {user?.role === "admin" && (
              <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                >
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
