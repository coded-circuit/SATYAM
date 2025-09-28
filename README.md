# SATYAM — Smart AI for Tribal Yojana & Atlas Monitoring

A role-based web platform built with React to support SIH-2025 Problem Statement 25108. SATYAM streamlines scheme monitoring, geospatial visualization, and document management for tribal development stakeholders (Admin, Officer, FRD, PDA, NGO).

- Live Demo: https://satyam-sih.netlify.app/

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Local Development
- Scripts
- Routing & Roles
- Demo Accounts
- Maps & Charts
- Deployment
- License

## Overview

SATYAM centralizes the monitoring of tribal welfare schemes with dashboards, DSS views, geospatial maps, role-based routes, and secure document upload. It is a SPA leveraging React Router v6 for protected routes and context-based authentication.

## Features

- Role-based access control (Admin, Officer, FRD, PDA, NGO)
- Dashboards per role: Admin, Officer, FRD, PDA, NGO
- DSS (Decision Support System) views
- Interactive maps using Leaflet and React-Leaflet
- Charts and analytics (Chart.js via react-chartjs-2)
- Document upload interface
- User management (admin)
- Profile view

## Tech Stack

- React 19 with React Router v6
- Context API for auth (`src/Context/AuthContext.jsx`)
- Leaflet + React-Leaflet for maps
- Chart.js + react-chartjs-2 for charts
- Create React App tooling (`react-scripts`)

## Project Structure

Key folders and files:

```
src/
  App.js                 # Router and protected routes
  Context/
    AuthContext.jsx      # Auth state and demo users
  Pages/
    Layout/              # Role-specific layouts (Admin/Officer/FRD/PDA/NGO)
    Login.jsx            # Login page
    MainDashboard.jsx    # Admin landing dashboard
    DSS.jsx              # Decision Support System
    Maps.jsx             # Map view (Leaflet)
    DocumentUpload.jsx   # Upload UI
    Users.jsx            # Admin user management
    ...other role dashboards
  Components/
    MapView.jsx          # Leaflet map component
    StateDistributionChart.jsx
```

Assets and static images live under `src/assets/`. A production build is output to `build/`.

## Local Development

Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## Scripts

- `npm start` — Start the dev server
- `npm run build` — Production build to `build/`
- `npm test` — Run tests (Jest/RTL)

## Routing & Roles

Routing is defined in `src/App.js` using `createBrowserRouter`. A lightweight `ProtectedRoute` checks the authenticated user and role via `useAuth()`.

Example:

```jsx
// Inside router config
{ path: "/admin", element: <ProtectedRoute roles={["admin"]} element={adminWrap(<MainDashboard />)} /> }
{ path: "/officer", element: <ProtectedRoute roles={["officer"]} element={officerWrap(<OfficerDashboard />)} /> }
{ path: "/frd", element: <ProtectedRoute roles={["frd"]} element={frdWrap(<FRDDashboard />)} /> }
{ path: "/pda", element: <ProtectedRoute roles={["pda"]} element={pdaWrap(<PDADashboard />)} /> }
{ path: "/ngo", element: <ProtectedRoute roles={["ngo"]} element={ngoWrap(<NGODashboard />)} /> }
```

Auth is provided by `AuthProvider` in `src/index.js`.

## Demo Accounts

For demo purposes, static users are defined in `src/Context/AuthContext.jsx`:

```js
{ username: "admin",   password: "admin123", role: "admin" }
{ username: "officer", password: "field123", role: "officer" }
{ username: "frd01",   password: "frd123",   role: "frd" }
{ username: "pda01",   password: "pda123",   role: "pda" }
{ username: "ngo01",   password: "ngo123",   role: "ngo" }
```

Use the appropriate credentials to explore role-specific routes.

## Maps & Charts

- Maps: `leaflet` + `react-leaflet` power `Maps.jsx` and `Components/MapView.jsx`.
- Charts: `chart.js` + `react-chartjs-2` for `StateDistributionChart.jsx` and dashboard visuals.

## Deployment

The app can be deployed statically. A production build is created with:

```bash
npm run build
```

The build output under `build/` can be hosted on any static host (e.g., Netlify). Current live deployment:

- Live Demo: https://satyam-sih.netlify.app/

## License

This project is intended for SIH-2025 Problem Statement 25108. Licensing can be updated as per organization requirements.
