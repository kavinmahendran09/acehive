import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; 
import { FaBook, FaClipboard, FaFolderOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  const handleGetStarted = () => {
    const resourceSection = document.getElementById('resource-section');
    if (resourceSection) {
      resourceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container px-3 px-md-5">
          <h1 className="display-4 font-weight-bold">Welcome to <strong>Acehive</strong></h1>
          <p className="lead" style={{ color: '#A9A9A9' }}>
            Your one-stop destination for university question papers and subject portions!
          </p>
          <div className="mt-4">
            <button className="btn btn-light btn-lg me-3" onClick={handleGetStarted}>
              Get Started
            </button>
            <Link to="/about" className="btn btn-outline-light btn-lg">Learn More</Link>
          </div>
        </div>
      </header>

      {/* Spacer after Banner */}
      <div className="my-4"></div>

      {/* Resource Count Section */}
      <section id="resource-section" className="bg-light text-center py-5">
        <div className="container px-3 px-md-5">
          <h2 className="display-6">
            Over <span className="text-primary" style={{ fontSize: '3rem', fontWeight: 'bold' }}>400+</span> resource materials available for students
          </h2>
        </div>
      </section>

      {/* Filter Banner Section */}
      <section className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">Find Exactly What You Need</h1>
            <p className="lead">
              Our advanced filtering system lets you easily search through hundreds of resources by subject, year, and type. 
              Whether you’re looking for Cycle Test papers, semester exams, or study materials, you can locate the exact resources you need with just a few clicks.
            </p>
            <p className="text-muted">
              Save time and streamline your study preparation with our intuitive filter options, designed specifically for SRM students.
            </p>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img
              src="https://jzgisslizhrhnovplcuz.supabase.co/storage/v1/object/public/Web%20Sources/Images/Filter3.png"
              alt="Filter section preview"
              className="rounded-lg-3 img-fluid"
              style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Resource View Banner Section */}
      <section className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold">Browse Resources</h1>
        <div className="col-lg-7 mx-auto">
          <p className="lead mb-4">
            Dive into a comprehensive collection of study materials, cycle test papers, and semester papers, all categorized by subject and year. Our intuitive interface helps you quickly find the resources you need, covering a wide range of topics to support your academic journey.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link to="/ct-home" className="btn btn-dark btn-lg px-4 me-sm-3">Get Started</Link>
            <Link to="/about" className="btn btn-outline-dark btn-lg">Learn More</Link>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
          <div className="container px-5">
            <img
              src="https://jzgisslizhrhnovplcuz.supabase.co/storage/v1/object/public/Web%20Sources/Images/resource%20pic.png"
              alt="Example screenshot"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              width="700"
              height="500"
              loading="lazy"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Spacer after Hero Section */}
      <div className="my-5"></div>

      {/* Resources Cards */}
      <div className="container my-5 px-3 px-md-5">
        <h2 className="text-center mb-4">Explore Our Resources</h2>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <FaClipboard size={80} className="text-dark mb-3" />
                <h5 className="card-title">CT Papers</h5>
                <p className="card-text">Find all your Cycle Test papers sorted by subject and year.</p>
                <Link to="/ct-home" className="btn btn-dark">View CT Papers</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <FaBook size={80} className="text-dark mb-3" />
                <h5 className="card-title">Sem Papers</h5>
                <p className="card-text">Access Semester papers for comprehensive exam preparation.</p>
                <Link to="/ct-home" className="btn btn-dark">View Sem Papers</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <FaFolderOpen size={80} className="text-dark mb-3" />
                <h5 className="card-title">Study Materials</h5>
                <p className="card-text">Get additional resources and materials to help you succeed in exams.</p>
                <Link to="/ct-home" className="btn btn-dark">View Materials</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <section className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">We Value Your Feedback</h1>
            <p className="col-lg-10 fs-4">Please provide your feedback and suggestions to help us improve. Your input is valuable for enhancing your experience.</p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="floatingComments"
                  placeholder="Enter your feedback"
                  required
                ></textarea>
                <label htmlFor="floatingComments">Your Comments</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">Submit Feedback</button>
              <hr className="my-4" />
              <small className="text-body-secondary">By submitting feedback, you agree to our terms of use.</small>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
