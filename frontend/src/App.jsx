import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import React from 'react';
import ScheduleCalendar from './components/ScheduleCalendar';

function App() {
  // Replace '101' with any valid account_id present in your database
  const activeUserId = 101;

  return (
    <div className="App">
      <header style={{ padding: '10px 20px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>College Scheduling System</h1>
      </header>
      
      <main>
        <ScheduleCalendar userId={activeUserId} />
      </main>
    </div>
  );
}

export default App;