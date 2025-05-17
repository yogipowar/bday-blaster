import React, { useEffect } from 'react';

const Confetti: React.FC = () => {
  useEffect(() => {
    // Create confetti container if it doesn't exist
    let confettiContainer = document.getElementById('confetti-container');
    
    if (!confettiContainer) {
      confettiContainer = document.createElement('div');
      confettiContainer.id = 'confetti-container';
      document.body.appendChild(confettiContainer);
      
      // Style the container
      confettiContainer.style.position = 'fixed';
      confettiContainer.style.top = '0';
      confettiContainer.style.left = '0';
      confettiContainer.style.width = '100%';
      confettiContainer.style.height = '100%';
      confettiContainer.style.pointerEvents = 'none';
      confettiContainer.style.zIndex = '1000';
    }
    
    // Generate confetti
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B72AA'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
      createConfettiPiece(confettiContainer, colors);
    }
    
    // Cleanup
    return () => {
      const pieces = document.querySelectorAll('.confetti-piece');
      pieces.forEach(piece => piece.remove());
    };
  }, []);
  
  const createConfettiPiece = (container: HTMLElement, colors: string[]) => {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    
    // Random properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const startLeft = Math.random() * 100;
    const startDelay = Math.random() * 3;
    const duration = Math.random() * 3 + 5;
    
    // Styles
    piece.style.position = 'absolute';
    piece.style.backgroundColor = color;
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
    piece.style.opacity = '0.8';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    piece.style.top = '-50px';
    piece.style.left = `${startLeft}%`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Animation
    piece.style.animation = `
      fall ${duration}s ease-in forwards,
      sway ${Math.random() * 2 + 3}s ease-in-out infinite alternate
    `;
    piece.style.animationDelay = `${startDelay}s`;
    
    container.appendChild(piece);
    
    // Remove after animation
    setTimeout(() => {
      piece.remove();
    }, (duration + startDelay) * 1000);
  };
  
  return (
    <style>
      {`
        @keyframes fall {
          to {
            top: 100vh;
            transform: rotate(720deg);
          }
        }
        
        @keyframes sway {
          from {
            margin-left: 0%;
          }
          to {
            margin-left: 10%;
          }
        }
      `}
    </style>
  );
};

export default Confetti;