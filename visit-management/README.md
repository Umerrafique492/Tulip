# Visit Management System

A complete web application for managing visitor requests and tracking visits.

## Features

- **Dashboard**: View statistics at a glance (total, pending, approved, completed visits)
- **New Visit Request**: Submit new visitor requests with all necessary details
- **Visit Management**: 
  - View all visit records in a table format
  - Search by visitor name, host, or purpose
  - Filter by status (pending, approved, rejected, completed)
  - Edit existing visit records
  - Delete visit records
  - Approve/Reject pending visits
  - Mark approved visits as completed
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Data persists between sessions using browser's localStorage

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Custom CSS with modern design
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: Browser localStorage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
cd visit-management
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

1. **Dashboard**: View summary statistics of all visits
2. **New Visit Request**: Click on "New Visit Request" tab to submit a new visitor request
3. **All Visits**: View, search, filter, and manage all visit records
4. **View Details**: Click "View" to see full visit details and take actions (approve/reject/complete)
5. **Edit**: Click "Edit" to modify an existing visit record
6. **Delete**: Click "Delete" to remove a visit record

## Status Workflow

1. **Pending** → New visit requests start as pending
2. **Approved** → Admin approves the visit request
3. **Completed** → Mark the visit as completed after the visitor arrives
4. **Rejected** → Admin can reject a visit request

## Project Structure

```
visit-management/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main application component
│   └── index.css       # Application styles
└── public/             # Static assets
```

## License

MIT
