// import React from "react";

// export default function InvoiceModal({ isOpen, onClose, items, total }) {
//   if (!isOpen) return null;

//   // Generate Order ID
//   const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);

//   // Date
//   const date = new Date().toLocaleString();

//   // Print Invoice
//   const handlePrint = () => {
//     const printContent = document.getElementById("invoice-content").innerHTML;
//     const originalContent = document.body.innerHTML;

//     document.body.innerHTML = printContent;
//     window.print();
//     document.body.innerHTML = originalContent;
//     window.location.reload();
//   };

//   // Download Invoice as PDF (Chrome auto converts print to PDF)
//   const handleDownloadPDF = () => {
//     handlePrint();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg w-[420px]">

//         {/* Invoice Content for Print */}
//         <div id="invoice-content">

//           <h2 className="text-xl font-bold mb-2 text-center">🧾 INVOICE</h2>

//           <div className="text-sm text-gray-600 mb-3">
//             <div>Order ID: <b>{orderId}</b></div>
//             <div>Date: <b>{date}</b></div>
//           </div>

//           {/* Items */}
//           <div className="space-y-2 max-h-60 overflow-y-auto border-t border-b py-3">
//             {items.map((it) => (
//               <div key={it.product._id} className="flex justify-between">
//                 <span>{it.product.name} x {it.quantity}</span>
//                 <span>₹{it.product.price * it.quantity}</span>
//               </div>
//             ))}
//           </div>

//           {/* Total */}
//           <div className="text-lg font-bold mt-4">
//             Total: ₹{total}
//           </div>

//         </div>

//         {/* Buttons */}
//         <div className="mt-4 flex flex-col gap-2">
//           <button
//             onClick={handlePrint}
//             className="w-full bg-green-600 text-white py-2 rounded"
//           >
//             Print Invoice
//           </button>

//           <button
//             onClick={handleDownloadPDF}
//             className="w-full bg-purple-600 text-white py-2 rounded"
//           >
//             Download PDF
//           </button>

