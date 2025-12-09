import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-14 pb-8 mt-20">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">MyStore</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              High-quality products delivered to your door.
              Trusted by thousands of customers.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-5">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1HXTmqPYrE/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition"
              >
                <FaFacebookF size={18} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/shabbir_madhupuri_0080?igsh=MXFxaHg4czl5eTl4cQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
              >
                <FaInstagram size={18} />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-green-600 transition"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">FAQs</li>
              <li className="hover:text-white transition cursor-pointer">Shipping</li>
              <li className="hover:text-white transition cursor-pointer">Returns</li>
              <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@mystore.com</li>
              <li>Phone: +92 300 1234567</li>
              <li>Address: Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 my-10"></div>

        {/* Bottom */}
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
