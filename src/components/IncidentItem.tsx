import React from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import { Incident } from '../types/types';

interface IncidentItemProps {
  incident: Incident;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ 
  incident, 
  isExpanded, 
  onToggleExpand 
}) => {
  const formattedDate = format(new Date(incident.reported_at), 'MMM d, yyyy');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <SeverityBadge severity={incident.severity} />
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {incident.title}
            </h3>
          </div>
          <button 
            onClick={onToggleExpand}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Description</h4>
              <p className="text-gray-700">{incident.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Additional Information</h4>
              <dl className="space-y-2">
                <div className="flex items-center text-sm">
                  <dt className="w-24 text-gray-500">ID:</dt>
                  <dd className="text-gray-900">{incident.id}</dd>
                </div>
                <div className="flex items-center text-sm">
                  <dt className="w-24 text-gray-500">Reported:</dt>
                  <dd className="text-gray-900">{formattedDate}</dd>
                </div>
                <div className="flex items-center text-sm">
                  <dt className="w-24 text-gray-500">Status:</dt>
                  <dd className="text-gray-900">{incident.resolved ? 'Resolved' : 'Open'}</dd>
                </div>
                <div className="flex items-center text-sm">
                  <dt className="w-24 text-gray-500">Severity:</dt>
                  <dd className="text-gray-900 capitalize">{incident.severity}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;