// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// export default function Admin() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: "", description: "", price: "", category: "", image: "" });

//   const fetchAll = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data.products || res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { fetchAll(); }, []);

//   const submitCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/products", {
//         name: form.name,
//         description: form.description,
//         price: Number(form.price),
//         category: form.category,
//         image: form.image
//       });
//       setForm({ name: "", description: "", price: "", category: "", image: "" });
//       fetchAll();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating product");
//     }
//   };

//   const toggleFeatured = async (id) => {
//     try {
//       await api.patch(`/products/${id}`);
//       fetchAll();
//     } catch (err) { console.error(err); }
//   };

//   const deleteProduct = async (id) => {
//     if (!confirm("Delete product?")) return;
//     try {
//       await api.delete(`/products/${id}`);
//       fetchAll();
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* CREATE PRODUCT FORM */}
//         <form onSubmit={submitCreate} className="space-y-4 border p-6 rounded-xl shadow-lg bg-white">
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">Create New Product</h2>

//           <input
//             value={form.name}
//             onChange={(e)=>setForm({...form, name:e.target.value})}
//             placeholder="Product Name"
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//           />

//           <input
//             value={form.price}
//             onChange={(e)=>setForm({...form, price:e.target.value})}
//             placeholder="Price"
//             type="number"
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//           />

//           <input
//             value={form.category}
//             onChange={(e)=>setForm({...form, category:e.target.value})}
//             placeholder="Category"
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//           />

//           <textarea
//             value={form.description}
//             onChange={(e)=>setForm({...form, description:e.target.value})}
//             placeholder="Description"
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//           />

//           <input
//             value={form.image}
//             onChange={(e)=>setForm({...form, image:e.target.value})}
//             placeholder="Image URL or Base64"
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//           />

//           <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold shadow-md transition transform hover:scale-105">
//             Create Product
//           </button>
//         </form>

//         {/* PRODUCTS LIST */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
//           <div className="space-y-4">
//             {products.map(p => (
//               <div key={p._id} className="flex flex-col sm:flex-row items-center justify-between border rounded-xl p-4 bg-white shadow hover:shadow-xl transition">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={p.image || "https://via.placeholder.com/80"}
//                     alt={p.name}
//                     className="w-20 h-20 object-cover rounded-lg border"
//                   />
//                   <div>
//                     <div className="font-semibold text-gray-800">{p.name}</div>
//                     <div className="text-sm text-gray-500">₹{p.price} • {p.category}</div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 mt-3 sm:mt-0">
//                   <button
//                     onClick={() => toggleFeatured(p._id)}
//                     className={`px-3 py-1 rounded-lg border ${p.isFeatured ? "bg-yellow-400 text-white" : "hover:bg-yellow-200"} transition`}
//                   >
//                     {p.isFeatured ? "Featured" : "Feature"}
//                   </button>
//                   <button
//                     onClick={() => deleteProduct(p._id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", image: "" });

  // Define valid categories (same as backend)
  const VALID_CATEGORIES = ["dry-fruits", "nuts", "chocolates", "seeds", "Raisins", "Herbs", "Dry Fruits Gift Box", "GB-special"];

  const fetchAll = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const submitCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        image: form.image
      });
      setForm({ name: "", description: "", price: "", category: "", image: "" });
      fetchAll();
    } catch (err) {
      // Show specific error message from backend
      const errorMsg = err.response?.data?.message || "Error creating product";
      alert(errorMsg);
    }
  };

  const toggleFeatured = async (id) => {
    try {
      await api.patch(`/products/${id}`);
      fetchAll();
    } catch (err) { console.error(err); }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchAll();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CREATE PRODUCT FORM */}
        <form onSubmit={submitCreate} className="space-y-4 border p-6 rounded-xl shadow-lg bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Create New Product</h2>

          <input
            value={form.name}
            onChange={(e)=>setForm({...form, name:e.target.value})}
            placeholder="Product Name"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            value={form.price}
            onChange={(e)=>setForm({...form, price:e.target.value})}
            placeholder="Price"
            type="number"
            required
            min="0"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          {/* ===== CHANGED: DROPDOWN INSTEAD OF TEXT INPUT ===== */}
          <select
            value={form.category}
            onChange={(e)=>setForm({...form, category:e.target.value})}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="">Select Category</option>
            {VALID_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {/* =================================================== */}

          <textarea
            value={form.description}
            onChange={(e)=>setForm({...form, description:e.target.value})}
            placeholder="Description"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            value={form.image}
            onChange={(e)=>setForm({...form, image:e.target.value})}
            placeholder="Image URL or Base64"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold shadow-md transition transform hover:scale-105">
            Create Product
          </button>
        </form>

        {/* PRODUCTS LIST */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          <div className="space-y-4">
            {products.map(p => (
              <div key={p._id} className="flex flex-col sm:flex-row items-center justify-between border rounded-xl p-4 bg-white shadow hover:shadow-xl transition">
                <div className="flex items-center gap-4">
                  <img
                    src={p.image || "https://via.placeholder.com/80"}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{p.name}</div>
                    <div className="text-sm text-gray-500">₹{p.price} • {p.category}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => toggleFeatured(p._id)}
                    className={`px-3 py-1 rounded-lg border ${p.isFeatured ? "bg-yellow-400 text-white" : "hover:bg-yellow-200"} transition`}
                  >
                    {p.isFeatured ? "Featured" : "Feature"}
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}