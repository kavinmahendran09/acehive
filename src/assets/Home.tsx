import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaBook, FaClipboard, FaFolderOpen, FaTable } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import supabase from './supabaseClient'; 

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'danger' | null>(null);

  const handleGetStarted = () => {
    const resourceSection = document.getElementById('resource-section');
    if (resourceSection) {
      resourceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeedbackSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !comments) {
      setAlertType('danger');
      setSubmissionStatus('Please fill in both the email and comments.');
      dismissAlertAfterTimeout();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert([{ email, comments }]);

      if (error) {
        console.error('Error saving feedback:', error);
        setAlertType('danger');
        setSubmissionStatus('Failed to submit feedback. Please try again later.');
        dismissAlertAfterTimeout();
        return;
      }

      console.log('Feedback submitted successfully:', data);
      setAlertType('success');
      setSubmissionStatus('Feedback submitted successfully! Thank you for your input.');
      setEmail(''); // Clear the input fields
      setComments('');
      dismissAlertAfterTimeout();
    } catch (err) {
      console.error('Unexpected error:', err);
      setAlertType('danger');
      setSubmissionStatus('An unexpected error occurred. Please try again.');
      dismissAlertAfterTimeout();
    }
  };

  const dismissAlertAfterTimeout = () => {
    setTimeout(() => {
      setSubmissionStatus(null);
      setAlertType(null);
    }, 4000); // 4 seconds
  };

  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container px-3 px-md-5">
          <h1 className="display-4 font-weight-bold" style={{fontWeight :"500"}}>Welcome to <strong>Acehive</strong></h1>
          <p className="lead" style={{ color: '#A9A9A9' }}>
            Your one-stop destination for Resources!
          </p>
          <div className="mt-4">
            <button className="btn btn-light btn-lg me-3" onClick={handleGetStarted}>
              Get Started
            </button>
            <Link to="/about" className="btn btn-outline-light btn-lg">Learn More</Link>
          </div>
        </div>
      </header>
      

      {/* Filter Banner Section */}
      <section className="container my-5 px-3 px-md-5" style={{ padding: '30px' }}>
        <div className="d-flex flex-column flex-lg-row align-items-center">
          {/* Text Content */}
          <div 
            className="text-content d-flex flex-column justify-content-between"
            style={{ flex: 1 }}
          >
            <h1 className="display-5 fw-bold mb-3" style={{ marginTop: 'auto' }}>
              Find Resources Instantly
            </h1>
            <p className="lead">
              Simplify your academic journey with quick access to curated resources. 
            </p>
            <ul className="list-unstyled mt-4">
              <li className="mb-3">
                <i className="text-dark me-2" style={{ fontSize: '1.2rem' }}>✔</i>
                Filter by year, subject, and specialization.
              </li>
              <li className="mb-3">
                <i className="text-dark me-2" style={{ fontSize: '1.2rem' }}>✔</i>
                Quickly locate study materials and papers.
              </li>
              <li className="mb-2">
                <i className="text-dark me-2" style={{ fontSize: '1.2rem' }}>✔</i>
                Save time with precise search results.
              </li>
            </ul>
          </div>
          {/* Image Content */}
          <div 
            className="image-content ms-lg-4 mt-4 mt-lg-0"
            style={{ maxWidth: '300px', flexShrink: 0 }}
          >
            <img 
              src="https://jzgisslizhrhnovplcuz.supabase.co/storage/v1/object/public/Web%20Sources/Images/dark_selection_filter.png" 
              alt="Filter System" 
              className="img-fluid w-100" 
            />
          </div>
        </div>
      </section>






      {/* Features Section */}
      <section className="container px-4 py-5">
      <h2 className="pb-2 border-bottom">Explore the Features of Acehive</h2>

      <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
        <div className="col d-flex flex-column align-items-start gap-2">
          <h2 className="fw-bold text-body-emphasis">Streamline Your Study Preparation with Acehive</h2>
          <p className="text-body-secondary">
            Discover the powerful features of Acehive that help students efficiently access and organize university resources, including Cycle Test papers, Semester papers, and study materials.
          </p>
          <Link to="/ct-home" className="btn btn-dark">Get Started</Link>
        </div>

        <div className="col">
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            <div className="col d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-dark bg-gradient fs-4 rounded-3" style={{ width: '50px', height: '50px' }}>
                <FaClipboard size={24} />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Organized Resource Library</h4>
              <p className="text-body-secondary">
                Access a well-organized library of resources sorted by subject, year, and resource type, helping you quickly find the materials you need.
              </p>
            </div>

            <div className="col d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-dark bg-gradient fs-4 rounded-3" style={{ width: '50px', height: '50px' }}>
                <FaFolderOpen size={24} />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Smart Filtering</h4>
              <p className="text-body-secondary">
                Quickly filter through resources based on your requirements, such as subject, type of paper, and year, making your study preparation more efficient.
              </p>
            </div>

            <div className="col d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-dark bg-gradient fs-4 rounded-3" style={{ width: '50px', height: '50px' }}>
                <FaBook size={24} />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Fast Access</h4>
              <p className="text-body-secondary">
                With fast access to thousands of resources, Acehive minimizes wait time and lets you focus on what matters: studying and preparing for exams.
              </p>
            </div>

            <div className="col d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-dark bg-gradient fs-4 rounded-3" style={{ width: '50px', height: '50px' }}>
                <FaTable size={24} />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Detailed Insights</h4>
              <p className="text-body-secondary">
                Get detailed insights into resource usage and performance, helping you track your progress and plan your study sessions more effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    {/* Resources Cards Section */}
    <div className="container my-5 px-3 px-md-5" style={{ padding: '30px'}} id="resource-section">
      <h2 className="text-center mb-5" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2.5rem', color: '#333' }}>
        Explore Our Resources
      </h2>
      <div className="row mt-4">
        {/* CT Papers Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100 rounded-3" style={{ position: 'relative', border: '2px solid black', backgroundColor: 'white' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className="icon-container mb-3" style={{
                width: '120px', height: '120px', borderRadius: '50%', background: '#343a40', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                <FaClipboard size={70} className="text-white" />
              </div>
              <h5 className="card-title mt-4" style={{ fontSize: '1.5rem', color: '#444', fontWeight: 'bold' }}>CT Papers</h5>
              <p className="card-text mb-4" style={{ color: '#777' }}>Find all your Cycle Test papers sorted by subject and year.</p>
              <Link to="/ct-home" className="btn btn-dark">Explore CT Papers</Link>
            </div>
          </div>
        </div>
        {/* Sem Papers Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100 rounded-3" style={{ position: 'relative', border: '2px solid black', backgroundColor: 'white' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className="icon-container mb-3" style={{
                width: '120px', height: '120px', borderRadius: '50%', background: '#343a40', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                <FaFolderOpen size={70} className="text-white" />
              </div>
              <h5 className="card-title mt-4" style={{ fontSize: '1.5rem', color: '#444', fontWeight: 'bold' }}>Sem Papers</h5>
              <p className="card-text mb-4" style={{ color: '#777' }}>Access all Semester papers and exams from previous years.</p>
              <Link to="/ct-home" className="btn btn-dark" state={{ resourceType: "Sem Paper" }}>Explore Sem Papers</Link>
            </div>
          </div>
        </div>
        {/* Study Materials Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100 rounded-3" style={{ position: 'relative', border: '2px solid black', backgroundColor: 'white' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className="icon-container mb-3" style={{
                width: '120px', height: '120px', borderRadius: '50%', background: '#343a40', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                <FaBook size={70} className="text-white" />
              </div>
              <h5 className="card-title mt-4" style={{ fontSize: '1.5rem', color: '#444', fontWeight: 'bold' }}>Study Materials</h5>
              <p className="card-text mb-4" style={{ color: '#777' }}>Browse all study materials and resources for exam preparation.</p>
              <Link to="/ct-home" className="btn btn-dark" state={{ resourceType: "Study Material" }}>Explore Study Materials</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stay Tuned Section Inside a Dotted Border Container */}
      <div className="container mt-5 p-4" style={{
        border: '2px dotted #444', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'
      }}>
        <div className="text-center">
          <h3 className="mb-3" style={{ color: '#444', fontWeight: 'bold' }}>
            More to Come... Stay Tuned!
          </h3>
          <p className="lead text-muted" style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            We're working on adding even more resources to make your study journey even better. Check back soon for exciting updates!
          </p>
        </div>
      </div>
    </div>


    {/* Feedback Form Section */}
    <section className="container px-3 px-md-5 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">We Value Your Feedback</h1>
          <p className="col-lg-10 fs-4 text-muted">Please provide your feedback and suggestions to help us improve. Your input is valuable for enhancing your experience.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleFeedbackSubmission}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="floatingComments"
                placeholder="Enter your feedback"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              ></textarea>
              <label htmlFor="floatingComments">Your Comments</label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit">Submit Feedback</button>
            <hr className="my-4" />
            <small className="text-body-secondary">Your feedback is valuable to us! Thank you for helping us improve.</small>
            {submissionStatus && (
              <div className={`alert alert-${alertType} mt-3`} role="alert">
                {submissionStatus}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>


      <Footer />
    </div>
  );
};

export default Home;
