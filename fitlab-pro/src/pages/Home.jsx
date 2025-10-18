import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, TrendingUp, Heart, Trophy, BookOpen, Calendar, Calculator } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: 'Workout Tracking',
      description: 'Log and monitor your workouts with detailed metrics and progress charts.',
      link: '/add-workout'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Injury Management',
      description: 'Track injuries, recovery progress, and get personalized recovery tips.',
      link: '/injury-log'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Performance Dashboard',
      description: 'Visualize your progress with interactive charts and statistics.',
      link: '/dashboard'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Sports Encyclopedia',
      description: 'Learn about different sports, rules, positions, and equipment.',
      link: '/encyclopedia'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Sports Events',
      description: 'Stay updated with major sporting events around the world.',
      link: '/events'
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: 'Fitness Calculators',
      description: 'Calculate BMI, BMR, TDEE, and track your fitness metrics.',
      link: '/calculator'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-600 p-4 rounded-full">
              <Trophy className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">FitLab Pro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your all-in-one fitness companion for tracking workouts, managing injuries, 
            learning about sports, and achieving your fitness goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/encyclopedia"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-primary-600"
            >
              Explore Sports
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need to Excel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-primary-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-primary-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">6+</div>
              <div className="text-primary-100">Sports Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-primary-100">Badges to Earn</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-primary-100">Global Events</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Fitness Journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Start tracking your workouts, learning new sports, and achieving your goals today.
        </p>
        <Link
          to="/add-workout"
          className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
        >
          Log Your First Workout
        </Link>
      </div>
    </div>
  );
};

export default Home;