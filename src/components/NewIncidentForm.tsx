import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import { PlusCircle, X } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const initialFormData: FormData = {
  title: '',
  description: '',
  severity: 'medium',
};

const NewIncidentForm: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { addIncident } = useIncidents();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addIncident({
        ...formData,
        id: String(Date.now()),
        reported_at: new Date().toISOString(),
      });
      
      setFormData(initialFormData);
      setIsFormOpen(false);
    }
  };

  return (
    <div className="mb-6">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
        >
          <PlusCircle size={20} />
          Report New Incident
        </button>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg animate-slide-down">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Report New Incident</h3>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.title ? 'border-red-300 ring-red-100' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-colors`}
                  placeholder="Enter incident title"
                />
                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
              </div>
              
              <div>
                <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.description ? 'border-red-300 ring-red-100' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-colors`}
                  placeholder="Detailed description of the incident"
                ></textarea>
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all hover:shadow-md"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewIncidentForm;