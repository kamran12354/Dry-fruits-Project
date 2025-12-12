import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md leading-relaxed">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-600">
          Your privacy is important to us. This policy outlines how we collect, use, and protect your
          information when you use our website or purchase our products.
        </p>
      </header>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p>We may collect the following information when you visit our website or place an order:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Full name</li>
            <li>Phone number and email address</li>
            <li>Shipping and billing address</li>
            <li>Order details and preferences</li>
            <li>Browser and device information (for analytics)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>To process and deliver your orders</li>
            <li>To improve website performance and user experience</li>
            <li>To send order updates or promotional messages (only if you opt‑in)</li>
            <li>To verify payments and prevent fraudulent activities</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Protection of Your Data</h2>
          <p>
            We use secure servers, encrypted connections, and industry‑standard security methods to protect
            your personal information from unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
          <p>We do <strong>not</strong> sell or trade your information. However, we may share it with:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Delivery partners (for shipping your order)</li>
            <li>Payment gateways (for processing payments)</li>
            <li>Law authorities (only if legally required)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Cookies & Tracking</h2>
          <p>
            Our website may use cookies to enhance user experience, remember preferences, and track website
            analytics. You can disable cookies anytime from your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Request deletion of your data</li>
            <li>Request correction of incorrect information</li>
            <li>Opt‑out of promotional messages</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Policy Updates</h2>
          <p>
            We may update this Privacy Policy occasionally. All updates will be posted on this page with a
            revised date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>If you have questions regarding this Privacy Policy, feel free to contact us:</p>
          <p className="mt-1">Email: <span className="text-emerald-600">support@dryfruitstore.com</span></p>
          <p>WhatsApp: <span className="text-emerald-600">+92‑300‑XXXXXXX</span></p>
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        We respect your privacy and are committed to protecting your personal data.
      </footer>
    </section>
  );
}
