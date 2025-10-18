// Calorie calculation utilities

// MET (Metabolic Equivalent of Task) values for different activities
const MET_VALUES = {
  'Running': 9.8,
  'Cycling': 7.5,
  'Swimming': 8.0,
  'Walking': 3.5,
  'Weightlifting': 6.0,
  'Yoga': 3.0,
  'Basketball': 8.0,
  'Soccer': 10.0,
  'Tennis': 7.3,
  'Badminton': 5.5,
  'Volleyball': 4.0,
  'Cricket': 4.8,
  'HIIT': 12.0,
  'Stretching': 2.3,
  'Dancing': 6.0,
  'Boxing': 12.8,
  'Rowing': 6.0,
  'Pilates': 3.0,
  'CrossFit': 10.0,
  'Jump Rope': 12.0,
  'Other': 5.0
};

// Calculate calories burned using MET formula
export const calculateCalories = (workoutType, duration, weight = 70, intensity = 'medium') => {
  let met = MET_VALUES[workoutType] || 5.0;
  
  const intensityMultiplier = {
    'low': 0.7,
    'medium': 1.0,
    'high': 1.3
  };
  
  met *= intensityMultiplier[intensity] || 1.0;
  const hours = duration / 60;
  const calories = Math.round(met * weight * hours);
  
  return calories;
};

export const getWorkoutTypes = () => {
  return Object.keys(MET_VALUES);
};

export const calculateTotalCalories = (workouts) => {
  return workouts.reduce((total, workout) => {
    return total + (workout.calories || 0);
  }, 0);
};

export const calculateAverageCalories = (workouts) => {
  if (workouts.length === 0) return 0;
  const total = calculateTotalCalories(workouts);
  return Math.round(total / workouts.length);
};

export const getCalorieStats = (workouts, days = 7) => {
  const now = new Date();
  const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  
  const recentWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= startDate;
  });
  
  return {
    total: calculateTotalCalories(recentWorkouts),
    average: calculateAverageCalories(recentWorkouts),
    count: recentWorkouts.length,
    dailyAverage: recentWorkouts.length > 0 
      ? Math.round(calculateTotalCalories(recentWorkouts) / days)
      : 0
  };
};