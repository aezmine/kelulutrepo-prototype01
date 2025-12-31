
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { UserRole } from '../types';
// Added Hexagon to the imports from lucide-react
import { Activity, BookOpen, Users, Trophy, Eye, MapPin, Hexagon } from 'lucide-react';

const statsData = [
  { label: 'Total Species', value: '42', icon: BookOpen, change: '+3 this month' },
  { label: 'Virtual Scenes', value: '12', icon: MapPin, change: 'Site: Bukit Kor' },
  { label: 'Quiz Attempts', value: '1,284', icon: Trophy, change: '+12% surge' },
  { label: 'Active Learners', value: '85', icon: Users, change: 'Currently online' }
];

const growthData = [
  { week: 'W1', species: 20 },
  { week: 'W4', species: 25 },
  { week: 'W8', species: 32 },
  { week: 'W12', species: 38 },
  { week: 'W16', species: 42 },
];

const engagementData = [
  { name: 'Entrance', clicks: 450 },
  { name: 'Plot A', clicks: 320 },
  { name: 'Log Hive', clicks: 580 },
  { name: 'Medic Garden', clicks: 290 },
  { name: 'Lab Zone', clicks: 410 },
];

const COLORS = ['#FACC15', '#EAB308', '#CA8A04', '#A16207', '#713F12'];

const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:border-yellow-400/40 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <stat.icon size={24} className="text-yellow-400 group-hover:text-black" />
              </div>
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">{stat.change}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <Activity className="text-yellow-400" size={18} />
              Repository Growth
            </h3>
            <span className="text-xs text-gray-500 italic">Phase 1 -> Phase 2</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorSpecies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="week" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#FACC15' }}
                />
                <Area type="monotone" dataKey="species" stroke="#FACC15" fillOpacity={1} fill="url(#colorSpecies)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <Eye className="text-yellow-400" size={18} />
              Tour Engagement
            </h3>
            <span className="text-xs text-gray-500 italic">Clicks per Hotspot</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(250, 204, 21, 0.05)' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar dataKey="clicks" radius={[4, 4, 0, 0]}>
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-6 rounded-2xl bg-yellow-400/5 border border-yellow-400/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black shrink-0">
            <Hexagon size={24} />
          </div>
          <div>
            <h4 className="font-bold text-yellow-400">Current Learning Journey Progress</h4>
            <p className="text-sm text-gray-400">You have explored 60% of the UMT Bukit Kor repository modules. Keep it up!</p>
          </div>
          <div className="ml-auto w-48 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[60%] h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;