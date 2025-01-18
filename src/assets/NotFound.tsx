import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch(
          'https://api.thecatapi.com/v1/images/search',
          {
            headers: {
              'x-api-key': import.meta.env.VITE_CAT_API_KEY,
            },
          }
        );
        const data = await response.json();
        if (data && data[0] && data[0].url) {
          setCatImageUrl(data[0].url);
        }
      } catch (error) {
        console.error('Failed to fetch a cat image:', error);
        setCatImageUrl(null);
      }
    };

    fetchCatImage();
  }, []);

  return (
    <div
      className="container text-center"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <h1 className="display-1 text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist!</p>

      <div style={{ marginBottom: '20px' }}>
        {catImageUrl ? (
          <img
            src={catImageUrl}
            alt="Cat"
            style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
          />
        ) : (
          <p>Loading car*...</p>
        )}
        <p>Refresh page to see a new car*</p>
      </div>

      <Link to="/" className="btn btn-dark" style={{ marginTop: '-20px' }}>
        Go back to Home
      </Link>

      <p
        style={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '1em',
        }}
      >
        Psst, if you like cats, maybe this was fate...
      </p>
    </div>
  );
};

export default NotFound;
