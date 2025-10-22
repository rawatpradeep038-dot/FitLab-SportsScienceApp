# FitLab Pro 💪



A comprehensive fitness tracking and sports information web application built with React. FitLab Pro helps users track their workouts, manage injuries, learn about different sports, stay updated with global sporting events, and calculate important fitness metrics.


## 🌟 Features

### 1. **Workout Tracking**
- Log various types of workouts (Running, Cycling, Swimming, Weightlifting, etc.)
- Track duration, intensity, and calories burned
- Automatic calorie calculation based on MET values
- Add personal notes to workouts
- View workout history with detailed cards

### 2. **Performance Dashboard**
- Visual analytics with interactive charts (Recharts)
- Track total workouts, calories burned, and workout streaks
- 7-day activity trends and statistics
- Progress visualization with line and bar charts
- Badge/achievement system

### 3. **Injury & Recovery Tracker**
- Log injuries with type, body part, and severity
- Track recovery progress with visual indicators
- Get personalized recovery tips and recommendations
- Safe exercise suggestions based on injury type
- Monitor active injuries and healing status

### 4. **Sports Encyclopedia**
- Comprehensive information about major sports
- Details on rules, positions, equipment, and gameplay
- Expandable cards with in-depth information
- Coverage of Basketball, Soccer, Tennis, Cricket, and more

### 5. **Global Sports Events**
- Stay updated on major international sporting events
- Event details including dates, locations, and participants
- Filter by status (upcoming, ongoing, past)

### 6. **Fitness Calculators**
- **BMI Calculator**: Calculate Body Mass Index with category classification
- **BMR & TDEE Calculator**: Calculate Basal Metabolic Rate and Total Daily Energy Expenditure
- **Calorie Goal Calculator**: Personalized calorie recommendations based on fitness goals
- **Macro Calculator**: Suggested protein, carbs, and fat intake

### 7. **Badge & Achievement System**
- Earn badges for workout streaks and milestones
- Track progress toward next achievements
- Visual badge display with earned/unearned indicators

## 🚀 Technologies Used

- **React** - Frontend framework
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization and charts
- **Lucide React** - Icon library
- **Context API** - State management
- **Local Storage** - Data persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
  ![FitLab Pro Demo](fitlab-pro/ezgif.com-video-to-gif-converter%20(1).gif)
   cd fitlab-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎬 Demo

![FitLab Pro Demo](fitlab-pro/ezgif.com-video-to-gif-converter (1).gif)

*Complete workflow showing all major features in action*

## 🏗️ Project Structure

```
fitlab-pro/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Badge.jsx
│   │   ├── EventCard.jsx
│   │   ├── InjuryCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── SportCard.jsx
│   │   └── WorkoutCard.jsx
│   ├── context/
│   │   └── FitLabContext.jsx
│   ├── data/
│   │   ├── badgesData.json
│   │   ├── eventsData.json
│   │   └── sportsData.json
│   ├── pages/
│   │   ├── AddWorkout.jsx
│   │   ├── Calculator.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── InjuryLog.jsx
│   │   ├── SportsEncyclopedia.jsx
│   │   └── SportsEvents.jsx
│   ├── utils/
│   │   ├── bmrCalc.js
│   │   ├── calorieCalc.js
│   │   ├── dateUtils.js
│   │   ├── recoveryUtils.js
│   │   └── storageUtils.js
│   ├── App.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
└── package.json
```

## 🎯 Key Components

### Context Provider (`FitLabContext`)
Central state management for:
- Workouts and workout operations
- Injuries and injury tracking
- Medical records
- User settings
- Badge achievements
- Local storage persistence

### Utility Functions

**Calorie Calculations** (`calorieCalc.js`)
- MET-based calorie burn calculations
- Support for 20+ workout types
- Intensity multipliers (low, medium, high)

**BMR/TDEE Calculations** (`bmrCalc.js`)
- Mifflin-St Jeor equation for BMR
- Activity level multipliers
- Macro nutrient recommendations

**Recovery Utilities** (`recoveryUtils.js`)
- Recovery progress tracking
- Injury status assessment
- Personalized recovery tips
- Safe exercise recommendations

## 💾 Data Persistence

All user data is stored in browser's Local Storage:
- Workouts
- Injuries
- Medical records
- Earned badges
- User settings (weight, height, age, gender)

## 🎨 Styling

The application uses **Tailwind CSS** with a custom color scheme:
- Primary color: Sky blue (`primary-600`)
- Responsive design with mobile-first approach
- Custom scrollbar styling
- Smooth transitions and animations

## 📊 Features in Detail

### Workout Intensity Levels
- **Low**: 70% of base MET value
- **Medium**: 100% of base MET value
- **High**: 130% of base MET value

### Injury Severity Classifications
- **Mild**: 7-day expected recovery
- **Moderate**: 21-day expected recovery
- **Severe**: 60-day expected recovery

### Badge System
- Workout streak badges
- Total workout milestones
- Calorie burn achievements
- Automatic badge awarding

## 🔮 Future Enhancements

- User authentication and cloud sync
- Social features (share workouts, challenges)
- Workout plans and programs
- Nutrition tracking
- Integration with fitness wearables
- Export data functionality
- Dark mode toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For any queries or suggestions, feel free to reach out:

**Pradeep Singh Rawat**
- LinkedIn: [pradeepsinghrawat038](https://www.linkedin.com/in/pradeepsinghrawat038)
- GitHub: [rawatpradeep038-dot](https://github.com/rawatpradeep038-dot)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Pradeep Singh Rawat**


Created with ❤️ and dedication to fitness enthusiasts worldwide!

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev)
- Charts by [Recharts](https://recharts.org)
- Styling by [Tailwind CSS](https://tailwindcss.com)

---

**Happy Training! 🏋️‍♂️🏃‍♀️**
