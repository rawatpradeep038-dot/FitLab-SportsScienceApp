import React, { useState } from 'react';
import { useFitLab } from '../context/FitLabContext';
import { AlertCircle, Plus } from 'lucide-react';
import { getInputDate } from '../utils/dateUtils';
import { getRecoveryTips, getSafeExercises } from '../utils/recoveryUtils';
import InjuryCard from '../components/InjuryCard';

const InjuryLog = () => {
  const { injuries, addInjury, deleteInjury } = useFitLab();

  const [formData, setFormData] = useState({
    type: 'Strain',
    bodyPart: 'Knee',
    severity: 'mild',
    date: getInputDate(),
    notes: ''
  });

  const [showTips, setShowTips] = useState(false);

  const injuryTypes = ['Strain', 'Sprain', 'Fracture', 'Tendonitis', 'Bruise', 'Other'];
  const bodyParts = [
    'Ankle', 'Knee', 'Hip', 'Back', 'Shoulder', 'Elbow', 'Wrist', 
    'Neck', 'Hamstring', 'Quadriceps', 'Calf', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.type || !formData.bodyPart) {
      alert('Please fill in all required fields');
      return;
    }

    addInjury({
      type: formData.type,
      bodyPart: formData.bodyPart,
      severity: formData.severity,
      date: formData.date,
      notes: formData.notes
    });

    setFormData({
      type: 'Strain',
      bodyPart: 'Knee',
      severity: 'mild',
      date: getInputDate(),
      notes: ''
    });

    setShowTips(false);
    alert('Injury logged successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setShowTips(false);
  };

  const recoveryTips = getRecoveryTips(formData.type, formData.bodyPart, formData.severity);
  const safeExercises = getSafeExercises(formData.bodyPart, formData.severity);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Injury & Recovery Tracker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <Plus className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Log Injury</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Injury Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  {injuryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Part *
                </label>
                <select
                  name="bodyPart"
                  value={formData.bodyPart}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  {bodyParts.map(part => (
                    <option key={part} value={part}>{part}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['mild', 'moderate', 'severe'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: level })}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.severity === level
                          ? 'bg-red-600 text-white'
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
                  Date of Injury
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={getInputDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  placeholder="How did the injury occur? Any symptoms..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {showTips ? 'Hide Recovery Tips' : 'Show Recovery Tips'}
              </button>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Log Injury
              </button>
            </form>

            {showTips && (
              <div className="mt-6 space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Recovery Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {recoveryTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-blue-800">
                        <span className="font-semibold mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Safe Exercises</h3>
                  <ul className="space-y-2">
                    {safeExercises.map((exercise, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-green-800">
                        <span className="font-semibold mt-0.5">•</span>
                        <span>{exercise}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Injury History</h2>
              <span className="text-sm text-gray-500">{injuries.length} total</span>
            </div>

            {injuries.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No injuries logged. Stay safe!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                {injuries.map(injury => (
                  <InjuryCard
                    key={injury.id}
                    injury={injury}
                    onDelete={deleteInjury}
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

export default InjuryLog;