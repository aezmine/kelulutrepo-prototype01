
import React from 'react';
import { 
  LayoutDashboard, 
  Beaker, 
  Map, 
  HelpCircle, 
  Settings, 
  User, 
  ShieldCheck,
  Home as HomeIcon,
  Info
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, role, setRole }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'repository', label: 'Species Repository', icon: Beaker },
    { id: 'tour', label: 'Virtual Tour', icon: Map },
    { id: 'quiz', label: 'Knowledge Quiz', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  if (role === UserRole.ADMIN) {
    menuItems.push({ id: 'admin', label: 'Admin CMS', icon: Settings });
  }

  return (
    <aside className="w-64 bg-black border-r border-yellow-500/20 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden border-2 border-yellow-400">
          <img 
            src="logo.png" 
            alt="Kelulut UMT Logo" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if logo.png is not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = '<div class="text-black font-black">UMT</div>';
            }}
          />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-yellow-400">KELULUT UMT</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Repository</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
              ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/10' 
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-[10px] text-gray-500 uppercase mb-2">Logged in as</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
              {role === UserRole.ADMIN ? <ShieldCheck className="text-yellow-400" size={16} /> : <User className="text-yellow-400" size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">{role === UserRole.ADMIN ? 'Admin User' : 'Learner'}</p>
              <p className="text-[10px] text-gray-500">UMT Campus</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setRole(role === UserRole.ADMIN ? UserRole.LEARNER : UserRole.ADMIN)}
          className="w-full text-xs py-2 text-yellow-400 hover:text-yellow-300 transition-colors border border-yellow-400/20 rounded-lg"
        >
          Switch to {role === UserRole.ADMIN ? 'Learner' : 'Admin'} View
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
