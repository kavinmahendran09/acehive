import React from 'react';

interface FiltersProps {
  year: string | null;
  degree: string | null;
  specialisation: string | null;
  subject: string | null;
  elective: string | null;
  setYear: React.Dispatch<React.SetStateAction<string | null>>;
  setDegree: React.Dispatch<React.SetStateAction<string | null>>;
  setSpecialisation: React.Dispatch<React.SetStateAction<string | null>>;
  setSubject: React.Dispatch<React.SetStateAction<string | null>>;
  setElective: React.Dispatch<React.SetStateAction<string | null>>;
  handleSearch: () => void;
  warning: string | null;
}

const Filters: React.FC<FiltersProps> = ({
  year,
  degree,
  specialisation,
  subject,
  elective,
  setYear,
  setDegree,
  setSpecialisation,
  setSubject,
  setElective,
  handleSearch,
  warning
}) => {
  // Define options for specialisation and subjects/electives based on conditions
  const specialisationOptions = year === '3rd Year' && degree === 'Computer Science'
    ? [
        "Internet of Things",
        "Data Science",
        "Information Technology",
        "Artificial Intelligence",
        "Cloud Computing",
        "Cyber Security",
        "Computer Networking",
        "Gaming Technology",
        "Artificial Intelligence and Machine Learning",
        "Business Systems",
        "Big Data Analytics",
        "Block Chain Technology",
        "Software Engineering",
        "Computer Science and Engineering",
      ]
    : ["Course 1", "Course 2", "Course 3"];

  const subjectOptions =
    specialisation === "Artificial Intelligence and Machine Learning"
      ? ["Computer Networks", "Discrete Mathematics", "Machine Learning", "Formal Language and Automata"]
      : ["Subject 1", "Subject 2", "Subject 3"];

  const electiveOptions =
    specialisation === "Artificial Intelligence and Machine Learning"
      ? ["Disaster Mitigation and Management", "Gen AI", "Cloud Computing"]
      : ["Elective 1", "Elective 2", "Elective 3"];

  const handleYearChange = (y: string) => {
    setYear(y);
    setSpecialisation(null); // Reset specialisation
    setSubject(null); // Reset subject
    setElective(null); // Reset elective
  };

  const handleDegreeChange = (d: string) => {
    setDegree(d);
    setSpecialisation(null); // Reset specialisation
    setSubject(null); // Reset subject
    setElective(null); // Reset elective
  };

  return (
    <div className="col-md-3">
      <h3>Filters</h3>
      <div className="mb-3">
        <h5>Year</h5>
        <div className="list-group">
          {['1st Year', '2nd Year', '3rd Year'].map((y) => (
            <button
              key={y}
              type="button"
              className={`list-group-item list-group-item-action ${year === y ? 'active' : ''}`}
              onClick={() => handleYearChange(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <h5>Degree</h5>
        <div className="list-group">
          {['Computer Science', 'Biotechnology', 'Electrical', 'ECE', 'Mechanical', 'Civil', 'Aerospace'].map((d) => (
            <button
              key={d}
              type="button"
              className={`list-group-item list-group-item-action ${degree === d ? 'active' : ''}`}
              onClick={() => handleDegreeChange(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <h5>Specialisation</h5>
        <select
          className="form-select"
          value={specialisation || ''}
          onChange={(e) => setSpecialisation(e.target.value)}
        >
          <option value="" disabled>
            Select Specialisation
          </option>
          {specialisationOptions.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <h5>Subject</h5>
        <select
          className="form-select"
          value={subject || ''}
          onChange={(e) => {
            setSubject(e.target.value);
            setElective(null); // Reset elective when subject changes
          }}
          disabled={!year || !degree || !specialisation}
        >
          <option value="" disabled>
            Select Subject
          </option>
          {subjectOptions.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <h5>Elective</h5>
        <select
          className="form-select"
          value={elective || ''}
          onChange={(e) => {
            setElective(e.target.value);
            setSubject(null); // Reset subject when elective changes
          }}
          disabled={!year || !degree || !specialisation}
        >
          <option value="" disabled>
            Select Elective
          </option>
          {electiveOptions.map((elec) => (
            <option key={elec} value={elec}>
              {elec}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-dark w-100 mt-3" onClick={handleSearch}>
        Search
      </button>
      {warning && (
        <div className="alert alert-danger mt-2" role="alert">
          {warning}
        </div>
      )}
    </div>
  );
};

export default Filters;
