import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    past: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white">{event.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}>
            {event.status}
          </span>
        </div>
        <p className="text-primary-100 text-sm mt-1">{event.sport}</p>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-start space-x-3">
          <Calendar className="h-5 w-5 text-primary-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-700">Date</p>
            <p className="text-sm text-gray-600">{event.date}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-700">Location</p>
            <p className="text-sm text-gray-600">{event.location}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-5 w-5 text-primary-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-700">Participants</p>
            <p className="text-sm text-gray-600">{event.participants}</p>
          </div>
        </div>

        <div className="pt-3 border-t">
          <p className="text-sm text-gray-700">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;