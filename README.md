# AI Safety Incident Dashboard

An interactive dashboard for monitoring and managing AI safety incidents, built with React and TypeScript.

## Features

- Display a list of AI safety incidents with key information
- Filter incidents by severity (All, Low, Medium, High, Critical)
- Sort incidents by reported date (newest/oldest first)
- Expandable incident details with toggle functionality
- Report new incidents through an interactive form with validation
- Responsive design for all device sizes

## Technology Stack

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Icons**: lucide-react
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-safety-incident-dashboard.git
cd ai-safety-incident-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Design Decisions

- **State Management**: Used React Context API for global state management to avoid prop drilling and maintain a centralized data store.
- **Component Structure**: Organized components into small, reusable pieces with specific responsibilities.
- **Responsive Design**: Implemented a mobile-first approach ensuring usability across all device sizes.
- **Animation**: Added subtle animations for better user experience and feedback.
- **Form Validation**: Implemented client-side validation to provide immediate feedback to users.
- **Severity Indicators**: Used color-coding for quick visual identification of incident severity.

## Project Structure

```
src/
├── components/          # UI components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── FilterControls.tsx  # Filtering and sorting controls
│   ├── IncidentItem.tsx # Individual incident display
│   ├── IncidentList.tsx # List of incidents
│   ├── NewIncidentForm.tsx # Form for creating new incidents
│   └── SeverityBadge.tsx # Badge for displaying severity
├── context/
│   └── IncidentContext.tsx # Global state management
├── data/
│   └── mockData.ts      # Mock incident data
├── types/
│   └── types.ts         # TypeScript type definitions
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```