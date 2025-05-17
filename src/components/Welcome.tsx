import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Confetti from '../utils/Confetti';

const Welcome: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleSurpriseClick = () => {
    setShowConfetti(true);
    
    // Play sound
    const audio = new Audio('/sounds/tada.mp3');
    audio.play().catch(e => console.log('Audio playback error:', e));

    // Navigate after animation
    setTimeout(() => {
      navigate('/wishes');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-purple-200 flex flex-col items-center justify-center text-center px-4">
      {showConfetti && <Confetti />}
      
      <div className="welcome-content max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6 animate-fadeIn">
          Hello <span className="text-pink-600">Shraddha</span>!
        </h1>
        
        <div className="welcome-message bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-6 shadow-xl mb-8">
          <p className="text-xl text-gray-700 mb-6">
            Welcome to your special day celebration!
          </p>
          
          <button 
            onClick={handleSurpriseClick}
            className="surprise-button bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center mx-auto"
          >
            <Sparkles className="mr-2" size={20} />
            Click for a Surprise!
          </button>
        </div>
        
        <div className="text-sm text-gray-600 mt-4 animate-pulse">
          A special celebration awaits...
        </div>
      </div>
    </div>
  );
};

export default Welcome;