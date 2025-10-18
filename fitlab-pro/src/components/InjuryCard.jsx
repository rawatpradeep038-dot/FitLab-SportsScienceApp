import React from 'react';
import { Trash2, AlertCircle, MapPin } from 'lucide-react';
import { formatDateShort } from '../utils/dateUtils';
import { getInjuryStatus, getRecoveryProgress, getDaysSinceInjury } from '../utils/recoveryUtils';

const InjuryCard = ({ injury, onDelete }) => {
  const severityColors = {
    mild: 'bg-yellow-100 text-yellow-800',
    moderate: 'bg-orange-100 text-orange-800',
    severe: 'bg-red-100 text-red-800'
  };

  const status = getInjuryStatus(injury.date, injury.severity);
  const progress = getRecoveryProgress(injury.date, injury.severity);
  const daysSince = getDaysSinceInjury(injury.date);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{injury.type}</h3>
          <p className="text-sm text-gray-500">{formatDateShort(injury.date)} ({daysSince} days ago)</p>
        </div>
        <button
          onClick={() => onDelete(injury.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete injury"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">{injury.bodyPart}</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${severityColors[injury.severity]}`}>
            {injury.severity}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Recovery Status:</span>
            <span className="font-semibold">{status.status}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-right">{progress}% recovered</p>
        </div>

        {injury.notes && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm text-gray-700">{injury.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InjuryCard;