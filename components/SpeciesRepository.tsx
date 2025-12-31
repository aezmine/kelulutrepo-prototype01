
import React, { useState } from 'react';
import { MOCK_SPECIES } from '../constants';
import { Species, UserRole } from '../types';
import { Search, Filter, ChevronRight, Info, ExternalLink } from 'lucide-react';

const SpeciesRepository: React.FC<{ role: UserRole }> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const categories = ['All', 'Commercial', 'Common', 'Wild'];

  const filteredSpecies = MOCK_SPECIES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or scientific name..." 
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-400/50 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat 
                ? 'bg-yellow-400 text-black' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecies.map(s => (
          <div 
            key={s.id} 
            className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all cursor-pointer"
            onClick={() => setSelectedSpecies(s)}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img 
                src={s.imageUrl} 
                alt={s.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase font-bold text-yellow-400 border border-yellow-400/20">
                  {s.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{s.name}</h3>
              <p className="text-sm italic text-gray-500 mb-4">{s.scientificName}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Info size={14} className="text-yellow-400" /> Details available
                </span>
                <ChevronRight className="text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSpecies(null)}></div>
          <div className="relative bg-[#121212] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img src={selectedSpecies.imageUrl} alt={selectedSpecies.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedSpecies(null)}
                  className="absolute top-4 right-4 md:hidden w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white"
                >
                  &times;
                </button>
              </div>
              <div className="md:w-1/2 p-8 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedSpecies.name}</h2>
                    <p className="text-yellow-400 italic font-medium">{selectedSpecies.scientificName}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSpecies(null)}
                    className="hidden md:flex w-10 h-10 bg-white/5 rounded-full items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    &times;
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Habitat</p>
                    <p className="text-sm font-medium">{selectedSpecies.habitat}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Region</p>
                    <p className="text-sm font-medium">{selectedSpecies.region}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Honey Traits</p>
                    <p className="text-sm font-medium">{selectedSpecies.honeyTraits}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Nest Type</p>
                    <p className="text-sm font-medium">{selectedSpecies.nestType}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-white">General Information</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{selectedSpecies.description}</p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex gap-4">
                  <button className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all">
                    Bookmark Species
                  </button>
                  <button className="px-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeciesRepository;
