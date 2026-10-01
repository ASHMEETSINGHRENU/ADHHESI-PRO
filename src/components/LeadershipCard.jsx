import React from 'react';
import { Quote } from 'lucide-react';

const LeadershipCard = ({ leader }) => {
  return (
    <div className="corporate-card bg-white border border-brand-border rounded-lg overflow-hidden flex flex-col h-full hover:border-brand-yellow transition-all duration-200">
      <div className="h-64 sm:h-72 w-full bg-brand-light overflow-hidden relative">
        <img
          src={
            leader.photo ||
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
          }
          alt={leader.name}
          className="h-full w-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent p-4">
          <h3 className="text-lg font-bold text-white leading-snug">{leader.name}</h3>
          <p className="text-xs font-semibold text-brand-yellow tracking-wide">
            {leader.designation}
          </p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <p className="text-sm text-brand-gray leading-relaxed mb-4">{leader.bio}</p>

        {leader.message && (
          <div className="bg-brand-light border-l-2 border-brand-yellow p-3.5 rounded-r-md mt-auto">
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
              <p className="text-xs text-brand-navy-dark italic leading-normal">
                "{leader.message}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadershipCard;
