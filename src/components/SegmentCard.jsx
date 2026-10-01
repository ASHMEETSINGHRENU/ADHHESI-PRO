import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Hammer,
  Truck,
  Package,
  Wrench,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  Building2,
  Hammer,
  Truck,
  Package,
  Wrench,
  Cpu,
};

const SegmentCard = ({ segment }) => {
  const IconComponent = iconMap[segment.icon] || ShieldCheck;

  return (
    <div className="corporate-card bg-white border border-brand-border rounded-lg overflow-hidden flex flex-col h-full group hover:border-brand-yellow transition-all duration-200">
      {/* Image Banner */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-brand-light">
        <img
          src={segment.image}
          alt={segment.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5 text-white">
          <div className="w-9 h-9 rounded-md bg-brand-yellow text-brand-navy flex items-center justify-center flex-shrink-0 shadow-md">
            <IconComponent className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg leading-tight text-white drop-shadow-sm">
            {segment.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-brand-gray leading-relaxed mb-4">
            {segment.description}
          </p>

          {/* Key Applications List */}
          {segment.applications && segment.applications.length > 0 && (
            <div className="space-y-1.5 mb-4">
              <span className="text-xs font-bold text-brand-navy uppercase tracking-wider block mb-1">
                Typical Applications:
              </span>
              {segment.applications.slice(0, 3).map((app, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-brand-gray">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{app}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Link */}
        <div className="pt-3 border-t border-brand-border mt-auto">
          <Link
            to={`/enquiry?product=${encodeURIComponent(`Industrial Solution for ${segment.name}`)}`}
            className="text-xs font-bold text-brand-navy hover:text-brand-yellow-hover inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Consult for {segment.name}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SegmentCard;
