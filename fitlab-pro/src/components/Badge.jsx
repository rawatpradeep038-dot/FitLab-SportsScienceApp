import React from 'react';
import { Award } from 'lucide-react';

const Badge = ({ badge, earned = false }) => {
  return (
    <div 
      className={`relative p-4 rounded-lg border-2 transition-all ${
        earned 
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-400 shadow-md'
          : 'bg-gray-50 border-gray-300 opacity-60'
      }`}
    >
      {earned && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
          <Award className="h-4 w-4" />
        </div>
      )}
      
      <div className="text-center">
        <div className="text-4xl mb-2">{badge.icon}</div>
        <h4 className="font-bold text-gray-800 text-sm mb-1">{badge.name}</h4>
        <p className="text-xs text-gray-600">{badge.description}</p>
        {!earned && (
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Requirement: {badge.requirement}
          </p>
        )}
      </div>
    </div>
  );
};

export default Badge;