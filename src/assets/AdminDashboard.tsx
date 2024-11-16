import React, { useState } from 'react';
import supabase from './supabaseClient'; // Ensure you use named import if you're using that

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [year, setYear] = useState('');
  const [degree, setDegree] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [subject, setSubject] = useState('');
  const [elective, setElective] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [duplicates, setDuplicates] = useState<any[]>([]); // State to hold duplicate entries

  // Check for duplicate resources based on form input
  const handleCheckDuplicates = async () => {
    setError(''); // Clear previous errors

    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('year', year)
      .eq('degree', degree)
      .eq('specialisation', specialisation)
      .eq('subject', subject)
      .eq('elective', elective)
      .eq('resource_type', resourceType);

    if (error) {
      setError('Error fetching data: ' + error.message);
    } else {
      setDuplicates(data); // Update the duplicates state with the fetched data
    }
  };

  // Handle form submission and data insert
  const handleSubmit = async () => {
    // Check if any required fields are empty
    if (!year || !degree || !specialisation || !subject || !elective || !resourceType || !title || !description || fileUrls.length === 0 || tags.length === 0) {
      setError('Please fill in all the fields before submitting.');
      return; // Prevent submission if any required field is empty
    }
  
    // Proceed with inserting new resource if all fields are filled
    const { error: insertError } = await supabase.from('resources').insert([
      {
        year,
        degree,
        specialisation,
        subject,
        elective,
        resource_type: resourceType,
        title,
        description,
        file_urls: fileUrls,
        tags,
      },
    ]);
  
    if (insertError) {
      setError('Error inserting resource: ' + insertError.message);
    } else {
      setSuccessMessage('Resource uploaded successfully!');
      // Reset form on success
      setYear('');
      setDegree('');
      setSpecialisation('');
      setSubject('');
      setElective('');
      setResourceType('');
      setTitle('');
      setDescription('');
      setFileUrls([]);
      setTags([]);
      setError(''); // Clear any existing errors after successful upload
    }
  };
  
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="row">
        {/* Form Fields in a card-like layout */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="card-title text-primary">Resource Details</h5>
            <div className="form-group mb-3">
              <label className="font-weight-bold">Year</label>
              <input
                type="text"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Degree</label>
              <input
                type="text"
                className="form-control"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Specialisation</label>
              <input
                type="text"
                className="form-control"
                value={specialisation}
                onChange={(e) => setSpecialisation(e.target.value)}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Subject</label>
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Elective</label>
              <input
                type="text"
                className="form-control"
                value={elective}
                onChange={(e) => setElective(e.target.value)}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Resource Type</label>
              <input
                type="text"
                className="form-control"
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
              />
            </div>
  
            <button className="btn btn-warning mt-3 w-100" onClick={handleCheckDuplicates}>
              <i className="fas fa-search"></i> Check for Duplicates
            </button>
          </div>
        </div>
  
        {/* Display duplicates in a table format, full width */}
        <div className="col-12">
          {duplicates.length > 0 && (
            <div className="card shadow-sm p-4 mb-4">
              <h5 className="card-title text-warning">Duplicate Resources</h5>
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Degree</th>
                    <th>Specialisation</th>
                    <th>Subject</th>
                    <th>Elective</th>
                    <th>Resource Type</th>
                    <th>Title</th>
                    <th>Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {duplicates.map((duplicate, index) => (
                    <tr key={index}>
                      <td>{duplicate.year}</td>
                      <td>{duplicate.degree}</td>
                      <td>{duplicate.specialisation}</td>
                      <td>{duplicate.subject}</td>
                      <td>{duplicate.elective}</td>
                      <td>{duplicate.resource_type}</td>
                      <td>{duplicate.title}</td>
                      <td>{duplicate.tags.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  
        {/* Move the form fields and buttons here */}
        <div className="col-md-12">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="card-title text-primary">Additional Resource Details</h5>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">File URLs (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                value={fileUrls.join(', ')}
                onChange={(e) => setFileUrls(e.target.value.split(',').map((url) => url.trim()))}
              />
            </div>
  
            <div className="form-group mb-3">
              <label className="font-weight-bold">Tags (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                value={tags.join(', ')}
                onChange={(e) => setTags(e.target.value.split(',').map((tag) => tag.trim()))}
              />
            </div>
  
            {/* Error or success message */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
  
            {/* Submit and Logout buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-primary" onClick={handleSubmit}>
                <i className="fas fa-upload"></i> Submit
              </button>
              <button className="btn btn-danger" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default AdminDashboard;
