import React from 'react';
import underpage from '@/assets/tech/underpage.svg';

const UnderConstruction = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <img src={underpage} className="w-48 h-48 mb-4" />
        <div className="bg-yellow-200 border-l-4 border-yellow-600 p-4 text-yellow-800 rounded shadow-md text-center">
          <h2 className="font-bold text-lg">Внимание!</h2>
          <p>Эта страница находится в процессе разработки.</p>
        </div>
        <p className="mt-4 text-gray-600">Мы работаем над этим!</p>
      </div>
    );
  };

export default UnderConstruction;