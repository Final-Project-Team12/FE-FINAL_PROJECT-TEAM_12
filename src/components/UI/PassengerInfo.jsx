import React from 'react';

const PassengerInfo = ({ tickets, plane, seat, airline }) => {
  return (
    <div className="flex flex-start">
      <div className="h-10 flex justify-center p-2">
        <img
          className=""
          src={airline?.image_url}
          alt={`${airline?.name} logo`}
        />
      </div>
      <div className="flex flex-col">
        <div>
          <p className="font-bold">
            {airline?.airline_name || '-'} - {seat?.class || '-'}
          </p>
          <p className="font-bold">{plane?.plane_code || '-'}</p>
        </div>
        <div className="pt-4">
          <p className="font-bold text-sm">Informasi:</p>
          {tickets.map((ticket, index) => (
            <div key={ticket.ticket_id} className="flex flex-col">
              <div className="flex flex-row text-purple-800">
                <span className="font-regular text-sm">
                  {`Penumpang ${index + 1}: `}&nbsp;
                </span>
                <p className="font-regular text-sm">
                  {`${ticket.passenger.title} ${ticket.passenger.full_name}`}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  ID: <span>{ticket.passenger.id_number}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
