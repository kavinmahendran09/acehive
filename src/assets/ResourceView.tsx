import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ResourceView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resource = location.state as any;
  const searchState = location.state?.searchState; // Retrieve the previous search state

  const handleBack = () => {
    navigate('/ct-home', { state: searchState });
  };

  return (
    <div>
      <Navbar />

      {/* Banner */}
      <div className="bg-dark text-white py-5 text-center">
        <h1 className="display-4">{resource.title}</h1>
      </div>

      {/* Tags Section */}
      <div className="container my-4">
        <h3>Tags</h3>
        <div>
          {resource.tags && resource.tags.length > 0 && resource.tags.map((tag: string, index: number) => (
            <span key={index} className={`badge mx-1 bg-${index % 4 === 0 ? 'primary' : index % 4 === 1 ? 'secondary' : index % 4 === 2 ? 'success' : 'dark'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="container my-4">
        <h3>Content</h3>

        {/* Content Box with Images and PDF */}
        <div
          className="w-100 mb-4 p-4"
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            overflowY: 'auto',
          }}
        >
          <p><strong>Introduction:</strong> {resource.description}</p>
          <ul>
            {resource.bullet_points?.map((point: string, index: number) => (
              <li key={index} style={{ fontWeight: 'bold' }}>{point}</li>
            ))}
          </ul>

          <h4>Resource:</h4>
          <div className="row">
            {resource.file_urls.map((url: string, index: number) => (
              <div key={index} className="col-md-4 mb-3">
                {/* Check if it's a PDF and display accordingly */}
                {url.endsWith('.pdf') ? (
                  <div style={{ height: '500px', overflowY: 'scroll', width: '82.5vw' }}>
                    <iframe
                      src={url}
                      width="100%"
                      height="100%"
                      title={`PDF ${index + 1}`}
                    />
                  </div>
                ) : (
                  <img src={url} alt={`Image ${index + 1}`} className="img-fluid" style={{ borderRadius: '12px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container my-4">
        <div className="text-start">
          <button onClick={handleBack} className="btn btn-dark">
            Back
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResourceView;
