import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useAuth } from "./Context/AuthContext";

// Page components
import DocumentUpload from "./Pages/DocumentUpload";
import DSS from "./Pages/DSS";
import FRDDashboard from "./Pages/FRDDashboard";
import AdminLayout from "./Pages/Layout/AdminLayout";
import FRDLayout from "./Pages/Layout/FRDLayout";
import NGOLayout from "./Pages/Layout/NGOLayout";
import OfficerLayout from "./Pages/Layout/OfficerLayout";
import PDALayout from "./Pages/Layout/PDALayout";
import Login from "./Pages/Login";
import MainDashboard from "./Pages/MainDashboard";
import Maps from "./Pages/Maps";
import NGODashboard from "./Pages/NGODashboard";
import OfficerDashboard from "./Pages/OfficerDashboard";
import PDADashboard from "./Pages/PDADashboard";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";

// -------- ProtectedRoute Wrapper --------
function ProtectedRoute({ element, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return element;
}

const adminWrap = (el) => (<AdminLayout>{el}</AdminLayout>);
const officerWrap = (el) => (<OfficerLayout>{el}</OfficerLayout>);
const frdWrap = (el) => (<FRDLayout>{el}</FRDLayout>);
const pdaWrap = (el) => (<PDALayout>{el}</PDALayout>);
const ngoWrap = (el) => (<NGOLayout>{el}</NGOLayout>);

// -------- Router Configuration --------
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/unauthorized", element: <h1>Not Authorized</h1> },

  // Admin
  { path: "/admin", element: <ProtectedRoute roles={["admin"]} element={adminWrap(<MainDashboard />)} /> },
  { path: "/admin/profile", element: <ProtectedRoute roles={["admin"]} element={adminWrap(<Profile />)} /> },
  { path: "/admin/maps", element: <ProtectedRoute roles={["admin"]} element={adminWrap(<Maps />)} /> },
  { path: "/admin/dss", element: <ProtectedRoute roles={["admin"]} element={adminWrap(<DSS />)} /> },
  { path: "/admin/doc-upload", element: <ProtectedRoute roles={["admin"]} element={adminWrap(<DocumentUpload />)} /> },
  { path: "/admin/users", element: <ProtectedRoute roles={["admin"]} element={adminWrap(<Users />)} /> },

  // Officer
  { path: "/officer", element: <ProtectedRoute roles={["officer"]} element={officerWrap(<OfficerDashboard />)} /> },
  { path: "/officer/profile", element: <ProtectedRoute roles={["officer"]} element={officerWrap(<Profile />)} /> },
  { path: "/officer/maps", element: <ProtectedRoute roles={["officer"]} element={officerWrap(<Maps />)} /> },
  { path: "/officer/dss", element: <ProtectedRoute roles={["officer"]} element={officerWrap(<DSS />)} /> },
  { path: "/officer/doc-upload", element: <ProtectedRoute roles={["officer"]} element={officerWrap(<DocumentUpload />)} /> },

  // FRD
  { path: "/frd", element: <ProtectedRoute roles={["frd"]} element={frdWrap(<FRDDashboard />)} /> },
  { path: "/frd/profile", element: <ProtectedRoute roles={["frd"]} element={frdWrap(<Profile />)} /> },
  { path: "/frd/maps", element: <ProtectedRoute roles={["frd"]} element={frdWrap(<Maps />)} /> },

  // PDA
  { path: "/pda", element: <ProtectedRoute roles={["pda"]} element={pdaWrap(<PDADashboard />)} /> },
  { path: "/pda/profile", element: <ProtectedRoute roles={["pda"]} element={pdaWrap(<Profile />)} /> },
  { path: "/pda/maps", element: <ProtectedRoute roles={["pda"]} element={pdaWrap(<Maps />)} /> },

  // NGO
  { path: "/ngo", element: <ProtectedRoute roles={["ngo"]} element={ngoWrap(<NGODashboard />)} /> },
  { path: "/ngo/profile", element: <ProtectedRoute roles={["ngo"]} element={ngoWrap(<Profile />)} /> },
  { path: "/ngo/dss", element: <ProtectedRoute roles={["ngo"]} element={ngoWrap(<DSS />)} /> },

  // Shared
  { path: "/dss", element: <ProtectedRoute roles={["admin", "officer", "ngo"]} element={<DSS />} /> },
  { path: "/maps", element: <ProtectedRoute roles={["admin", "officer", "frd", "pda"]} element={<Maps />} /> },
  { path: "/profile", element: <ProtectedRoute roles={["admin", "officer", "frd", "pda", "ngo"]} element={<Profile />} /> },

  { path: "*", element: <h1>404 – Page Not Found</h1> },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}