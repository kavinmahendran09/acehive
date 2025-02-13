import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchResources } from './supabaseClient';

const ResourceView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resource = location.state as any;
  const searchState = location.state?.searchState;

  const [exactTagResources, setExactTagResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBack = () => {
    navigate('/ct-home', { state: searchState });
  };

  const fetchSimilarResources = async () => {
    const allTags = resource.tags || [];

    setIsLoading(true);

    try {
      const cacheKey = `similarResources-${resource.id}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setExactTagResources(JSON.parse(cachedData));
      } else {
        const results = await fetchResources({ tags: allTags }, resource.resourceType);
        const exactTagResults = results.filter((res: any) => {
          const matchingTagsCount = countMatchingTags(res.tags, allTags);
          return matchingTagsCount === allTags.length && res.id !== resource.id;
        });

        setExactTagResources(exactTagResults);

        localStorage.setItem(cacheKey, JSON.stringify(exactTagResults));
      }
    } catch (error) {
      console.error('Error fetching similar resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const countMatchingTags = (resourceTags: string[], searchTags: string[]): number => {
    return resourceTags.filter((tag) => searchTags.includes(tag)).length;
  };

  const Thumbnail: React.FC<{ resource: any }> = ({ resource }) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      return (
        <img
          src={resource.file_urls[0]}
          className="card-img-top"
          alt={resource.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      );
    }

    const isPdf = resource.file_urls[0]?.toLowerCase().endsWith('.pdf');
    const numberInTitle = resource.title.match(/\d+/)?.[0] || '';

    if (isPdf) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', backgroundColor: '#f4f4f4', borderRadius: "5px" }}>
          <div className="d-flex flex-column align-items-center">
            <i className="bi bi-file-earmark-pdf" style={{ fontSize: '3rem', color: '#e74c3c' }}></i>
            <span className="mt-2" style={{ fontSize: '1.2rem' }}>{numberInTitle}</span>
          </div>
        </div>
      );
    }

    return (
      <img
        src={resource.file_urls[0]}
        className="card-img-top"
        alt={resource.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
    );
  };

  useEffect(() => {
    fetchSimilarResources();
  }, [resource]);

  return (
    <div>
      <Navbar />

      <div className="bg-dark text-white py-5 text-center">
        <h1 className="display-4">{resource.title}</h1>
      </div>

      <div className="container my-4">
        <h3>Tags</h3>
        <div>
          {resource.tags && resource.tags.length > 0 && resource.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className={`badge mx-1 bg-${index % 4 === 0 ? 'primary' : index % 4 === 1 ? 'secondary' : index % 4 === 2 ? 'success' : 'dark'}`}
              style={{ fontSize: '1.1rem', fontWeight: '400' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="container my-4">
        <h3>Content</h3>
        <div
          className="w-100 mb-4 p-4"
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            overflowY: 'auto',
          }}
        >
          <h4>
            Introduction: <span style={{ fontWeight: "normal", fontSize : "22px" }}>{resource.description}</span>
          </h4>

          <ul>
            {resource.bullet_points?.map((point: string, index: number) => (
              <li key={index} style={{ fontWeight: 'bold' }}>{point}</li>
            ))}
          </ul>

          <h4>Resource:</h4>
          <div className="row">
            {resource.file_urls.map((url: string, index: number) => (
              <div key={index} className="col-md-12 mb-3">
                {url.endsWith('.pdf') ? (
                  <div style={{ height: '700px', overflowY: 'scroll', width: '82.5vw' }}>
                    <iframe
                      src={url}
                      width="100%"
                      height="100%"
                      title={`PDF ${index + 1}`}
                    />
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="img-fluid"
                    style={{
                      borderRadius: '12px',
                      maxWidth: '100%',
                      height: 'auto',
                      margin: '0 auto',
                      display: 'block',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="text-start">
          <button onClick={handleBack} className="btn btn-dark btn-lg">
            Back
          </button>
        </div>
      </div>

      <div className="container my-4">
        <div className="text-start">
          <h1>Similar Resources</h1>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>

              <div>
                <div className="row">
                  {exactTagResources.slice(0, 12).map((resource: any, index: number) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card h-100 d-flex flex-column" style={{ borderColor: "gray" }}>
                        <Thumbnail resource={resource} />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{resource.title}</h5>
                          <p className="card-text">{resource.description.slice(0, 70)}...</p>
                          <div className="tags mt-2">
                            {resource.tags && resource.tags.length > 0 && resource.tags.map((tag: string, tagIndex: number) => (
                              <span
                                key={tagIndex}
                                className={`badge mx-1 bg-${tagIndex % 4 === 0 ? 'primary' : tagIndex % 4 === 1 ? 'secondary' : tagIndex % 4 === 2 ? 'success' : 'dark'}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-auto">
                            <button
                              onClick={() => navigate('/resource-view', { state: { ...resource, resourceType: resource.resourceType, searchState } })}
                              className="btn btn-dark mt-2 w-100"
                            >
                              View Resource
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResourceView;
