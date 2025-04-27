import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import FilterControls from './FilterControls';
import IncidentList from './IncidentList';
import NewIncidentForm from './NewIncidentForm';
import { ShieldAlert } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { incidentStats } = useIncidents();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <ShieldAlert className="text-primary-600" size={28} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              AI Safety Incident Dashboard
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Total Incidents</span>
              <span className="text-2xl font-semibold text-gray-900">{incidentStats.total}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Open</span>
              <span className="text-2xl font-semibold text-primary-600">{incidentStats.open}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">High Severity</span>
              <span className="text-2xl font-semibold text-red-600">{incidentStats.critical}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <FilterControls />
          <NewIncidentForm />
          <IncidentList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;