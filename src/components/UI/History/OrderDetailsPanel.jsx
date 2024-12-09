import React from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from '../OrderDetails/OrderDetails.module.css';

const OrderDetailsPanel = ({ selectedCard, containerHeight }) => {
  return (
    <div
      className={styles.orderDetailsContainer}
      style={{
        maxHeight: `${containerHeight - 20}px`,
        overflow: 'auto',
      }}
    >
      {selectedCard ? (
        <OrderDetails
          className={styles.orderDetailsContainer}
          selectedCard={selectedCard}
        />
      ) : (
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <p className="text-center text-gray-500 text-lg">
            Select a flight to view details
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPanel;
