
import React, { useEffect, useRef, useState } from 'react';
import { MOCK_SCENES } from '../constants';
import { Info, Navigation, Maximize2, Move } from 'lucide-react';

declare var pannellum: any;

const VirtualTour: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [currentSceneId, setCurrentSceneId] = useState(MOCK_SCENES[0].id);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      viewerRef.current = pannellum.viewer(containerRef.current, {
        type: 'equirectangular',
        panorama: MOCK_SCENES[0].panoramaUrl,
        autoLoad: true,
        showControls: false,
        hotSpots: MOCK_SCENES[0].hotspots.map(hs => ({
          pitch: hs.pitch,
          yaw: hs.yaw,
          type: hs.type === 'navigation' ? 'scene' : 'info',
          text: hs.text,
          sceneId: hs.targetSceneId,
          clickHandlerFunc: () => {
            if (hs.type === 'navigation' && hs.targetSceneId) {
              handleSceneChange(hs.targetSceneId);
            } else if (hs.type === 'info') {
              setActiveInfo(hs.details || null);
            }
          }
        }))
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  const handleSceneChange = (sceneId: string) => {
    const scene = MOCK_SCENES.find(s => s.id === sceneId);
    if (scene && viewerRef.current) {
      viewerRef.current.loadScene(sceneId, scene.pitch || 0, scene.yaw || 0, scene.hfov || 100);
      setCurrentSceneId(sceneId);
    }
  };

  const currentScene = MOCK_SCENES.find(s => s.id === currentSceneId);

  return (
    <div className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 bg-black group">
      <div ref={containerRef} className="w-full h-full" />

      {/* Overlays */}
      <div className="absolute top-6 left-6 z-10 space-y-2 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-yellow-400/20 pointer-events-auto">
          <p className="text-[10px] text-yellow-400 uppercase font-bold tracking-widest">Location</p>
          <h3 className="text-sm font-bold">{currentScene?.title}</h3>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-6 pointer-events-auto">
          <button className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
            <Move size={16} /> <span className="text-xs font-medium">Drag to Look</span>
          </button>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <button className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
            <Info size={16} /> <span className="text-xs font-medium">Click Markers</span>
          </button>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
        <button className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:text-yellow-400 transition-colors border border-white/10">
          <Maximize2 size={20} />
        </button>
        <button className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:text-yellow-400 transition-colors border border-white/10">
          <Navigation size={20} />
        </button>
      </div>

      {/* Info Popup Overlay */}
      {activeInfo && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-8 bg-black/20 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-xl border border-yellow-400/30 p-8 rounded-3xl max-w-md pointer-events-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-black">
                <Info size={24} />
              </div>
              <h4 className="text-lg font-bold text-yellow-400">Discovery Info</h4>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {activeInfo}
            </p>
            <button 
              onClick={() => setActiveInfo(null)}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all"
            >
              Back to Exploration
            </button>
          </div>
        </div>
      )}

      {/* Mini-map or scene picker */}
      <div className="absolute right-6 bottom-6 z-10 flex flex-col gap-2 items-end">
        <p className="text-[10px] text-gray-500 uppercase font-bold mr-2 mb-1">Waypoints</p>
        <div className="flex flex-col gap-2">
          {MOCK_SCENES.map(s => (
            <button
              key={s.id}
              onClick={() => handleSceneChange(s.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                currentSceneId === s.id 
                ? 'bg-yellow-400 text-black border-yellow-400' 
                : 'bg-black/60 text-white border-white/10 hover:border-yellow-400/50'
              }`}
            >
              {s.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
