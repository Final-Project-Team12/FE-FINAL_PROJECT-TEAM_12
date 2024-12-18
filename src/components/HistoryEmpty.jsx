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
              src=""
              alt="Empty History"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-xl font-medium mb-2">No Transactions Found</h2>
            <p className="text-gray-500">
              You haven't made any transactions yet. When you do, they will
              appear here.
            </p>
          </div>
        ) : (
          <div>Transactions found</div>
        )}
      </div>
    </>
  );
};

export default HistoryEmpty;
