import React from 'react';

export const Loader = ({ text = 'Loading data...' }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-10 h-10 border-3 border-brand-border border-t-brand-navy rounded-full animate-spin mb-3"></div>
    <p className="text-sm font-semibold text-brand-navy">{text}</p>
  </div>
);

export const EmptyState = ({
  title = 'No items found',
  description = 'There are currently no records available in this section.',
  action,
}) => (
  <div className="bg-brand-light border border-dashed border-brand-border rounded-lg p-10 text-center max-w-md mx-auto my-8">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-brand-yellow shadow-sm border border-brand-border">
      <span className="text-xl font-bold">!</span>
    </div>
    <h3 className="text-base font-bold text-brand-navy mb-1">{title}</h3>
    <p className="text-xs text-brand-gray mb-4 leading-relaxed">{description}</p>
    {action}
  </div>
);
