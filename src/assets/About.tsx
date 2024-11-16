import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; 
import { FaUsers, FaBullseye, FaRegLightbulb } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">About Us</h1>
          <p className="lead">Learn more about our mission, values, and the team behind <strong>Acehive</strong>.</p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="display-5 mb-4">Our Mission</h2>
          <p className="lead mb-4">
            At <strong>Acehive</strong>, we strive to provide students with a one-stop solution for all their academic needs.
            From Cycle Test and Semester papers to essential study materials, we are here to support your academic journey.
          </p>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <FaBullseye size={50} className="text-primary mb-3" />
                  <h5 className="card-title">Our Goal</h5>
                  <p className="card-text">To create an accessible and reliable platform for students to access academic resources.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <FaUsers size={50} className="text-danger mb-3" />
                  <h5 className="card-title">Our Community</h5>
                  <p className="card-text">Supporting thousands of students by providing quality resources and study materials.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <FaRegLightbulb size={50} className="text-success mb-3" />
                  <h5 className="card-title">Our Vision</h5>
                  <p className="card-text">To become the leading platform for academic resources at universities worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card text-center">
                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Team Member" />
                <div className="card-body">
                  <h5 className="card-title">M Kavin Bharathi</h5>
                  <p className="card-text">Project Lead & Developer</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card text-center">
                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Team Member" />
                <div className="card-body">
                  <h5 className="card-title">Tharun Haribabu</h5>
                  <p className="card-text">Content Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Thanks Section */}
          <div className="mt-5 text-center">
            <h3>Special Thanks</h3>
            <p>We would like to extend our gratitude to the following individuals for their invaluable support:</p>
            <ul className="list-unstyled">
              <li>Placeholder</li>
              <li>Placeholder</li>
              <li>Placeholder</li>
              <li>Placeholder</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Impact</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h5>Resources Uploaded</h5>
              <div className="display-4 text-primary">400+</div>
              <p>Curated resources and growing!</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Students Reached</h5>
              <div className="display-4 text-success">3,000+</div>
              <p>Supporting SRM students with essential resources</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Goals Achieved</h5>
              <div className="display-4 text-warning">60%</div>
              <p>On track to achieve 100% of our annual targets</p>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  What resources do you provide?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  We provide a variety of resources, including CT papers, Semester papers, and study materials, all organized by subject and year.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  How do I access resources?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Simply navigate to the resource section on our homepage, where you can filter and select the resources you need.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  How can I contact support?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can reach us through our contact page or email us at archiveatsrm@gmail.com.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
