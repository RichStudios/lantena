import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import ComingSoon from './components/ComingSoon';

// Service Pages
import Landing from './pages/Landing';
import RentCollectionAndAccounting from './pages/RentCollectionAndAccounting';
import TenantManagement from './pages/TenantManagement';
import PropertyManagement from './pages/PropertyManagement';
import Assessment from './pages/Assessment';
import MRIandFiling from './pages/MRIandFiling';
import PropertyMarketing from './pages/PropertyMarketing';
import ProjectManagement from './pages/ProjectManagement';

// Other Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Project from './pages/Project';
import Tenants from './pages/Tenants';
import Properties from './pages/Properties';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/rent-collection" element={<RentCollectionAndAccounting />} />
        <Route path="/tenant-management" element={<TenantManagement />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/mri-filing" element={<MRIandFiling />} />
        <Route path="/property-marketing" element={<PropertyMarketing />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/coming-soon" element={<ComingSoon pageName="Coming Soon" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Legacy pages if needed */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/project" element={<Project />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </Router>
  );
}

export default App;
