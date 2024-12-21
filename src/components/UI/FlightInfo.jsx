import React from 'react';
import { formatDate, formatTime } from '../../utils/orderUtils';

const FlightInfo = ({ type, time, terminal, className = '' }) => {
  return (
    <div className={`flex justify-between ${className}`}>
      <div className="flex flex-col">
        <div>
          <p className="font-bold">{time ? formatTime(time) : '-'}</p>
        </div>
        <div>
          <p className="text-sm">{time ? formatDate(time) : '-'}</p>
        </div>
        {terminal && (
          <div>
            <p className="font-medium text-sm">Terminal {terminal}</p>
          </div>
        )}
      </div>
      <div>
        <p className="text-purple-500 font-bold text-sm">
          {type === 'departure' ? 'Keberangkatan' : 'Kedatangan'}
        </p>
      </div>
    </div>
  );
};

export default FlightInfo;
