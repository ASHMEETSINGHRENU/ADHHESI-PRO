import React from 'react';
import { Award, Calendar, CheckCircle } from 'lucide-react';

const AchievementCard = ({ achievement, isLast }) => {
  return (
    <div className="relative flex items-start gap-4 sm:gap-6 group">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-brand-navy border-2 border-brand-yellow flex items-center justify-center text-brand-yellow font-bold text-sm shadow-md group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors">
          {achievement.year}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-brand-border my-2"></div>}
      </div>

      {/* Content Box */}
      <div className="corporate-card bg-white border border-brand-border rounded-lg p-5 sm:p-6 mb-6 flex-1 hover:border-brand-yellow transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-brand-navy">{achievement.title}</h3>
          {achievement.badge && (
            <span className="text-[11px] font-bold text-brand-navy bg-brand-yellow/20 border border-brand-yellow/40 px-2.5 py-0.5 rounded-full">
              {achievement.badge}
            </span>
          )}
        </div>
        <p className="text-sm text-brand-gray leading-relaxed">{achievement.description}</p>
      </div>
    </div>
  );
};

export default AchievementCard;
