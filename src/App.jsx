// @ts-check

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import BirthdayWishes from './components/BirthdayWishesh';
// import BirthdayWishes from './components/BirthdayWishes';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/wishes" element={<BirthdayWishes />} />
      </Routes>
    </div>
  );
}

export default App;