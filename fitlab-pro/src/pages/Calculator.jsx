import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { calculateBMI, getBMICategory, calculateBMR, calculateTDEE, calculateCalorieGoal, calculateMacros } from '../utils/bmrCalc';

const Calculator = () => {
  const [activeCalc, setActiveCalc] = useState('bmi');
  const [bmiData, setBmiData] = useState({ weight: '', height: '' });
  const [bmrData, setBmrData] = useState({ weight: '', height: '', age: '', gender: 'male' });
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');

  const [bmiResult, setBmiResult] = useState(null);
  const [bmrResult, setBmrResult] = useState(null);

  const calculateBMIResult = (e) => {
    e.preventDefault();
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height);

    if (weight && height) {
      const bmi = calculateBMI(weight, height);
      const category = getBMICategory(bmi);
      setBmiResult({ bmi, ...category });
    }
  };

  const calculateBMRResult = (e) => {
    e.preventDefault();
    const weight = parseFloat(bmrData.weight);
    const height = parseFloat(bmrData.height);
    const age = parseInt(bmrData.age);

    if (weight && height && age) {
      const bmr = calculateBMR(weight, height, age, bmrData.gender);
      const tdee = calculateTDEE(bmr, activityLevel);
      const calorieGoal = calculateCalorieGoal(tdee, goal);
      const macros = calculateMacros(calorieGoal);

      setBmrResult({ bmr, tdee, calorieGoal, macros });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <CalcIcon className="h-10 w-10 text-primary-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Fitness Calculators</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Calculate your BMI, BMR, TDEE, and get personalized nutrition recommendations.
        </p>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveCalc('bmi')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeCalc === 'bmi'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              BMI Calculator
            </button>
            <button
              onClick={() => setActiveCalc('bmr')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeCalc === 'bmr'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              BMR & TDEE Calculator
            </button>
          </div>

          <div className="p-6">
            {activeCalc === 'bmi' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Body Mass Index (BMI)</h2>
                <p className="text-gray-600 mb-6">
                  BMI is a measure of body fat based on height and weight.
                </p>

                <form onSubmit={calculateBMIResult} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={bmiData.weight}
                      onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                      placeholder="e.g., 70"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={bmiData.height}
                      onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                      placeholder="e.g., 170"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
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

                {bmiResult && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Your Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">BMI:</span>
                        <span className="text-3xl font-bold text-primary-600">{bmiResult.bmi}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Category:</span>
                        <span className="text-lg font-semibold">{bmiResult.category}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeCalc === 'bmr' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Basal Metabolic Rate & Daily Calorie Needs
                </h2>
                <p className="text-gray-600 mb-6">
                  Calculate your BMR and TDEE for personalized nutrition.
                </p>

                <form onSubmit={calculateBMRResult} className="space-y-4 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={bmrData.weight}
                        onChange={(e) => setBmrData({ ...bmrData, weight: e.target.value })}
                        placeholder="70"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={bmrData.height}
                        onChange={(e) => setBmrData({ ...bmrData, height: e.target.value })}
                        placeholder="170"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={bmrData.age}
                        onChange={(e) => setBmrData({ ...bmrData, age: e.target.value })}
                        placeholder="25"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={bmrData.gender}
                        onChange={(e) => setBmrData({ ...bmrData, gender: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Level
                    </label>
                    <select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="sedentary">Sedentary (little or no exercise)</option>
                      <option value="light">Light (exercise 1-3 days/week)</option>
                      <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                      <option value="active">Active (exercise 6-7 days/week)</option>
                      <option value="very_active">Very Active (hard exercise daily)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="lose">Lose Weight</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="gain">Gain Weight</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700"
                  >
                    Calculate
                  </button>
                </form>

                {bmrResult && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Your Results</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">BMR</p>
                        <p className="text-2xl font-bold text-primary-600">{bmrResult.bmr}</p>
                        <p className="text-xs text-gray-500">cal/day at rest</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">TDEE</p>
                        <p className="text-2xl font-bold text-green-600">{bmrResult.tdee}</p>
                        <p className="text-xs text-gray-500">cal/day to maintain</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Goal Calories</p>
                        <p className="text-2xl font-bold text-orange-600">{bmrResult.calorieGoal}</p>
                        <p className="text-xs text-gray-500">cal/day for goal</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Recommended Macros</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Protein</p>
                          <p className="text-xl font-bold text-red-600">{bmrResult.macros.protein}g</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Carbs</p>
                          <p className="text-xl font-bold text-blue-600">{bmrResult.macros.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Fat</p>
                          <p className="text-xl font-bold text-yellow-600">{bmrResult.macros.fat}g</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;