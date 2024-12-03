import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; 
import Filters from './Filters';
import { fetchResources } from './supabaseClient';

const CTHome: React.FC = () => {
  const [year, setYear] = useState<string | null>(null);
  const [degree, setDegree] = useState<string | null>(null);
  const [specialisation, setSpecialisation] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [elective, setElective] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resourceType, setResourceType] = useState<string>('CT Paper'); // Default to 'CT Paper'

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the resourceType from location state, if available
    if (location.state?.resourceType) {
      setResourceType(location.state.resourceType);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state) {
      const { year, degree, specialisation, subject, elective, results } = location.state;
      setYear(year || null);
      setDegree(degree || null);
      setSpecialisation(specialisation || null);
      setSubject(subject || null);
      setElective(elective || null);
      setSearchResults(results || []);
    }
  }, [location.state]);

  const handleSearch = async () => {
    if (year && degree && specialisation && (subject || elective) && !(subject && elective)) {
      setWarning(null);
      setIsLoading(true);

      try {
        let results;

        if (year === '1st Year') {
          // If 1st Year is selected, search only by subject or elective
          results = await fetchResources({ year: '1st Year', subject, elective }, resourceType);
        } else {
          // If not 1st Year, use all selected filters
          results = await fetchResources({ year, degree, specialisation, subject, elective }, resourceType);
        }

        // Sort the results alphabetically by title
        results = results.sort((a: any, b: any) => a.title.localeCompare(b.title));

        setSearchResults(results);
        
        // Add a message if no results found
        if (results.length === 0) {
          setWarning('No resources found matching your criteria.');
        }

        const newSearchState = { year, degree, specialisation, subject, elective, results, resourceType };
        navigate('/ct-home', { state: newSearchState });
      } catch (error) {
        console.error('Search failed:', error);
        setWarning('Unable to fetch resources. Please try again later.');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setWarning('Please select all required filters before searching.');
    }
  };

  const handleViewPaper = (resource: any) => {
    navigate('/resource-view', { state: { ...resource, resourceType, searchState: { year, degree, specialisation, subject, elective, results: searchResults, resourceType } } });
  };

  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <div className="bg-dark text-white text-center py-3 mb-4 py-5">
        <h1 className="m-0">{resourceType}</h1>
        <p className="m-0">Explore curated {resourceType} resources for your needs</p>
      </div>

      <div className="container my-5 px-2">
        <div className="row">
          <Filters
            year={year}
            degree={degree}
            specialisation={specialisation}
            subject={subject}
            elective={elective}
            setYear={setYear}
            setDegree={setDegree}
            setSpecialisation={setSpecialisation}
            setSubject={setSubject}
            setElective={setElective}
            handleSearch={handleSearch}
            warning={warning}
          />

          <div className="col-md-9">
            <h2 className="text-start">{resourceType}</h2>
            <p className="text-secondary" style={{ fontSize: '0.9em' }}>
              Showing {searchResults.length} result(s)
            </p>
            {isLoading ? (
              <div className="d-flex justify-content-center mt-4">
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="alert alert-primary mt-4" role="alert">
                <i className="bi bi-info-circle-fill"></i> Get started by searching
              </div>
            ) : (
              <div className="row mt-4">
                {searchResults.map((resource, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card h-100" style={{borderColor:"gray"}}>{/* Border for card */}
                      <img 
                        src={resource.file_urls[0]} 
                        className="card-img-top" 
                        alt={resource.title} 
                        style={{ height: '150px', objectFit: 'cover' }} 
                      />
                      <div className="card-body">
                        <h5 className="card-title">{resource.title}</h5>
                        <p className="card-text" style={{color:"gray"}}>{resource.description.slice(0, 100)}...</p>

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

                        <button onClick={() => handleViewPaper(resource)} className="btn btn-dark mt-2 w-100">
                          View Resource
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CTHome;
