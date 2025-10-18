import React from 'react';
import { useFitLab } from '../context/FitLabContext';
import { Activity, Flame, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Badge from '../components/Badge';
import badgesData from '../data/badgesData.json';
import { getLastNDays, formatDateShort } from '../utils/dateUtils';
import { getCalorieStats } from '../utils/calorieCalc';

const Dashboard = () => {
  const { workouts, injuries, earnedBadges, calculateWorkoutStreak } = useFitLab();

  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  const activeInjuries = injuries.filter(inj => {
    const daysSince = Math.floor((new Date() - new Date(inj.date)) / (1000 * 60 * 60 * 24));
    return daysSince < 30;
  }).length;
  const currentStreak = calculateWorkoutStreak();

  const last7DaysStats = getCalorieStats(workouts, 7);

  const last7Days = getLastNDays(7);
  const chartData = last7Days.map(date => {
    const dayWorkouts = workouts.filter(w => {
      const workoutDate = new Date(w.date).toISOString().split('T')[0];
      return workoutDate === date;
    });
    
    const calories = dayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    const count = dayWorkouts.length;

    return {
      date: formatDateShort(date),
      calories,
      workouts: count
    };
  });

  const stats = [
    {
      icon: <Activity className="h-8 w-8" />,
      label: 'Total Workouts',
      value: totalWorkouts,
      color: 'bg-blue-500'
    },
    {
      icon: <Flame className="h-8 w-8" />,
      label: 'Calories Burned',
      value: `${totalCalories.toLocaleString()}`,
      color: 'bg-orange-500'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      label: 'Current Streak',
      value: `${currentStreak} days`,
      color: 'bg-green-500'
    },
    {
      icon: <AlertCircle className="h-8 w-8" />,
      label: 'Active Injuries',
      value: activeInjuries,
      color: 'bg-red-500'
    }
  ];

  const earnedBadgesList = badgesData.filter(badge => earnedBadges.includes(badge.id));
  const unearnedBadges = badgesData.filter(badge => !earnedBadges.includes(badge.id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Performance Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Calories Burned (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calories" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Workouts Per Day (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="workouts" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="h-8 w-8 text-yellow-500 mr-2" />
            Your Badges ({earnedBadges.length}/{badgesData.length})
          </h2>

          {earnedBadgesList.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Earned Badges</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                {earnedBadgesList.map(badge => (
                  <Badge key={badge.id} badge={badge} earned={true} />
                ))}
              </div>
            </div>
          )}

          {unearnedBadges.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Next Goals</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {unearnedBadges.map(badge => (
                  <Badge key={badge.id} badge={badge} earned={false} />
                ))}
              </div>
            </div>
          )}

          {earnedBadgesList.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Start working out to earn your first badge!</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Workouts</p>
              <p className="text-2xl font-bold text-gray-900">{last7DaysStats.count}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Calories</p>
              <p className="text-2xl font-bold text-gray-900">{last7DaysStats.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Daily Average</p>
              <p className="text-2xl font-bold text-gray-900">{last7DaysStats.dailyAverage.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;