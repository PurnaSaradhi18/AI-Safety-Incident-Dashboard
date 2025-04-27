import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockIncidents, getIncidentStats } from '../data/mockData';
import { 
  Incident, 
  IncidentStats,
  FilterState, 
  SortOption, 
  SortDirection 
} from '../types/types';

interface IncidentContextType {
  incidents: Incident[];
  filteredIncidents: Incident[];
  incidentStats: IncidentStats;
  filters: FilterState;
  sortOption: SortOption;
  sortDirection: SortDirection;
  getIncidentById: (id: string) => Incident | undefined;
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  updateIncident: (id: string, updatedIncident: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setSortOption: (option: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
  getCategories: () => string[];
  expandedIncidents: Set<string>;
  toggleExpanded: (id: string) => void;
}

const defaultFilterState: FilterState = {
  severity: [],
  search: '',
};

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [sortOption, setSortOption] = useState<SortOption>('reported_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedIncidents, setExpandedIncidents] = useState(new Set<string>());
  const [filtersState, setFiltersState] = useState<FilterState>(defaultFilterState);

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
    }));
  };


  const toggleExpanded = (id: string) => {
    setExpandedIncidents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getIncidentById = (id: string) => {
    return incidents.find(incident => incident.id === id);
  };

  const addIncident = (incident: Omit<Incident, 'id'>) => {
    const newIncident: Incident = {
      ...incident,
      id: String(Date.now()),
    };
    setIncidents(prev => [...prev, newIncident]);
  };

  const updateIncident = (id: string, updatedIncident: Partial<Incident>) => {
    setIncidents(prev =>
      prev.map(incident =>
        incident.id === id ? { ...incident, ...updatedIncident } : incident
      )
    );
  };

  const deleteIncident = (id: string) => {
    setIncidents(prev => prev.filter(incident => incident.id !== id));
  };

  const resetFilters = () => {
    setFilters(defaultFilterState);
  };

  const getCategories = () => {
    return Array.from(new Set(incidents.map(incident => incident.severity)));
  };

  const filteredIncidents = React.useMemo(() => {
    let result = [...incidents];

    if (filtersState.severity.length > 0) {
      result = result.filter(incident => filtersState.severity.includes(incident.severity));
    }

    if (filtersState.search) {
      const searchLower = filtersState.search.toLowerCase();
      result = result.filter(
        incident =>
          incident.title.toLowerCase().includes(searchLower) ||
          incident.description.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case 'reported_at':
          comparison = new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
          break;
        case 'severity': {
          const severityOrder = { low: 1, medium: 2, high: 3 };
          comparison = severityOrder[b.severity] - severityOrder[a.severity];
          break;
        }
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      return sortDirection === 'asc' ? -comparison : comparison;
    });

    return result;
  }, [incidents, filtersState, sortOption, sortDirection]);

  const incidentStats = React.useMemo(() => getIncidentStats(incidents), [incidents]);

  const value = {
    incidents,
    filteredIncidents,
    incidentStats,
    filters: filtersState,
    sortOption,
    sortDirection,
    getIncidentById,
    addIncident,
    updateIncident,
    deleteIncident,
    setFilters,
    resetFilters,
    setSortOption,
    setSortDirection,
    getCategories,
    expandedIncidents,
    toggleExpanded,
  };

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
};

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (context === undefined) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};