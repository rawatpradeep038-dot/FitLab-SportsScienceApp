// Recovery and injury tracking utilities

export const getRecoveryTips = (injuryType, bodyPart, severity) => {
  const tips = {
    'Strain': {
      'mild': [
        'Rest for 24-48 hours',
        'Apply ice for 15-20 minutes every 2-3 hours',
        'Gentle stretching after 48 hours',
        'Gradually return to activity after 3-5 days'
      ],
      'moderate': [
        'Rest for 5-7 days',
        'Ice therapy for first 48 hours',
        'Compression bandage to reduce swelling',
        'Consult a physiotherapist'
      ],
      'severe': [
        'Complete rest for 2-3 weeks',
        'See a doctor immediately',
        'Physical therapy recommended'
      ]
    },
    'Sprain': {
      'mild': [
        'RICE protocol: Rest, Ice, Compression, Elevation',
        'Avoid weight-bearing for 24-48 hours',
        'Return to activity in 1-2 weeks'
      ],
      'moderate': [
        'Rest for 1-2 weeks',
        'Ice for first 48-72 hours',
        'Physical therapy after initial healing'
      ],
      'severe': [
        'Seek immediate medical attention',
        'May require immobilization',
        'Recovery may take 6-12 weeks'
      ]
    }
  };

  return tips[injuryType]?.[severity] || [
    'Consult a healthcare professional',
    'Rest the injured area',
    'Apply ice to reduce swelling'
  ];
};

export const getDaysSinceInjury = (injuryDate) => {
  const now = new Date();
  const injury = new Date(injuryDate);
  const diffTime = Math.abs(now - injury);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getRecoveryProgress = (injuryDate, severity) => {
  const days = getDaysSinceInjury(injuryDate);
  
  const expectedRecoveryDays = {
    'mild': 7,
    'moderate': 21,
    'severe': 60
  };
  
  const expected = expectedRecoveryDays[severity] || 14;
  const progress = Math.min((days / expected) * 100, 100);
  
  return Math.round(progress);
};

export const getInjuryStatus = (injuryDate, severity) => {
  const progress = getRecoveryProgress(injuryDate, severity);
  
  if (progress < 30) return { status: 'Acute', color: 'red' };
  if (progress < 70) return { status: 'Healing', color: 'yellow' };
  if (progress < 100) return { status: 'Recovery', color: 'blue' };
  return { status: 'Healed', color: 'green' };
};

export const getSafeExercises = (bodyPart, severity) => {
  if (severity === 'severe') {
    return ['Complete rest recommended', 'Consult healthcare provider'];
  }
  
  const exercises = {
    'Ankle': ['Upper body exercises', 'Swimming', 'Seated exercises'],
    'Knee': ['Upper body exercises', 'Swimming', 'Cycling (low resistance)'],
    'Back': ['Walking', 'Swimming', 'Gentle stretching'],
    'Shoulder': ['Lower body exercises', 'Walking', 'Light cardio']
  };
  
  return exercises[bodyPart] || ['Consult healthcare provider'];
};