import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Features from "../components/Features";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// import Recommended from "../components/Recommended";

// ✅ Categories (Top Section)
const categories = [
  { name: "Dry Fruits", slug: "dry-fruits", image: "/images (6).jfif" },
  { name: "Nuts", slug: "nuts", image: "/images (7).jfif" },
  { name: "Chocolates", slug: "chocolates", image: "/images (8).jfif" },
  { name: "Seeds", slug: "seeds", image: "/download (7).jfif" },
  { name: "Raisins", slug: "Raisins", image: "/yellow-kishmish-1.jpg" },
  { name: "Herbs", slug: "Herbs", image: "/Untitled-design-23-350x443.jpg" },
  { name: "Dry Fruits Gift Box", slug: "Dry Fruits Gift Box", image: "/gift-box-dryfruits.jpg (1).webp" },
  { name: "GB-special", slug: "GB-special", image: "/gilgit-baltistan-pure-shilajit.jpg (2).webp" },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  // const [recommended, setRecommended] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  // 🟦 Load products by category
  const loadCategoryProducts = async (slug) => {
    try {
      const res = await api.get(`/products/category/${slug}`);
      setCategoryProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🛒 Add to cart
  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId });
      alert("Added to cart");
    } catch (err) {
      alert("Please login or try again.");
    }
  };

  return (
    <div className="w-full">

      
     {/* ------------------ HERO SECTION (SWIPER) ------------------ */}
<div className="relative w-full h-[400px] sm:h-[500px]">

<Swiper
  modules={[Autoplay, EffectFade]}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop={true}
  effect="fade"
  className="w-full h-full"
>
  {/* Slide 1 */}
  <SwiperSlide>
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image.png')" }}
      ></div>

      {/* OPACITY LAYER */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  </SwiperSlide>

  {/* Slide 2 */}
  <SwiperSlide>
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images (6).jfif')" }}
      ></div>

      {/* OPACITY LAYER */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  </SwiperSlide>

  {/* Slide 3 */}
  <SwiperSlide>
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/download (7).jfif')" }}
      ></div>

      {/* OPACITY LAYER */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  </SwiperSlide>
</Swiper>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>

  {/* Text Content */}
  <div className=" absolute inset-0 flex flex-col items-center py-3 px-4 text-center z-10 ">
    <h1 className="text-3xl sm:text-6xl font-extrabold text-white drop-shadow-xl  w-200">
      The Real Taste of <span className="text-orange-400">GB</span> in Every Bite
    </h1>

    <p className="mt-3 text-lg sm:text-xl text-white font-medium drop-shadow-lg max-w-2xl">
      Shop 100% natural, fresh, and handpicked dry fruits — delivered across Pakistan with love!
    </p>

    <Link to={"/products"}>
      <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105">
        All Products
      </button>
    </Link>
  </div>
</div>

      {/* MAIN CONTAINER */}
      <div className="container mx-auto px-4 py-8">

        {/* ------------------ CATEGORY SECTION ------------------ */}
        <h1 className="text-5xl font-bold mb-6 text-center">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 mb-10  h-490 text-2xl font-bold">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => loadCategoryProducts(cat.slug)}
              className="cursor-pointer bg-white shadow hover:shadow-lg rounded-xl overflow-hidden transition"
            >
              <img src={cat.image} className="w-full h-100 object-cover rounded-xl" />
              <div className="p-3 text-center font-semibold">{cat.name}</div>
            </div>
          ))}
        </div>

        {/* ------------------ CATEGORY PRODUCTS ------------------ */}
        {categoryProducts.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Showing Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {categoryProducts.map((p) => (
                <ProductCard key={p._id} product={p} onAdd={addToCart} />
              ))}
            </div>
          </>
        )}


        {/* FEATURED PRODUCTS */}
        <main className="container mx-auto px-4 py-8">


          <Features />
          <section className="py-6">
            {/* <h1 className="text-3xl font-bold mb-4">Featured</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.length ? (
              featured.map((p) => (
                <ProductCard key={p._id} product={p} onAdd={addToCart} />
              ))
            ) : (
              <p>No featured products</p>
            )}
          </div> */}
          </section>

        </main>
        {/* ------------------ FEATURED PRODUCTS ------------------ */}
        {/* <h1 className="text-3xl font-bold mb-4">Featured</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.length ? (
            featured.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={addToCart} />
            ))
          ) : (
            <p>No featured products</p>
          )}
        </div> */}

        {/* ------------------ RECOMMENDED PRODUCTS ------------------ */}


        {/* <Recommended /> */}
      </div>
    </div>
  );
}
