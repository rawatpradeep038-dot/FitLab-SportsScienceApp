import React, { useState } from 'react';
import { Users, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const SportCard = ({ sport }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{sport.name}</h3>
            <span className="inline-block mt-1 px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
              {sport.category}
            </span>
          </div>
        </div>

        <div className="flex space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{sport.players}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{sport.duration}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{sport.howToPlay}</p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
        >
          <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4 pt-4 border-t">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Equipment Needed:</h4>
              <ul className="grid grid-cols-2 gap-2">
                {sport.equipment.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Basic Rules:</h4>
              <ul className="space-y-2">
                {sport.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                    <span className="font-semibold text-primary-600 mt-0.5">{index + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {sport.positions && sport.positions.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Positions:</h4>
                <div className="space-y-2">
                  {sport.positions.map((position, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-800">{position.name}</p>
                      <p className="text-sm text-gray-600">{position.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportCard;