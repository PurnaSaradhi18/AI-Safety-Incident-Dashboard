import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import { SortOption } from '../types/types';
import { Filter, ArrowUpDown } from 'lucide-react';

const FilterControls: React.FC = () => {
  const { 
    filters, 
    setFilters, 
    sortOption, 
    setSortOption, 
    sortDirection, 
    setSortDirection 
  } = useIncidents();

  const handleSeverityChange = (severity: string) => {
    if (severity === 'all') {
      setFilters({ severity: [] });
    } else {
      setFilters({ 
        severity: [severity as 'low' | 'medium' | 'high'] 
      });
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const selectedSeverity = filters.severity.length === 0 ? 'all' : filters.severity[0];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'low', 'medium', 'high'].map((severity) => (
              <button
                key={severity}
                onClick={() => handleSeverityChange(severity)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  selectedSeverity === severity
                    ? 'bg-primary-50 text-primary-700 font-medium ring-1 ring-primary-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="px-4 py-2 text-sm bg-gray-50 border-0 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary-100"
          >
            <option value="reported_at">Report Date</option>
            <option value="severity">Severity</option>
            <option value="title">Title</option>
          </select>

          <button
            onClick={toggleSortDirection}
            className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            title={sortDirection === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          >
            <ArrowUpDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;