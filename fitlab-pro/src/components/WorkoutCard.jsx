import React from 'react';
import { Trash2, Clock, Activity, Flame } from 'lucide-react';
import { formatDateShort } from '../utils/dateUtils';

const WorkoutCard = ({ workout, onDelete }) => {
  const intensityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{workout.type}</h3>
          <p className="text-sm text-gray-500">{formatDateShort(workout.date)}</p>
        </div>
        <button
          onClick={() => onDelete(workout.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete workout"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary-600" />
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-semibold">{workout.duration} min</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary-600" />
          <div>
            <p className="text-xs text-gray-500">Intensity</p>
            <span className={`text-xs px-2 py-1 rounded-full ${intensityColors[workout.intensity]}`}>
              {workout.intensity}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs text-gray-500">Calories</p>
            <p className="text-sm font-semibold">{workout.calories} kcal</p>
          </div>
        </div>
      </div>

      {workout.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{workout.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;