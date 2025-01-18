import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container text-center" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* 404 in Red */}
      <h1 className="display-1 text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist!</p>
      
      {/* Cat image */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src="https://cataas.com/cat" // Cat image from Cataas API
          alt="Cat"
          style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
        />
        <p>Refresh page to see a new car*</p>
      </div>

      <Link to="/" className="btn btn-dark" style={{ marginTop: '-20px' }}>
        Go back to Home
      </Link>

      {/* Fun message at the bottom of the page */}
      <p style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: '#6c757d', fontSize: '1em' }}>
        Psst, if you like cats, maybe this was fate...
      </p>
    </div>
  );
};

export default NotFound;
