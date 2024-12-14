// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container text-center" style={{ marginTop: '100px' }}>
      {/* 404 in Red */}
      <h1 className="display-1 text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist!</p>
      <Link to="/" className="btn btn-dark">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
