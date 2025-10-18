import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCalories } from '../utils/calorieCalc';
import badgesDataJson from '../data/badgesData.json';

const FitLabContext = createContext();

export const useFitLab = () => {
  const context = useContext(FitLabContext);
  if (!context) {
    throw new Error('useFitLab must be used within FitLabProvider');
  }
  return context;
};

export const FitLabProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [injuries, setInjuries] = useState([]);
  const [medical, setMedical] = useState({});
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [settings, setSettings] = useState({
    theme: 'light',
    weight: 70,
    height: 170,
    age: 25,
    gender: 'male'
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    const savedInjuries = localStorage.getItem('injuries');
    const savedMedical = localStorage.getItem('medical');
    const savedBadges = localStorage.getItem('badges');
    const savedSettings = localStorage.getItem('settings');

    if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts));
    if (savedInjuries) setInjuries(JSON.parse(savedInjuries));
    if (savedMedical) setMedical(JSON.parse(savedMedical));
    if (savedBadges) setEarnedBadges(JSON.parse(savedBadges));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Save workouts to localStorage
  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
    checkAndAwardBadges();
  }, [workouts]);

  // Save injuries to localStorage
  useEffect(() => {
    localStorage.setItem('injuries', JSON.stringify(injuries));
  }, [injuries]);

  // Save medical to localStorage
  useEffect(() => {
    localStorage.setItem('medical', JSON.stringify(medical));
  }, [medical]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  // Add workout
  const addWorkout = (workout) => {
    const newWorkout = {
      id: Date.now(),
      ...workout,
      date: workout.date || new Date().toISOString(),
      calories: workout.calories || calculateCalories(
        workout.type,
        workout.duration,
        settings.weight,
        workout.intensity
      )
    };
    setWorkouts(prev => [newWorkout, ...prev]);
  };

  // Delete workout
  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  // Update workout
  const updateWorkout = (id, updatedData) => {
    setWorkouts(prev => prev.map(w => 
      w.id === id ? { ...w, ...updatedData } : w
    ));
  };

  // Add injury
  const addInjury = (injury) => {
    const newInjury = {
      id: Date.now(),
      ...injury,
      date: injury.date || new Date().toISOString()
    };
    setInjuries(prev => [newInjury, ...prev]);
  };

  // Delete injury
  const deleteInjury = (id) => {
    setInjuries(prev => prev.filter(i => i.id !== id));
  };

  // Update medical records
  const updateMedical = (data) => {
    setMedical(prev => ({ ...prev, ...data }));
  };

  // Update settings
  const updateSettings = (data) => {
    setSettings(prev => ({ ...prev, ...data }));
  };

  // Check and award badges
  const checkAndAwardBadges = () => {
    const newBadges = [];

    // Check workout streaks
    const streak = calculateWorkoutStreak();
    badgesDataJson.filter(b => b.type === 'workout_streak').forEach(badge => {
      if (streak >= badge.requirement && !earnedBadges.includes(badge.id)) {
        newBadges.push(badge.id);
      }
    });

    // Check total workouts
    badgesDataJson.filter(b => b.type === 'total_workouts').forEach(badge => {
      if (workouts.length >= badge.requirement && !earnedBadges.includes(badge.id)) {
        newBadges.push(badge.id);
      }
    });

    // Check total calories
    const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    badgesDataJson.filter(b => b.type === 'total_calories').forEach(badge => {
      if (totalCalories >= badge.requirement && !earnedBadges.includes(badge.id)) {
        newBadges.push(badge.id);
      }
    });

    if (newBadges.length > 0) {
      const updatedBadges = [...earnedBadges, ...newBadges];
      setEarnedBadges(updatedBadges);
      localStorage.setItem('badges', JSON.stringify(updatedBadges));
    }
  };

  // Calculate workout streak
  const calculateWorkoutStreak = () => {
    if (workouts.length === 0) return 0;

    const sortedWorkouts = [...workouts].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const workout of sortedWorkouts) {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((currentDate - workoutDate) / (1000 * 60 * 60 * 24));

      if (diffDays === streak) {
        streak++;
        currentDate = workoutDate;
      } else if (diffDays > streak) {
        break;
      }
    }

    return streak;
  };

  const value = {
    workouts,
    injuries,
    medical,
    earnedBadges,
    settings,
    addWorkout,
    deleteWorkout,
    updateWorkout,
    addInjury,
    deleteInjury,
    updateMedical,
    updateSettings,
    calculateWorkoutStreak
  };

  return (
    <FitLabContext.Provider value={value}>
      {children}
    </FitLabContext.Provider>
  );
};