//           <button
//             onClick={onClose}
//             className="w-full bg-gray-700 text-white py-2 rounded"
//           >
//             Close
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function InvoiceModal({ isOpen, onClose, items, total }) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [codDetails, setCodDetails] = useState({
    streetAddress: "",
    city: "",
    country: "Pakistan",
    zipCode: "",
    phone: ""
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  // Generate Order ID
  const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
  
  // Date
  const date = new Date().toLocaleDateString("en-IN", {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  // Calculate totals
  const gst = total * 0.18;
  const shipping = total > 1000 ? 0 : 50;
  const codCharge = paymentMethod === "cod" ? 20 : 0;
  const grandTotal = total + gst + shipping + codCharge;

  // Handle input changes
  const handleCodChange = (e) => {
    const { name, value } = e.target;
    setCodDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format card number
  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  // Format expiry date
  const formatExpiry = (value) => {
    return value.replace(/^([1-9]\/|[2-9])$/g, '0$1/')
      .replace(/^(0[1-9]|1[0-2])$/g, '$1/')
      .replace(/^([0-9]{2})$/g, '$1/')
      .replace(/^([0-9]{2})\/([0-9]{2})$/g, '$1/$2');
  };

  // FIXED: Print Invoice (without reload bug)
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${orderId}</title>
        <style>
          body {
            font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            color: #1f2937;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }
          .invoice-header {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .invoice-header h1 {
            margin: 0;
            font-size: 36px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .invoice-header .subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin-top: 8px;
          }
          .company-info {
            background: #f8fafc;
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
          }
          .invoice-details {
            padding: 30px;
          }
          .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }
          .detail-card {
            background: #f9fafb;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #4f46e5;
          }
          .detail-card h3 {
            margin-top: 0;
            color: #374151;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px dashed #e5e7eb;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          .items-table th {
            background: #4f46e5;
            color: white;
            padding: 16px;
            text-align: left;
            font-weight: 600;
          }
          .items-table td {
            padding: 16px;
            border-bottom: 1px solid #e5e7eb;
          }
          .items-table tr:hover {
            background: #f9fafb;
          }
          .summary-card {
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #bae6fd;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 16px;
          }
          .grand-total {
            font-size: 24px;
            font-weight: 800;
            color: #1e40af;
            border-top: 2px solid #93c5fd;
            padding-top: 16px;
            margin-top: 16px;
          }
          .invoice-footer {
            text-align: center;
            padding: 25px;
            background: #f8fafc;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .stamp {
            float: right;
            margin-top: 30px;
            border: 3px solid #10b981;
            padding: 15px 25px;
            transform: rotate(10deg);
            border-radius: 8px;
            color: #10b981;
            font-weight: 800;
            font-size: 20px;
            background: white;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
            .invoice-container {
              box-shadow: none;
              border: 1px solid #ddd;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <h1>INVOICE</h1>
            <div class="subtitle">Order #${orderId} | ${date} ${time}</div>
          </div>
          
          <div class="company-info">
            <div>
              <strong>MyStore Pvt. Ltd.</strong><br>
              123 Business Street, Lahore<br>
              Pakistan | +92 300 1234567<br>
              support@mystore.com
            </div>
            <div>
              <strong>Bill To:</strong><br>
              ${paymentMethod === "cod" ? codDetails.streetAddress || "Customer" : "Customer"}<br>
              ${paymentMethod === "cod" ? codDetails.city || "N/A" : "Online Order"}<br>
              ${paymentMethod === "cod" ? codDetails.country || "Pakistan" : ""}
            </div>
          </div>
          
          <div class="invoice-details">
            <div class="detail-grid">
              <div class="detail-card">
                <h3>📋 Invoice Details</h3>
                <div class="detail-row">
                  <span>Invoice #:</span>
                  <strong>${orderId}</strong>
                </div>
                <div class="detail-row">
                  <span>Date:</span>
                  <span>${date}</span>
                </div>
                <div class="detail-row">
                  <span>Time:</span>
                  <span>${time}</span>
                </div>
                <div class="detail-row">
                  <span>Status:</span>
                  <span style="color: #10b981; font-weight: 600;">PAID</span>
                </div>
              </div>
              
              <div class="detail-card">
                <h3>🚚 Shipping Details</h3>
                <div class="detail-row">
                  <span>Method:</span>
                  <span>Standard Delivery</span>
                </div>
                <div class="detail-row">
                  <span>Estimated:</span>
                  <span>3-5 Business Days</span>
                </div>
                <div class="detail-row">
                  <span>Payment:</span>
                  <span>${paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card"}</span>
                </div>
              </div>
            </div>
            
            <table class="items-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Description</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((it, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>
                      <strong>${it.product?.name || "Product"}</strong><br>
                      <small style="color: #6b7280;">${it.product?.description?.slice(0, 60) || ""}...</small>
                    </td>
                    <td>₹${it.product?.price || 0}</td>
                    <td>${it.quantity || 1}</td>
                    <td><strong>₹${(it.product?.price || 0) * (it.quantity || 1)}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="stamp">
              PAID
            </div>
            
            <div class="summary-card">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${total.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>GST (18%):</span>
                <span>₹${gst.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping > 0 ? `₹${shipping.toFixed(2)}` : 'FREE'}</span>
              </div>
              ${paymentMethod === "cod" ? `
                <div class="summary-row">
                  <span>COD Charge:</span>
                  <span>₹20.00</span>
                </div>
              ` : ''}
              <div class="summary-row grand-total">
                <span>GRAND TOTAL:</span>
                <span>₹${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div class="invoice-footer">
            <p><strong>Thank you for your business!</strong></p>
            <p>For any queries, contact us at: support@mystore.com | +92 300 1234567</p>
            <p>Terms: Goods sold are not returnable unless defective. Delivery within 3-5 business days.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Invoice generated on ${new Date().toLocaleString()}</p>
          </div>
        </div>
        
        <div class="no-print" style="text-align: center; margin-top: 30px; padding: 20px;">
          <button onclick="window.print()" style="background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; margin-right: 10px;">
            🖨️ Print Invoice
          </button>
          <button onclick="window.close()" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer;">
            Close Window
          </button>
          <p style="color: #6b7280; margin-top: 15px; font-size: 14px;">Click "Print Invoice" to print or save as PDF</p>
        </div>
        
        <script>
          // Auto focus print dialog
          setTimeout(() => {
            window.print();
          }, 500);
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (paymentMethod === "cod") {
      if (!codDetails.streetAddress || !codDetails.city || !codDetails.zipCode || !codDetails.phone) {
        alert("Please fill all COD delivery details");
        return;
      }
    }
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        alert("Please fill all card details");
        return;
      }
    }
    
    // Success message
    alert(`✅ Order placed successfully!\n📦 Order ID: ${orderId}\n💰 Total: ₹${grandTotal.toFixed(2)}`);
    
    // Print invoice
    handlePrint();
    
    // Close modal after a delay
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div>
            <h2 className="text-2xl font-bold">Checkout & Invoice</h2>
            <p className="text-gray-300 text-sm">Order #{orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl transition"
          >
            &times;
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="p-2 bg-blue-100 rounded-lg">💳</span>
              Select Payment Method
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* COD Card */}
              <div 
                className={`cursor-pointer rounded-xl border-2 transition-all duration-300 ${paymentMethod === "cod" ? "border-green-500 ring-2 ring-green-200" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className={`p-5 ${paymentMethod === "cod" ? "bg-green-50" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${paymentMethod === "cod" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-lg text-gray-800">Cash on Delivery</h4>
                        {paymentMethod === "cod" && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">Selected</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">Pay when you receive your order</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-green-600 font-semibold">+ ₹20 COD charge</span>
                        <span className="text-gray-500 text-sm">• 3-5 days delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credit Card */}
              <div 
                className={`cursor-pointer rounded-xl border-2 transition-all duration-300 ${paymentMethod === "card" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className={`p-5 ${paymentMethod === "card" ? "bg-blue-50" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${paymentMethod === "card" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                      <span className="text-2xl">💳</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-lg text-gray-800">Credit/Debit Card</h4>
                        {paymentMethod === "card" && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">Selected</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">Pay now securely</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-blue-600 font-semibold">5% cashback</span>
                        <span className="text-gray-500 text-sm">• Instant confirmation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COD Address Form */}
            {paymentMethod === "cod" && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="p-2 bg-green-100 rounded-lg">📍</span>
                  Delivery Address for COD
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={codDetails.streetAddress}
                      onChange={handleCodChange}
                      placeholder="House #123, Street #4, Area"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={codDetails.city}
                      onChange={handleCodChange}
                      placeholder="Lahore"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      name="country"
                      value={codDetails.country}
                      onChange={handleCodChange}
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={codDetails.zipCode}
                      onChange={handleCodChange}
                      placeholder="54000"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={codDetails.phone}
                      onChange={handleCodChange}
                      placeholder="+92 300 1234567"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6 p-3 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-green-800 font-medium">Delivery within 3-5 business days to this address</span>
                </div>
              </div>
            )}

            {/* Card Details Form */}
            {paymentMethod === "card" && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="p-2 bg-blue-100 rounded-lg">🔒</span>
                  Secure Card Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formatCardNumber(cardDetails.cardNumber)}
                      onChange={handleCardChange}
                      maxLength="19"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formatExpiry(cardDetails.expiry)}
                      onChange={handleCardChange}
                      maxLength="5"
                      placeholder="MM/YY"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      maxLength="3"
                      placeholder="123"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6 p-3 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-xl">🔐</span>
                  <span className="text-blue-800 font-medium">Secure payment with 256-bit SSL encryption</span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-purple-100 rounded-lg">📊</span>
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Subtotal ({items.length} items)</span>
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-semibold text-green-600">+ ₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className={`font-semibold ${shipping > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {shipping > 0 ? `+ ₹${shipping.toFixed(2)}` : 'FREE'}
                </span>
              </div>
              {paymentMethod === "cod" && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">COD Charge</span>
                  <span className="font-semibold text-orange-600">+ ₹20.00</span>
                </div>
              )}
              <div className="h-px bg-gray-300 my-2"></div>
              <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-gray-300">
                <span className="text-gray-800">Total Amount</span>
                <span className="text-purple-700">₹{grandTotal.toFixed(2)}</span>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{paymentMethod === "cod" ? "💰" : "💳"}</span>
                  <div>
                    <div className="font-medium">Payment: <span className={paymentMethod === "cod" ? "text-green-600" : "text-blue-600"}>{paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card"}</span></div>
                    <div className="text-sm text-gray-600 mt-1">
                      {paymentMethod === "cod" ? "Pay when you receive the order" : "Pay now securely"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="text-2xl">✅</span>
                CONFIRM ORDER & GENERATE INVOICE
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                CANCEL
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-sm mt-4">
            {paymentMethod === "cod" 
              ? "✅ Pay ₹{grandTotal.toFixed(2)} when you receive your order" 
              : "💳 Your card will be charged ₹{grandTotal.toFixed(2)} securely"}
          </p>
        </div>

      </div>
    </div>
  );
}