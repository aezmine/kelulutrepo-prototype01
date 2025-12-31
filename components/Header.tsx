
import React from 'react';
import { UserRole } from '../types';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  role: UserRole;
}

const Header: React.FC<HeaderProps> = ({ activeTab, role }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'System Overview';
      case 'repository': return 'Species Repository';
      case 'tour': return 'UMT Bukit Kor Virtual Tour';
      case 'quiz': return 'Knowledge Challenge';
      case 'admin': return 'Management Console';
      default: return 'Repository';
    }
  };

  return (
    <header className="h-20 bg-black border-b border-yellow-500/10 flex items-center justify-between px-8 z-20">
      <div>
        <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
        <p className="text-xs text-gray-500 mt-1">
          {role === UserRole.ADMIN ? 'Administrator Access' : 'Learning Module'}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search repository..." 
            className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-yellow-400/50 w-64"
          />
        </div>
        
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border-2 border-black"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
