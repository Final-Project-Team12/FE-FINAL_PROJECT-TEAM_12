import React from 'react';
import Navbar from '../components/UI/Navbar';
import HeaderHistory from '../components/UI/HeaderHistory';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import { useState, useEffect } from 'react';

const HistoryEmpty = () => {
  const [transactions, setTransactions] = useState([]);
  const { containerHeight } = useWindowDimensions();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = '1234';
        const transactionData = await getTransactionsByUserId(userId);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <HeaderHistory />
      <div
        className="flex justify-center items-center px-4 py-8"
        style={{ minHeight: `${containerHeight - 84}px` }}
      >
        {transactions.length === 0 ? (
          <div className="text-center">
            <img
              src="./images/Payment_Success.png"
              alt="Empty History"
              className="w-48 h-48 mx-auto mb-4"
            />
            <h2 className="text-sm text-purple-600 font-medium ">
              Oops! Riwayat pesanan kosong
            </h2>
            <p className="text-sm mb-4">
              Anda belum melakukan pemesanan penerbangan
            </p>
            <button className="w-full h-12 bg-purple-800 text-white px-4 py-2 rounded-lg">
              Cari Penerbangan
            </button>
          </div>
        ) : (
          <div>Transactions found</div>
        )}
      </div>
    </>
  );
};

export default HistoryEmpty;
