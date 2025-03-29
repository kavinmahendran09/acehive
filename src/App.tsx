import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './assets/Home';
import CTHome from './assets/CTHome';
import ResourceView from './assets/ResourceView';
import AdminLogin from './assets/AdminLogin';
import AdminDashboard from './assets/AdminDashboard';
import About from './assets/About';
import ScrollToTop from './assets/ScrollToTop'; // Import ScrollToTop
import { pdfjs } from 'react-pdf'; // Import pdfjs from react-pdf
import { Analytics } from '@vercel/analytics/react'; // Import Analytics
import PrivacyPolicy from './assets/PrivacyPolicy';
import NotFound from './assets/NotFound'; // Import NotFound page
import RankingMatrix from './assets/RankingMatrix';

// Set the worker source for PDF rendering
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <Router>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/ct-home" element={<CTHome />} />
        <Route path="/resource-view" element={<ResourceView />} />
        <Route path="/about" element={<About />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} /> {/* Updated path to lowercase */}
        <Route path="/ranking-matrix" element={<RankingMatrix />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin-dashboard"
          element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin-login" />}
        />

        {/* Fallback route for non-existing routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Add Vercel Analytics */}
      <Analytics />
    </Router>
  );
}

export default App;
