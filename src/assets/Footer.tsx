import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'danger' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmission = async (retryCount = 0) => {
    if (!email) {
      setAlertType('danger');
      setSubmissionStatus('Please enter a valid email address.');
      dismissAlertAfterTimeout();
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('collaborations')
        .insert([{ email }]);

      if (error) {
        console.error('Error saving email:', error);

        if (retryCount < 2) {
          console.log(`Retrying... Attempt ${retryCount + 1}`);
          await handleEmailSubmission(retryCount + 1); 
        } else {
          setAlertType('danger');
          setSubmissionStatus('Failed to submit. Please try again later.');
        }
        dismissAlertAfterTimeout();
        return;
      }

      console.log('Email submitted successfully:', data);
      setAlertType('success');
      setSubmissionStatus('Submitted successfully! We’ll get back to you.');
      setEmail('');
    } catch (err) {
      console.error('Unexpected error:', err);

      if (retryCount < 2) {
        console.log(`Retrying... Attempt ${retryCount + 1}`);
        await handleEmailSubmission(retryCount + 1); 
      } else {
        setAlertType('danger');
        setSubmissionStatus('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
      dismissAlertAfterTimeout();
    }
  };

  const dismissAlertAfterTimeout = () => {
    setTimeout(() => {
      setSubmissionStatus(null);
      setAlertType(null);
    }, 4000);
  };

  const handleScrollToBottom = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5>University Resources</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/ct-home" className="nav-link p-0 text-white" state={{ resourceType: "CT Paper" }}>CT Papers</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/ct-home" className="nav-link p-0 text-white" state={{ resourceType: "Sem Paper" }}>Semester Papers</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/ct-home" className="nav-link p-0 text-white" state={{ resourceType: "Study Materials" }}>Study Materials</Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Support & Help</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <span
                  className="nav-link p-0 text-white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleScrollToBottom('/about')}
                >
                  FAQs
                </span>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="mailto:archiveatsrm@gmail.com"
                  className="nav-link p-0 text-white"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Privacy & Terms</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/PrivacyPolicy" className="nav-link p-0 text-white" style={{ cursor: 'pointer' }}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEmailSubmission();
              }}
            >
              <h5>Want to Collaborate or Promote with Us?</h5>
              <p>If you're interested in promotions, or collaborations, let's connect!</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input
                  id="newsletter1"
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-outline-light" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            </form>
            {submissionStatus && (
              <div className={`alert alert-${alertType} mt-3`} role="alert">
                {submissionStatus}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>&copy; 2024 Acehive, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
