
import React from 'react';
import { Newspaper, Bell, Zap, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "New Species Documented: Heterotrigona itama var. UMT",
    date: "May 12, 2024",
    excerpt: "Our researchers at Bukit Kor have identified a unique variation of the Itama species with distinct propolis structures.",
    tag: "Discovery",
    image: "https://picsum.photos/seed/news1/600/400"
  },
  {
    id: 2,
    title: "UMT Bukit Kor Virtual Tour Now Live!",
    date: "May 10, 2024",
    excerpt: "Explore the stingless bee research site from your browser. 7 new panoramas added to the interactive tour.",
    tag: "Update",
    image: "https://picsum.photos/seed/news2/600/400"
  },
  {
    id: 3,
    title: "FYP Semester 2 Milestones Reached",
    date: "May 08, 2024",
    excerpt: "The Kelulut UMT Repository system has successfully reached 90% development phase.",
    tag: "Milestone",
    image: "https://picsum.photos/seed/news3/600/400"
  }
];

const Home: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-96 rounded-3xl overflow-hidden border border-yellow-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=2070&auto=format&fit=crop" 
          alt="Bee Close Up" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl space-y-4">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit">
            Welcome to the Hive
          </span>
          <h1 className="text-5xl font-black text-white italic tracking-tighter leading-none">
            INTERACTIVE <br/> 
            <span className="text-yellow-400">KELULUT REPOSITORY</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Educational digital ecosystem for Indo-Malayan Stingless Bee conservation and research at UMT Bukit Kor. Explore, learn, and discover.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-300 transition-all">
              Explore Repository <ArrowRight size={18} />
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
              Project SDD
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-3 italic">
            <Newspaper className="text-yellow-400" />
            LATEST BUZZ
          </h2>
          <button className="text-xs text-yellow-400 font-bold hover:underline flex items-center gap-1 uppercase tracking-widest">
            View All Updates <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map(news => (
            <div key={news.id} className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all">
              <div className="h-48 relative overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-yellow-400 text-black text-[9px] font-black uppercase rounded">{news.tag}</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <Calendar size={12} /> {news.date}
                </div>
                <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">{news.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{news.excerpt}</p>
                <button className="text-xs font-bold text-yellow-400 pt-2 flex items-center gap-1">
                  Read More <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section className="bg-yellow-400 text-black p-8 rounded-3xl flex flex-wrap items-center justify-around gap-8">
        <div className="text-center">
          <p className="text-4xl font-black italic">500+</p>
          <p className="text-[10px] uppercase font-bold tracking-widest">Active Learners</p>
        </div>
        <div className="w-[1px] h-10 bg-black/10 hidden md:block"></div>
        <div className="text-center">
          <p className="text-4xl font-black italic">42</p>
          <p className="text-[10px] uppercase font-bold tracking-widest">Bee Species</p>
        </div>
        <div className="w-[1px] h-10 bg-black/10 hidden md:block"></div>
        <div className="text-center">
          <p className="text-4xl font-black italic">12</p>
          <p className="text-[10px] uppercase font-bold tracking-widest">Site Locations</p>
        </div>
        <div className="w-[1px] h-10 bg-black/10 hidden md:block"></div>
        <div className="text-center">
          <p className="text-4xl font-black italic">2</p>
          <p className="text-[10px] uppercase font-bold tracking-widest">Research Phases</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
