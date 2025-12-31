
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MapPin, Users, Globe, Building2, Map as MapIcon, ExternalLink, Loader2, Sparkles } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [localInsights, setLocalInsights] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Coordinates for UMT Bukit Kor: 5.21104, 103.1662
  const latitude = 5.211040769151399;
  const longitude = 103.16620152559611;

  useEffect(() => {
    const fetchLocalContext = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: "What are the significant natural features and conservation efforts at the UMT Bukit Kor stingless bee research site?",
          config: {
            tools: [{ googleMaps: {} }],
            toolConfig: {
              retrievalConfig: {
                latLng: {
                  latitude: latitude,
                  longitude: longitude
                }
              }
            }
          },
        });
        
        setLocalInsights(response.text || "UMT Bukit Kor is a primary research hub for stingless bee conservation in Malaysia.");
        if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
           setSources(response.candidates[0].groundingMetadata.groundingChunks);
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
        setLocalInsights("UMT Bukit Kor is a premier research site in Terengganu dedicated to stingless bee conservation.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocalContext();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 rounded-lg text-black">
              <Building2 size={20} />
            </div>
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Our Institution</span>
          </div>
          <h2 className="text-4xl font-black italic text-white tracking-tighter leading-tight">
            UNIVERSITI MALAYSIA <br/> <span className="text-yellow-400 underline decoration-white/10 underline-offset-8">TERENGGANU</span>
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            Universiti Malaysia Terengganu (UMT) stands as a beacon for tropical biodiversity and aquatic resource research. 
            The Bukit Kor Research Site is a unique outdoor laboratory dedicated specifically to the preservation and study of Kelulut (Stingless Bees).
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2"><Globe size={14} className="text-yellow-400" /> Research Site</h4>
              <p className="text-xs text-gray-500">Bukit Kor, Terengganu</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2"><Users size={14} className="text-yellow-400" /> Goal</h4>
              <p className="text-xs text-gray-500">Educational Repository</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-yellow-400/5 border border-yellow-400/20 rounded-3xl overflow-hidden shadow-2xl">
            <iframe 
              title="UMT Bukit Kor Location"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(1.2)' }} 
              loading="lazy" 
              allowFullScreen 
              src={`https://www.google.com/maps/embed/v1/view?key=${process.env.API_KEY}&center=${latitude},${longitude}&zoom=15&maptype=satellite`}
            ></iframe>
            <div className="absolute inset-x-0 bottom-0 p-4 bg-black/80 backdrop-blur-sm border-t border-yellow-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Map Coordinates</p>
                  <p className="text-xs text-white font-mono">{latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black">
                  <MapPin size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Insight Section */}
      <div className="bg-black border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/10 bg-yellow-400/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-3 italic text-white">
              <MapIcon className="text-yellow-400" size={24} />
              EXPLORE THE SURROUNDINGS
            </h3>
            <p className="text-xs text-gray-500 mt-1">AI-Powered Geospatial Analysis for Bukit Kor</p>
          </div>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl flex items-center gap-2 hover:bg-yellow-300 transition-all text-sm w-fit"
          >
            Open in Google Maps <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-widest bg-yellow-400/10 w-fit px-3 py-1 rounded-full">
              <Sparkles size={14} /> AI Context
            </div>
            {loading ? (
              <div className="flex items-center gap-3 text-gray-400 animate-pulse">
                <Loader2 size={18} className="animate-spin text-yellow-400" />
                <p className="text-sm italic">Retrieving local landmarks...</p>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-gray-300 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5 italic">
                  "{localInsights}"
                </p>
              </div>
            )}
            
            {sources.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Referenced Places</p>
                <div className="flex flex-wrap gap-2">
                  {sources.map((chunk, idx) => chunk.maps && (
                    <a 
                      key={idx} 
                      href={chunk.maps.uri} 
                      target="_blank" 
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] text-yellow-400 hover:border-yellow-400/50 transition-all flex items-center gap-2"
                    >
                      <MapPin size={12} /> {chunk.maps.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center overflow-hidden mb-2">
                <img src="logo.png" className="w-full h-full object-cover" alt="Logo" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Project Lead</p>
                <p className="text-sm font-bold text-white">UMT Stingless Bee Team</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Institutional Hub</p>
                <p className="text-sm font-bold text-white italic">Universiti Malaysia Terengganu</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-4 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                    <MapPin size={16} />
                  </div>
                  <p className="text-xs text-gray-300">Located in the lush tropical forests of Marang, Terengganu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
