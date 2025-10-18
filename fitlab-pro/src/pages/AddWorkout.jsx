import React, { useState } from 'react';
import { useFitLab } from '../context/FitLabContext';
import { Plus, List } from 'lucide-react';
import { getWorkoutTypes } from '../utils/calorieCalc';
import { getInputDate } from '../utils/dateUtils';
import WorkoutCard from '../components/WorkoutCard';

const AddWorkout = () => {
  const { workouts, addWorkout, deleteWorkout } = useFitLab();

  const [formData, setFormData] = useState({
    type: 'Running',
    duration: '',
    intensity: 'medium',
    date: getInputDate(),
    notes: ''
  });

  const workoutTypes = getWorkoutTypes();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.type || !formData.duration) {
      alert('Please fill in all required fields');
      return;
    }

    addWorkout({
      type: formData.type,
      duration: parseInt(formData.duration),
      intensity: formData.intensity,
      date: formData.date,
      notes: formData.notes
    });

    setFormData({
      type: 'Running',
      duration: '',
      intensity: 'medium',
      date: getInputDate(),
      notes: ''
    });

    alert('Workout added successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Workout Tracker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <Plus className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Log New Workout</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workout Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {workoutTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  max="500"
                  placeholder="e.g., 30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, intensity: level })}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.intensity === level
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={getInputDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How did you feel? Any observations..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Log Workout
              </button>
            </form>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <List className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Recent Workouts</h2>
              </div>
              <span className="text-sm text-gray-500">{workouts.length} total</span>
            </div>

            {workouts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No workouts logged yet. Add your first workout!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {workouts.slice(0, 10).map(workout => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onDelete={deleteWorkout}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkout;