import React, { useState } from 'react';
import { FitLabProvider } from './context/FitLabContext';
import { Dumbbell } from 'lucide-react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddWorkout from './pages/AddWorkout';
import InjuryLog from './pages/InjuryLog';
import SportsEncyclopedia from './pages/SportsEncyclopedia';
import SportsEvents from './pages/SportsEvents';
import Calculator from './pages/Calculator';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const pages = {
    home: <Home />,
    dashboard: <Dashboard />,
    'add-workout': <AddWorkout />,
    'injury-log': <InjuryLog />,
    encyclopedia: <SportsEncyclopedia />,
    events: <SportsEvents />,
    calculator: <Calculator />
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'add-workout', label: 'Add Workout' },
    { id: 'encyclopedia', label: 'Encyclopedia' },
    { id: 'events', label: 'Events' },
    { id: 'calculator', label: 'Calculator' }
  ];

  return (
    <FitLabProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2" onClick={() => setCurrentPage('home')} style={{cursor: 'pointer'}}>
                <Dumbbell className="h-8 w-8 text-primary-600" />
                <span className="text-2xl font-bold text-gray-800">
                  FitLab <span className="text-primary-600">Pro</span>
                </span>
              </div>

              <div className="flex space-x-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setCurrentPage(link.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === link.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        {pages[currentPage]}
      </div>
    </FitLabProvider>
  );
}

export default App;