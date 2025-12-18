import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="relative bg-orange-500 text-white py-24 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
          About GB Dry Fruits
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl font-light drop-shadow-md">
          Bringing the finest, handpicked dry fruits to your doorstep — fresh, natural, and full of flavor!
        </p>
      </div>

      {/* MISSION SECTION */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center leading-relaxed">
          At GB Dry Fruits, our mission is to provide fresh and natural dry fruits that taste great, support a healthy lifestyle, and are delivered safely across Pakistan. </p>
      </div>

      {/* WHY CHOOSE US */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 grid sm:grid-cols-3 gap-10 text-center">
          <div className="p-6 shadow rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2 text-orange-500">Fresh & Natural</h3>
            <p className="text-gray-600">All our dry fruits are handpicked and 100% natural without preservatives.</p>
          </div>
          <div className="p-6 shadow rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2 text-orange-500">Nationwide Delivery</h3>
            <p className="text-gray-600">We deliver fresh products across Pakistan, ensuring they reach you in perfect condition.</p>
          </div>
          <div className="p-6 shadow rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2 text-orange-500">Premium Quality</h3>
            <p className="text-gray-600">Only the best quality dry fruits make it to your table. Quality is our top priority.</p>
          </div>
        </div>
      </div>

      {/* STATS / NUMBERS */}
      <div className="bg-orange-50 py-16">
        <div className="container mx-auto px-4 grid sm:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-4xl font-bold text-orange-500">500+</h3>
            <p className="text-gray-700 mt-2">Satisfied Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-500">200+</h3>
            <p className="text-gray-700 mt-2">Products Sold</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-500">10+</h3>
            <p className="text-gray-700 mt-2">Years of Experience</p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="py-16 flex flex-col items-center text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
          Ready to Taste the Difference?
        </h2>
        <p className="max-w-2xl text-gray-600 mb-6">
          Explore our wide range of fresh and natural dry fruits, delivered directly to your home.
        </p>
        <Link
          to="/products"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
        >
          Shop Now
        </Link>
      </div>

    </div>
  );
}
