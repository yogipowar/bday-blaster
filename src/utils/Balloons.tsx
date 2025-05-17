import React, { useEffect } from 'react';

const Balloons: React.FC = () => {
  useEffect(() => {
    // Create balloons container
    let balloonsContainer = document.getElementById('balloons-container');
    
    if (!balloonsContainer) {
      balloonsContainer = document.createElement('div');
      balloonsContainer.id = 'balloons-container';
      document.body.appendChild(balloonsContainer);
      
      // Style the container
      balloonsContainer.style.position = 'fixed';
      balloonsContainer.style.bottom = '0';
      balloonsContainer.style.width = '100%';
      balloonsContainer.style.height = '100%';
      balloonsContainer.style.pointerEvents = 'none';
      balloonsContainer.style.zIndex = '5';
    }
    
    // Generate balloons from both sides
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B72AA', '#FF9999', '#FFCCFF'];
    const balloonCount = 12; // 6 from each side
    
    // Left side balloons
    for (let i = 0; i < balloonCount / 2; i++) {
      createBalloon(balloonsContainer, colors, 'left');
    }
    
    // Right side balloons
    for (let i = 0; i < balloonCount / 2; i++) {
      createBalloon(balloonsContainer, colors, 'right');
    }
    
    // Cleanup
    return () => {
      const balloons = document.querySelectorAll('.balloon');
      balloons.forEach(balloon => balloon.remove());
    };
  }, []);
  
  const createBalloon = (container: HTMLElement, colors: string[], side: 'left' | 'right') => {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // Random properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 40 + 40; // 40-80px
    const startDelay = Math.random() * 5;
    const duration = Math.random() * 5 + 10; // 10-15s
    
    // Start position
    const startPos = side === 'left' ? -100 : 100;
    const endHPos = 10 + Math.random() * 80; // End horizontal position
    
    // Styles
    balloon.style.position = 'absolute';
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.2}px`;
    balloon.style.borderRadius = '50% 50% 50% 50% / 40% 40% 60% 60%';
    balloon.style.backgroundColor = color;
    balloon.style.bottom = `${-size}px`;
    balloon.style.left = side === 'left' ? '10%' : '80%'; 
    balloon.style.opacity = '0.8';
    balloon.style.transform = `translateX(${startPos}px)`;
    
    // Add string to balloon
    const string = document.createElement('div');
    string.className = 'balloon-string';
    string.style.position = 'absolute';
    string.style.width = '1px';
    string.style.height = `${size * 0.6}px`;
    string.style.backgroundColor = '#FFFFFF';
    string.style.bottom = `${-size * 0.6}px`;
    string.style.left = '50%';
    string.style.transformOrigin = 'top';
    
    balloon.appendChild(string);
    
    // Animation
    balloon.style.animation = `
      float-${side} ${duration}s ease-out forwards,
      sway-balloon 3s ease-in-out infinite alternate
    `;
    balloon.style.animationDelay = `${startDelay}s`;
    
    container.appendChild(balloon);
    
    // Remove after animation
    setTimeout(() => {
      balloon.remove();
    }, (duration + startDelay) * 1000);
  };
  
  return (
    <style>
      {`
        @keyframes float-left {
          0% {
            transform: translateX(-100px);
            bottom: -100px;
          }
          100% {
            transform: translateX(30vw);
            bottom: 120vh;
          }
        }
        
        @keyframes float-right {
          0% {
            transform: translateX(100px);
            bottom: -100px;
          }
          100% {
            transform: translateX(-30vw);
            bottom: 120vh;
          }
        }
        
        @keyframes sway-balloon {
          0% {
            transform: rotate(-5deg);
          }
          100% {
            transform: rotate(5deg);
          }
        }
        
        .balloon::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: inherit;
          bottom: -5px;
          left: calc(50% - 5px);
          border-radius: 50%;
        }
      `}
    </style>
  );
};

export default Balloons;