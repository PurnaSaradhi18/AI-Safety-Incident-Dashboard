import React from 'react';
import IncidentItem from './IncidentItem';
import { useIncidents } from '../context/IncidentContext';
import { AlertCircle } from 'lucide-react';

const IncidentList: React.FC = () => {
  const { 
    filteredIncidents, 
    expandedIncidents, 
    toggleExpanded 
  } = useIncidents();

  if (filteredIncidents.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle size={48} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No incidents found</h3>
        <p className="text-gray-600">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredIncidents.map((incident) => (
        <IncidentItem
          key={incident.id}
          incident={incident}
          isExpanded={expandedIncidents.has(incident.id)}
          onToggleExpand={() => toggleExpanded(incident.id)}
        />
      ))}
    </div>
  );
};

export default IncidentList;