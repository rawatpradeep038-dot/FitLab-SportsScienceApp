import React from 'react';
import { Calendar } from 'lucide-react';

const SportsEvents = () => {
  const events = [
    { id: 1, name: 'FIFA World Cup 2026', sport: 'Soccer', location: 'USA, Canada, Mexico' },
    { id: 2, name: 'Summer Olympics 2028', sport: 'Multi-Sport', location: 'Los Angeles, USA' },
    { id: 3, name: 'NBA Finals 2025', sport: 'Basketball', location: 'USA' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Calendar className="h-10 w-10 text-primary-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Global Sports Events</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
              <p className="text-gray-600">Sport: {event.sport}</p>
              <p className="text-gray-600">Location: {event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsEvents;