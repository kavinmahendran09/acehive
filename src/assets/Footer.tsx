import React, { useState } from 'react';
import supabase from './supabaseClient'; // Ensure this path matches your project structure

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'danger' | null>(null);

  const handleEmailSubmission = async () => {
    if (!email) {
      setAlertType('danger');
      setSubmissionStatus('Please enter a valid email address.');
      dismissAlertAfterTimeout();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('collaborations')
        .insert([{ email }]);

      if (error) {
        console.error('Error saving email:', error);
        setAlertType('danger');
        setSubmissionStatus('Failed to submit. Please try again later.');
        dismissAlertAfterTimeout();
        return;
      }

      console.log('Email submitted successfully:', data);
      setAlertType('success');
      setSubmissionStatus('Submitted successfully! We’ll get back to you.');
      setEmail(''); // Clear the input field
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
    <footer className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5>University Resources</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">CT Papers</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Semester Papers</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Study Materials</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Support & Help</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Contact Support</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">FAQs</a>
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
              <p>If you're interested in partnerships, promotions, or collaborations, let's connect!</p>
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
                <button className="btn btn-primary" type="submit">Connect</button>
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
