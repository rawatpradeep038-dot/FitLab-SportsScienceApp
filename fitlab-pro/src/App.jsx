import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FitLabProvider } from './context/FitLabContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddWorkout from './pages/AddWorkout';
import InjuryLog from './pages/InjuryLog';
import SportsEncyclopedia from './pages/SportsEncyclopedia';
import SportsEvents from './pages/SportsEvents';
import Calculator from './pages/Calculator';

function App() {
  return (
    <FitLabProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-workout" element={<AddWorkout />} />
            <Route path="/injury-log" element={<InjuryLog />} />
            <Route path="/encyclopedia" element={<SportsEncyclopedia />} />
            <Route path="/events" element={<SportsEvents />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </div>
      </Router>
    </FitLabProvider>
  );
}

export default App;