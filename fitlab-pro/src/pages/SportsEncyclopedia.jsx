import React from 'react';
import { BookOpen } from 'lucide-react';

const SportsEncyclopedia = () => {
  const sports = [
    { id: 1, name: 'Basketball', players: '5v5', category: 'Team Sports' },
    { id: 2, name: 'Soccer', players: '11v11', category: 'Team Sports' },
    { id: 3, name: 'Tennis', players: '1v1', category: 'Individual Sports' },
    { id: 4, name: 'Cricket', players: '11v11', category: 'Team Sports' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <BookOpen className="h-10 w-10 text-primary-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Sports Encyclopedia</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sports.map(sport => (
            <div key={sport.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{sport.name}</h3>
              <p className="text-gray-600">Players: {sport.players}</p>
              <p className="text-gray-600">Category: {sport.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsEncyclopedia;