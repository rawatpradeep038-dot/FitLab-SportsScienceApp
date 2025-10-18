import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

const Calculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const result = (w / (h * h)).toFixed(1);
    setBmi(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <CalcIcon className="h-10 w-10 text-primary-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">BMI Calculator</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={calculateBMI} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700"
            >
              Calculate BMI
            </button>
          </form>

          {bmi && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your BMI</h3>
              <p className="text-4xl font-bold text-primary-600">{bmi}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;