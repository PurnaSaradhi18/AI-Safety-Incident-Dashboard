import React from 'react';

type SeverityType = 'low' | 'medium' | 'high';

interface SeverityBadgeProps {
  severity: SeverityType;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const getStyles = () => {
    switch (severity) {
      case 'low':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'high':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStyles()}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

export default SeverityBadge;