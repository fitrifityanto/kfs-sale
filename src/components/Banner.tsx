import React from "react";
import { Tag } from "lucide-react";

const Banner: React.FC = () => {
  return (
    <div className="bg-street-dark text-white border-b border-black/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-street-red text-street-red px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <Tag size={12} />
              <span>Final Season Sale</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
              Clearance <br />
              <span className="text-street-red">Event 35%</span>
            </h2>
            <p className="text-gray-400 font-medium uppercase tracking-wide text-sm md:text-base">
              No Restocks. No Exceptions. Grab your gear before it's gone.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="border-2 border-white/10 p-6">
              <p className="text-4xl font-black text-white/20 uppercase">
                Sale
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
