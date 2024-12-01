import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PaymentForm = ({ onPaymentSuccess }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSuccess();
  };

  return (
    <div className="w-full mx-auto border border-gray-300 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Isi Data Pembayaran</h2>

      <div className="space-y-4">
        <div className="rounded-lg overflow-hidden">
          <div
            className="p-4 cursor-pointer bg-[#3C3C3C] text-white flex justify-between items-center"
            onClick={() => toggleAccordion(0)}
          >
            <span className="text-lg">Gopay</span>
            {activeAccordion === 0 ? (
              <ChevronUp size={24} />
            ) : (
              <ChevronDown size={24} />
            )}
          </div>
          {activeAccordion === 0 && (
            <div className="p-4 border-x border-b border-gray-200">
              <p>Form Gopay akan ditampilkan di sini.</p>
            </div>
          )}
        </div>

        <div className="rounded-lg overflow-hidden">
          <div
            className="p-4 cursor-pointer bg-[#3C3C3C] text-white flex justify-between items-center"
            onClick={() => toggleAccordion(1)}
          >
            <span className="text-lg">Virtual Account</span>
            {activeAccordion === 1 ? (
              <ChevronUp size={24} />
            ) : (
              <ChevronDown size={24} />
            )}
          </div>
          {activeAccordion === 1 && (
            <div className="p-4 border-x border-b border-gray-200">
              <p>Form Virtual Account akan ditampilkan di sini.</p>
            </div>
          )}
        </div>

        {/* Credit Card Section */}
        <div className="rounded-lg overflow-hidden">
          <div
            className="p-4 cursor-pointer bg-[#7126B5] text-white flex justify-between items-center"
            onClick={() => toggleAccordion(2)}
          >
            <span className="text-lg">Credit Card</span>
            {activeAccordion === 2 ? (
              <ChevronUp size={24} />
            ) : (
              <ChevronDown size={24} />
            )}
          </div>
          {activeAccordion === 2 && (
            <div className="p-6 border-x border-b border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Card number
                  </label>
                  <input
                    type="text"
                    placeholder="4480 0000 0000 0000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Card holder name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-2">
                      Expiry date
                    </label>
                    <input
                      type="date"
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7126B5] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#8342C3] transition-colors mt-4"
                >
                  Bayar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
