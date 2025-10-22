import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import sportsData from '../data/sportsData.json';
import SportCard from '../components/SportCard';

const SportsEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSports = sportsData.filter(sport => 
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <BookOpen className="h-10 w-10 text-primary-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Sports Encyclopedia</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search sports (e.g., Basketball, Soccer, Tennis)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Showing {filteredSports.length} of {sportsData.length} sports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSports.map(sport => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsEncyclopedia;