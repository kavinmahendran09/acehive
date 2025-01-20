import React, { useState } from "react";
import { FaTools } from "react-icons/fa";

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
  warning,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubjectSelected, setIsSubjectSelected] = useState(true); 

  const specialisationOptions =
    degree === "Computer Science"
      ? [
          "Core",
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
          "Internet of Things",
        ]
      : degree === "Biotechnology"
      ? [
          "Biotechnology Core",
          "Biotechnology (Computational Biology)",
          "Biotechnology W/S in Food Technology",
          "Biotechnology W/S in Genetic Engineering",
          "Biotechnology W/S in Regenerative Medicine",
        ]
      : degree === "Electrical"
      ? ["Electrical & Electronics Engineering", "Electric Vehicle Technology"]
      : degree === "Civil"
      ? ["Civil Engineering Core", "Civil Engineering with Computer Applications"]
      : degree === "ECE"
      ? [
          "Electronics & Communication Engineering",
          "Cyber Physical Systems",
          "Data Sciences",
          "Electronics and Computer Engineering",
          "VLSI Design and Technology",
        ]
      : degree === "Automobile"
      ? ["Core", "Automotive Electronics", "Vehicle Testing"]
      : degree === "Mechanical"
      ? [
          "Core",
          "Automation and Robotics",
          "AIML",
          "Mechatronics Engineering Core",
          "Autonomous Driving Technology",
          "Immersive Technologies",
          "Industrial IoT",
          "Robotics",
        ]
      : [];

  const subjectOptions =
    year === "1st Year"
      ? degree === "Biotechnology"
        ? [
            "Communicative English",
            "Calculus and Linear Algebra",
            "Electrical and Electronics Engineering",
            "Semiconductor Physics and Computational Methods",
            "Programming for Problem Solving",
            "Advanced Calculus and Complex Analysis",
            "Chemistry",
            "Introduction to Computational Biology",
            "Object Oriented Design and Programming",
            "Philosophy of Engineering",
            "Cell Biology",
            "Biochemistry",
          ]
        : [
            "Communicative English",
            "Calculus and Linear Algebra",
            "Electrical and Electronics Engineering",
            "Semiconductor Physics and Computational Methods",
            "Programming for Problem Solving",
            "Advanced Calculus and Complex Analysis",
            "Chemistry",
            "Introduction to Computational Biology",
            "Object Oriented Design and Programming",
            "Philosophy of Engineering",
          ]
      : specialisation === "Artificial Intelligence and Machine Learning"
      ? ["Computer Networks", "Discrete Mathematics", "Machine Learning", "Formal Language and Automata"]
      : [];

  const electiveOptions = [
    "French",
    "Spanish",
    "German",
    "Japanese",
    "Korean",
    "Chinese",
  ];

  const handleYearChange = (y: string) => {
    setYear(y);
    setSpecialisation(null);
    setSubject(null);
    setElective(null);
  };

  const handleDegreeChange = (d: string) => {
    setDegree(d);
    setSpecialisation(null);
    setSubject(null);
    setElective(null);
  };

  const handleSearchClick = async () => {
    setIsLoading(true);
    await handleSearch();
    setIsLoading(false);
  };

  return (
    <div className="col-md-3">
      <h3>Filters</h3>
      <div className="mb-3">
        <h5>Year</h5>
        <div className="list-group">
          {["1st Year", "2nd Year", "3rd Year"].map((y) => (
            <button
              key={y}
              type="button"
              className={`list-group-item list-group-item-action d-flex align-items-center ${
                year === y ? "bg-dark text-white" : ""
              } ${y !== "1st Year" ? "disabled" : ""}`}
              onClick={() => y === "1st Year" && handleYearChange(y)}
              disabled={y !== "1st Year"}
            >
              {y}
              {y !== "1st Year" && (
                <span className="ms-auto text-muted d-flex align-items-center" title="Under work">
                  <FaTools className="ms-2" />
                  <small className="ms-1">(Work in Progress)</small>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <h5>Degree</h5>
        <div className="list-group">
          {["Computer Science", "Biotechnology", "Electrical", "ECE", "Mechanical", "Civil", "Automobile"].map((d) => (
            <button
              key={d}
              type="button"
              className={`list-group-item list-group-item-action ${degree === d ? "bg-dark text-white" : ""}`}
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
          value={specialisation || ""}
          onChange={(e) => setSpecialisation(e.target.value)}
          disabled={!year || !degree}
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
        <div className="d-flex">
          <button
            className={`btn btn-outline-dark me-2 ${isSubjectSelected ? "active" : ""}`}
            onClick={() => setIsSubjectSelected(true)}
          >
            Subject
          </button>
          <button
            className={`btn btn-outline-dark ${!isSubjectSelected ? "active" : ""}`}
            onClick={() => setIsSubjectSelected(false)}
          >
            Language / Elective
          </button>
        </div>
      </div>


      {isSubjectSelected && (
        <div className="mb-3">
          <select
            className="form-select"
            value={subject || ""}
            onChange={(e) => {
              setSubject(e.target.value);
              setElective(null);
            }}
            disabled={!year || !degree || !specialisation}
          >
            {subjectOptions.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>
      )}

      {!isSubjectSelected && (
        <div className="mb-3">
          <select
            className="form-select"
            value={elective || ""}
            onChange={(e) => {
              setElective(e.target.value);
              setSubject(null);
            }}
            disabled={!year || !degree || !specialisation}
          >
            {electiveOptions.map((elec) => (
              <option key={elec} value={elec}>
                {elec}
              </option>
            ))}
          </select>
        </div>
      )}

      {year !== null && year !== "1st Year" && (
        <small className="text-danger">
          You can select either a Subject or an Elective, but not both.
        </small>
      )}

      <button
        className="btn btn-dark w-100 mt-3"
        onClick={handleSearchClick}
        disabled={!subject && !elective || isLoading}
      >
        {isLoading ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          "Search"
        )}
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
