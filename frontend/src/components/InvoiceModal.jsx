import React from "react";

export default function InvoiceModal({ isOpen, onClose, items, total }) {
  if (!isOpen) return null;

  // Generate Order ID
  const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);

  // Date
  const date = new Date().toLocaleString();

  // Print Invoice
  const handlePrint = () => {
    const printContent = document.getElementById("invoice-content").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Download Invoice as PDF (Chrome auto converts print to PDF)
  const handleDownloadPDF = () => {
    handlePrint();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[420px]">

        {/* Invoice Content for Print */}
        <div id="invoice-content">

          <h2 className="text-xl font-bold mb-2 text-center">🧾 INVOICE</h2>

          <div className="text-sm text-gray-600 mb-3">
            <div>Order ID: <b>{orderId}</b></div>
            <div>Date: <b>{date}</b></div>
          </div>

          {/* Items */}
          <div className="space-y-2 max-h-60 overflow-y-auto border-t border-b py-3">
            {items.map((it) => (
              <div key={it.product._id} className="flex justify-between">
                <span>{it.product.name} x {it.quantity}</span>
                <span>₹{it.product.price * it.quantity}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="text-lg font-bold mt-4">
            Total: ₹{total}
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={handlePrint}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Print Invoice
          </button>

          <button
            onClick={handleDownloadPDF}
            className="w-full bg-purple-600 text-white py-2 rounded"
          >
            Download PDF
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white py-2 rounded"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
