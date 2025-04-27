import { IncidentProvider } from './context/IncidentContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <IncidentProvider>
        <Dashboard />
      </IncidentProvider>
    </div>
  );
}

export default App;