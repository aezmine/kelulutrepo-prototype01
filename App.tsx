
import React, { useState } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import SpeciesRepository from './components/SpeciesRepository';
import VirtualTour from './components/VirtualTour';
import QuizModule from './components/QuizModule';
import AdminCMS from './components/AdminCMS';
import KelulutBot from './components/KelulutBot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [role, setRole] = useState<UserRole>(UserRole.LEARNER);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <Dashboard role={role} />;
      case 'repository':
        return <SpeciesRepository role={role} />;
      case 'tour':
        return <VirtualTour />;
      case 'quiz':
        return <QuizModule />;
      case 'about':
        return <AboutUs />;
      case 'admin':
        return role === UserRole.ADMIN ? <AdminCMS /> : <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={role} 
        setRole={setRole} 
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header activeTab={activeTab} role={role} />
        <main className="flex-1 overflow-y-auto p-6 bg-[#121212] relative">
          <div className="honeycomb-bg absolute inset-0 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
        <KelulutBot />
      </div>
    </div>
  );
};

export default App;
