
import React, { useState } from 'react';
import { MOCK_SPECIES, MOCK_SCENES } from '../constants';
import { Plus, Edit2, Trash2, Camera, MapPin, Database, ChevronRight } from 'lucide-react';

const AdminCMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'species' | 'panoramas'>('species');

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <button 
          onClick={() => setActiveTab('species')}
          className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${
            activeTab === 'species' ? 'bg-yellow-400 border-yellow-400 text-black font-bold' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Database size={20} />
          Species Management
        </button>
        <button 
          onClick={() => setActiveTab('panoramas')}
          className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${
            activeTab === 'panoramas' ? 'bg-yellow-400 border-yellow-400 text-black font-bold' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Camera size={20} />
          Panorama Scenes
        </button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white capitalize">{activeTab} List</h3>
            <p className="text-xs text-gray-500">Manage, edit or delete records in the repository</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black text-sm font-bold rounded-xl hover:bg-yellow-300 transition-all">
            <Plus size={18} /> Add New {activeTab === 'species' ? 'Species' : 'Scene'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest">Entry</th>
                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest">Category / Detail</th>
                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeTab === 'species' ? (
                MOCK_SPECIES.map(s => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={s.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt="" />
                        <div>
                          <p className="text-sm font-bold text-white">{s.name}</p>
                          <p className="text-[10px] italic text-gray-500">{s.scientificName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] text-gray-400 font-bold uppercase">{s.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-400">Published</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 bg-white/5 text-gray-400 hover:text-yellow-400 rounded-lg transition-all"><Edit2 size={16} /></button>
                        <button className="p-2 bg-white/5 text-gray-400 hover:text-red-400 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                MOCK_SCENES.map(s => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center text-yellow-400"><MapPin size={24} /></div>
                        <div>
                          <p className="text-sm font-bold text-white">{s.title}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-400">{s.hotspots.length} Active Hotspots</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-gray-400">Live</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 bg-white/5 text-gray-400 hover:text-yellow-400 rounded-lg transition-all"><Edit2 size={16} /></button>
                        <button className="p-2 bg-white/5 text-gray-400 hover:text-red-400 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <p>Showing {activeTab === 'species' ? MOCK_SPECIES.length : MOCK_SCENES.length} records</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-black/40 rounded border border-white/10 hover:border-yellow-400 transition-colors">Prev</button>
            <button className="px-3 py-1 bg-black/40 rounded border border-white/10 hover:border-yellow-400 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCMS;
