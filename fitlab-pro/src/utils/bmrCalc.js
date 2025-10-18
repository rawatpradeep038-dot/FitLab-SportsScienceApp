// BMR (Basal Metabolic Rate) and related calculations

export const calculateBMR = (weight, height, age, gender) => {
  let bmr;
  
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
  
  return Math.round(bmr);
};

export const calculateTDEE = (bmr, activityLevel) => {
  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very_active': 1.9
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
};

export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(1));
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: 'blue' };
  if (bmi < 25) return { category: 'Normal weight', color: 'green' };
  if (bmi < 30) return { category: 'Overweight', color: 'yellow' };
  return { category: 'Obese', color: 'red' };
};

export const calculateCalorieGoal = (tdee, goal) => {
  const adjustments = {
    'lose': -500,
    'maintain': 0,
    'gain': 500
  };
  
  return tdee + (adjustments[goal] || 0);
};

export const calculateMacros = (calories, distribution = 'balanced') => {
  const distributions = {
    'balanced': { protein: 0.30, carbs: 0.40, fat: 0.30 },
    'high_protein': { protein: 0.40, carbs: 0.30, fat: 0.30 },
    'low_carb': { protein: 0.35, carbs: 0.20, fat: 0.45 },
    'high_carb': { protein: 0.20, carbs: 0.55, fat: 0.25 }
  };
  
  const dist = distributions[distribution] || distributions['balanced'];
  
  return {
    protein: Math.round((calories * dist.protein) / 4),
    carbs: Math.round((calories * dist.carbs) / 4),
    fat: Math.round((calories * dist.fat) / 9)
  };
};