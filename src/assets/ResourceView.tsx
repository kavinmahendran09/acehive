import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchResources } from './supabaseClient'; // Assuming this is the function to fetch resources from Supabase

const ResourceView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resource = location.state as any;
  const searchState = location.state?.searchState;

  const [similarResources, setSimilarResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBack = () => {
    navigate('/ct-home', { state: searchState });
  };

  // Function to fetch similar resources based on the tags
  const fetchSimilarResources = async () => {
    const allTags = resource.tags || [];
    const tagCombinations = getTagCombinations(allTags);

    setIsLoading(true);

    try {
      const results = await fetchResources({ tags: tagCombinations }, resource.resourceType); // Assuming this function handles fetching based on tags

      // Sort by the number of matching tags
      const sortedResults = results.sort((a: any, b: any) => {
        const aMatches = countMatchingTags(a.tags, allTags);
        const bMatches = countMatchingTags(b.tags, allTags);
        return bMatches - aMatches; // Sort in descending order
      });

      setSimilarResources(sortedResults);
    } catch (error) {
      console.error('Error fetching similar resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get combinations of tags (all tags, 3 tags, 2 tags, etc.)
  const getTagCombinations = (tags: string[]) => {
    const combinations: string[][] = [];
    for (let i = tags.length; i > 0; i--) {
      combinations.push(...combineTags(tags, i));
    }
    return combinations;
  };

  // Function to generate combinations of tags
  const combineTags = (tags: string[], length: number): string[][] => {
    const combinations: string[][] = [];
    const combine = (start: number, comb: string[]) => {
      if (comb.length === length) {
        combinations.push(comb);
        return;
      }
      for (let i = start; i < tags.length; i++) {
        combine(i + 1, [...comb, tags[i]]);
      }
    };
    combine(0, []);
    return combinations;
  };

  // Function to count how many tags match between two arrays
  const countMatchingTags = (resourceTags: string[], searchTags: string[]): number => {
    return resourceTags.filter((tag) => searchTags.includes(tag)).length;
  };

  // Function to display thumbnail for resource cards
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
    const numberInTitle = resource.title.match(/\d+/)?.[0] || ''; // Extract number from title

    if (isPdf) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', backgroundColor: '#f4f4f4',borderRadius :"5px" }}>
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
        style={{ height: '200px', objectFit: 'cover' }} // Updated height for non-Safari and non-PDF images
      />
    );
  };

  // UseEffect to fetch similar resources when the page loads
  useEffect(() => {
    fetchSimilarResources();
  }, [resource]);

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
          <button onClick={handleBack} className="btn btn-dark btn-lg">
            Back
          </button>
        </div>
      </div>

      {/* Similar Resources Section */}
      <div className="container my-4">
        <h1>Similar Resources</h1>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {similarResources.map((resource: any, index: number) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100" style={{ borderColor: "gray" }}>
                  <Thumbnail resource={resource} />
                  <div className="card-body">
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
                    <button onClick={() => navigate('/resource-view', { state: { ...resource, resourceType: resource.resourceType, searchState } })} className="btn btn-dark mt-2 w-100">
                      View Resource
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ResourceView;
