import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; 
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4" style={{fontWeight :"500"}}>About Us</h1>
          <p className="lead">Learn more about our mission, values, and the team behind <strong>Acehive</strong>.</p>
        </div>
      </header>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-6 mb-4 text-center">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">M Kavin Bharathi</h5>
                  <p className="card-text">Project Developer</p>
                  {/* Social Links */}
                  <div className="d-flex align-items-center justify-content-center">
                  <a href="https://www.linkedin.com/in/kavin-bharathi-081577252/" target="_blank" rel="noopener noreferrer" className="text-primary mx-2">
                      <FaLinkedin size={30} />
                    </a>
                    <a href="https://github.com/kavinmahendran09" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                      <FaGithub size={30} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4 text-center">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Tharun Haribabu</h5>
                  <p className="card-text">Content Manager</p>
                  {/* Social Links */}
                  <div className="d-flex align-items-center justify-content-center">
                    <a href="https://www.linkedin.com/in/tharun-haribabu/" target="_blank" rel="noopener noreferrer" className="text-primary mx-2">
                      <FaLinkedin size={30} />
                    </a>
                    <a href="https://github.com/Tharun-1604" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                      <FaGithub size={30} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Management Team Section */}
      <section className="py-5">
        <div className="container" style={{ maxWidth: '700px' }}>
          <h3 className="text-center mb-4">Resource Management Team</h3>
          <div className="d-flex justify-content-center flex-wrap">
            <a href="https://www.linkedin.com/in/amogha-vemuri-b9534a267/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Amogha
            </a>
            <a href="https://www.linkedin.com/in/ashmit-sharma-9a69b1325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Ashmit Sharma
            </a>
            <a href="https://www.linkedin.com/in/dhiya-chandrasekar-824099259" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              C Dhiya
            </a>
            <a href="https://www.linkedin.com/in/gladdin-shruthi-j-6129bb2bb/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Gladdin Shruthi J
            </a>
            <a href="https://www.linkedin.com/in/imran-afsar-basha-b44409299/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Imran Afsar Basha
            </a>
            <a href="https://www.linkedin.com/in/karan-pillai-010094285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Karan Pillai
            </a>
            <a href="https://www.linkedin.com/in/lakshayakrishnaraj/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Lakshya Krishnaraj
            </a>
            <a href="https://www.linkedin.com/in/neeraj-variar-ab685530a/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Neeraj Varior
            </a>
            <a href="https://www.linkedin.com/in/nayantra-ramakrishnan-b5b8ba284/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Nayantra Ramakrishnan
            </a>
            <a href="https://www.linkedin.com/in/shree-srishti-mahesh-b5293b1aa/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Shree Srishti Mahesh
            </a>
            <a href="https://www.linkedin.com/in/srinija-gottumukkala" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
            Srinija Gottumukkala
            </a>
            <a href="https://www.linkedin.com/in/sasmita-p-578b13289" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Sasmita Pangulur
            </a>
            <a href="https://www.linkedin.com/in/vivish-adhik-b75917285/" target="_blank" rel="noopener noreferrer" className="mx-3 mb-3 text-center col-12 col-md-auto">
              Vivish Adhik
            </a>
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
              <div className="display-4 text-primary">250+</div>
              <p>Curated resources and growing!</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Students Reached</h5>
              <div className="display-4 text-success">300+</div>
              <p>Supporting SRM students with essential resources</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Goals Achieved</h5>
              <div className="display-4 text-warning">45%</div>
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
                <div className="accordion-body" style={{ fontWeight : '300' }}>
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
                <div className="accordion-body" style={{ fontWeight : '300' }}>
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
                <div className="accordion-body" style={{ fontWeight : '300' }}>
                  You can reach us through our contact page or email us at 
                  <a href="mailto:archiveatsrm@gmail.com" style={{ marginLeft: '5px'}}>archiveatsrm@gmail.com</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
