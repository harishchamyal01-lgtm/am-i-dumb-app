import React, { useState, useEffect } from 'react';
import { Smile, TrendingUp, Award, RotateCcw, Brain, Sparkles, Heart } from 'lucide-react';

export default function AmIDumbApp() {
  const [count, setCount] = useState(0);
  const [totalAllTime, setTotalAllTime] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [dumbLevel, setDumbLevel] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('dumbCount') || '0');
    const savedTotal = parseInt(localStorage.getItem('dumbTotalAllTime') || '0');
    setCount(savedCount);
    setTotalAllTime(savedTotal);
  }, []);

  // Save data whenever count changes
  useEffect(() => {
    localStorage.setItem('dumbCount', count.toString());
    localStorage.setItem('dumbTotalAllTime', totalAllTime.toString());
    updateDumbLevel(count);
  }, [count, totalAllTime]);

  const motivationalMessages = [
    "Every mistake is a step towards brilliance! 🌟",
    "You're not dumb, you're just collecting life experiences! 😄",
    "Einstein made mistakes too! Keep going! 🧠",
    "Oops moments make the best stories! 📖",
    "You're learning and growing with every silly moment! 🌱",
    "Perfection is boring, embrace the chaos! 🎉",
    "Your silly moments make life fun! 💫",
    "Being human is about making mistakes - you're doing great! ❤️",
    "Smart people do silly things all the time! 🎓",
    "You're building character, one oops at a time! 💪",
    "Life's too short to be serious all the time! 😊",
    "Your mistakes today are your wisdom tomorrow! 🌈",
    "Embrace the silly, celebrate the you! 🎊",
    "Nobody's perfect, and that's what makes you special! ✨",
    "Laughing at yourself is a sign of intelligence! 😂"
  ];

  const dumbLevels = [
    { max: 5, title: '🌟 Genius in Disguise', color: 'text-green-600', bg: 'bg-green-50' },
    { max: 10, title: '😊 Perfectly Human', color: 'text-blue-600', bg: 'bg-blue-50' },
    { max: 20, title: '🎭 Comedy Gold', color: 'text-purple-600', bg: 'bg-purple-50' },
    { max: 50, title: '🎪 Life of the Party', color: 'text-pink-600', bg: 'bg-pink-50' },
    { max: 100, title: '🌈 Living Your Best Life', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { max: Infinity, title: '👑 Legendary Spirit', color: 'text-red-600', bg: 'bg-red-50' }
  ];

  const updateDumbLevel = (currentCount) => {
    const level = dumbLevels.find(l => currentCount <= l.max);
    setDumbLevel(level);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTotalAllTime(totalAllTime + 1);
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMotivationalMessage(randomMessage);
    
    // Show confetti effect
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const handleReset = () => {
    if (window.confirm('Reset your daily dumb score? (All-time total will be preserved)')) {
      setCount(0);
      setMotivationalMessage("Fresh start! Remember, you're amazing! 💖");
    }
  };

  const shareScore = () => {
    const text = `My Dumb Score today is ${count}! I'm a ${dumbLevel?.title}! 😄 #AmIDumb #EmbraceTheSilly`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard! 📋');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Am I Dumb?</h1>
          </div>
          <p className="text-gray-600 italic">Track your silly moments with joy! 😊</p>
        </div>

        {/* Main Counter Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 relative overflow-hidden">
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-400 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Current Level Badge */}
          {dumbLevel && (
            <div className={`${dumbLevel.bg} ${dumbLevel.color} rounded-full px-6 py-3 mb-6 text-center font-bold text-lg`}>
              {dumbLevel.title}
            </div>
          )}

          {/* Counter Display */}
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">Today's Dumb Score</p>
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {count}
            </div>
          </div>

          {/* Big Counter Button */}
          <button
            onClick={handleIncrement}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-2xl font-bold py-6 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95 mb-4"
          >
            I Did Something Silly! 😅
          </button>

          {/* Motivational Message */}
          {motivationalMessage && (
            <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-xl p-4 text-center animate-pulse">
              <p className="text-gray-700 font-medium">{motivationalMessage}</p>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Your Journey
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Today's Score</p>
              <p className="text-3xl font-bold text-blue-600">{count}</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">All-Time Total</p>
              <p className="text-3xl font-bold text-purple-600">{totalAllTime}</p>
            </div>
          </div>

          <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-gray-700 text-sm font-medium">
                Average silliness: {totalAllTime > 0 ? (totalAllTime / Math.max(1, Math.ceil(totalAllTime / 10))).toFixed(1) : 0} per day
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleReset}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl shadow-lg flex items-center justify-center transition"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset Day
          </button>
          
          <button
            onClick={shareScore}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 rounded-xl shadow-lg flex items-center justify-center transition"
          >
            <Smile className="w-5 h-5 mr-2" />
            Share Score
          </button>
        </div>

        {/* Happiness Quote */}
        <div className="bg-gradient-to-r from-yellow-200 to-pink-200 rounded-2xl p-6 text-center shadow-xl">
          <p className="text-gray-800 font-medium text-lg mb-2">
            "Intelligence is knowing you made a mistake. Wisdom is laughing about it!"
          </p>
          <p className="text-gray-600 text-sm">Keep smiling, keep growing! 🌈</p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-gray-600 text-sm">
            Remember: You're not dumb, you're wonderfully human! ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
