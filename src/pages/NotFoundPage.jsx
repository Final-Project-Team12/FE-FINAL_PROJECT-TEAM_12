import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../../public/images/NotFound.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* NotFound Image */}
        <div className="flex justify-center">
          <img
            src={NotFoundImage}
            alt="Page Not Found"
            className="w-96 h-96 object-contain"
          />
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Sorry, page not found
          </h1>
          <p className="text-xl text-purple-600">Try another destination!</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
