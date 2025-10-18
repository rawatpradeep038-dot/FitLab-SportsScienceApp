// Date utility functions

export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
};

export const formatDateShort = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US');
};

export const getInputDate = (date = new Date()) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export const getDaysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getLastNDays = (n) => {
  const dates = [];
  const today = new Date();
  
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(getInputDate(date));
  }
  
  return dates;
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};