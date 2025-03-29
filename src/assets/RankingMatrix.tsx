"use client"

import type React from "react"
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface RankingFormData {
  tenthPercentage: string
  twelfthPercentage: string
  cgpa: string
  githubContributions: string
  githubFrequency: string
  githubCommunityProjects: string
  githubCollaborations: string
  codingBadges: string
  codingQuestions: string
  internshipExperience: string[]
  certifications: string[]
  projectsDone: string[]
  fullStackProject: string
  codingCompetitions: string[]
  inhouseProjects: string[]
  professionalMembership: string
  cccRank: string
}

const RankingMatrix: React.FC = () => {
  const [formData, setFormData] = useState<RankingFormData>({
    tenthPercentage: "",
    twelfthPercentage: "",
    cgpa: "",
    githubContributions: "",
    githubFrequency: "",
    githubCommunityProjects: "",
    githubCollaborations: "",
    codingBadges: "",
    codingQuestions: "",
    internshipExperience: [""],
    certifications: [""],
    projectsDone: [""],
    fullStackProject: "",
    codingCompetitions: [""],
    inhouseProjects: [""],
    professionalMembership: "",
    cccRank: "",
  })

  const [totalScore, setTotalScore] = useState<number | null>(null)
  const [scores, setScores] = useState<{ [key: string]: number }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof RankingFormData) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    })
  }

  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: keyof RankingFormData,
    index: number,
  ) => {
    if (
      field === "certifications" ||
      field === "projectsDone" ||
      field === "codingCompetitions" ||
      field === "inhouseProjects" ||
      field === "internshipExperience"
    ) {
      const newArray = [...(formData[field] as string[])]
      newArray[index] = e.target.value
      setFormData({
        ...formData,
        [field]: newArray,
      })
    }
  }

  const addArrayItem = (field: keyof RankingFormData) => {
    if (
      field === "certifications" ||
      field === "projectsDone" ||
      field === "codingCompetitions" ||
      field === "inhouseProjects" ||
      field === "internshipExperience"
    ) {
      const maxItems = {
        certifications: 5,
        projectsDone: 3,
        codingCompetitions: 4,
        inhouseProjects: 1,
        internshipExperience: 2,
      }

      const fieldArray = formData[field] as string[]
      if (fieldArray.length < maxItems[field as keyof typeof maxItems]) {
        setFormData({
          ...formData,
          [field]: [...fieldArray, ""],
        })
      }
    }
  }

  const removeArrayItem = (field: keyof RankingFormData, index: number) => {
    if (
      field === "certifications" ||
      field === "projectsDone" ||
      field === "codingCompetitions" ||
      field === "inhouseProjects" ||
      field === "internshipExperience"
    ) {
      const fieldArray = formData[field] as string[]
      if (fieldArray.length > 1) {
        const newArray = [...fieldArray]
        newArray.splice(index, 1)
        setFormData({
          ...formData,
          [field]: newArray,
        })
      }
    }
  }

  const calculateScore = () => {
    // Initialize scores object
    const calculatedScores: { [key: string]: number } = {}

    // 10th Percentage (2.5 marks)
    let tenthScore = 0
    if (formData.tenthPercentage === "96-100") tenthScore = 2.5
    else if (formData.tenthPercentage === "91-95") tenthScore = 2
    else if (formData.tenthPercentage === "86-90") tenthScore = 1.5
    else if (formData.tenthPercentage === "75-85") tenthScore = 1
    else if (formData.tenthPercentage === "below75") tenthScore = 0.5
    calculatedScores.tenthScore = tenthScore

    // 12th Percentage (2.5 marks)
    let twelfthScore = 0
    if (formData.twelfthPercentage === "96-100") twelfthScore = 2.5
    else if (formData.twelfthPercentage === "91-95") twelfthScore = 2
    else if (formData.twelfthPercentage === "86-90") twelfthScore = 1.5
    else if (formData.twelfthPercentage === "75-85") twelfthScore = 1
    else if (formData.twelfthPercentage === "below75") twelfthScore = 0.5
    calculatedScores.twelfthScore = twelfthScore

    // CGPA (5 marks)
    let cgpaScore = 0
    if (formData.cgpa === "above9.5") cgpaScore = 5
    else if (formData.cgpa === "9.1-9.5") cgpaScore = 4
    else if (formData.cgpa === "8.6-9.0") cgpaScore = 3
    else if (formData.cgpa === "7.5-8.5") cgpaScore = 2
    else if (formData.cgpa === "below7.5") cgpaScore = 1
    calculatedScores.cgpaScore = cgpaScore

    // GitHub Profile (15 marks)
    // Contributions (5 marks)
    let githubContributionsScore = 0
    if (formData.githubContributions === "above20") githubContributionsScore = 5
    else if (formData.githubContributions === "16-20") githubContributionsScore = 4
    else if (formData.githubContributions === "11-15") githubContributionsScore = 3
    else if (formData.githubContributions === "6-10") githubContributionsScore = 2
    else if (formData.githubContributions === "1-5") githubContributionsScore = 1
    else if (formData.githubContributions === "0") githubContributionsScore = 0

    // Frequency (2 marks)
    let githubFrequencyScore = 0
    if (formData.githubFrequency === "2perMonth") githubFrequencyScore = 2
    else if (formData.githubFrequency === "1perMonth") githubFrequencyScore = 1
    else if (formData.githubFrequency === "0") githubFrequencyScore = 0

    // Community Projects (3 marks)
    let githubCommunityProjectsScore = 0
    if (formData.githubCommunityProjects === "2") githubCommunityProjectsScore = 3
    else if (formData.githubCommunityProjects === "1") githubCommunityProjectsScore = 1.5
    else if (formData.githubCommunityProjects === "0") githubCommunityProjectsScore = 0

    // Collaborations (5 marks)
    let githubCollaborationsScore = 0
    if (formData.githubCollaborations === "3orMore") githubCollaborationsScore = 5
    else if (formData.githubCollaborations === "2") githubCollaborationsScore = 4
    else if (formData.githubCollaborations === "1") githubCollaborationsScore = 2
    else if (formData.githubCollaborations === "0") githubCollaborationsScore = 0

    const githubTotalScore =
      githubContributionsScore + githubFrequencyScore + githubCommunityProjectsScore + githubCollaborationsScore

    calculatedScores.githubScore = githubTotalScore

    // Coding Practice Platform (10 marks)
    // Badges (5 marks)
    let codingBadgesScore = 0
    if (formData.codingBadges === "5orMore") codingBadgesScore = 5
    else if (formData.codingBadges === "4") codingBadgesScore = 4
    else if (formData.codingBadges === "3") codingBadgesScore = 3
    else if (formData.codingBadges === "2") codingBadgesScore = 2
    else if (formData.codingBadges === "1") codingBadgesScore = 1
    else if (formData.codingBadges === "0") codingBadgesScore = 0

    // Questions (5 marks)
    let codingQuestionsScore = 0
    if (formData.codingQuestions === "above20") codingQuestionsScore = 5
    else if (formData.codingQuestions === "16-20") codingQuestionsScore = 4
    else if (formData.codingQuestions === "11-15") codingQuestionsScore = 3
    else if (formData.codingQuestions === "6-10") codingQuestionsScore = 2
    else if (formData.codingQuestions === "1-5") codingQuestionsScore = 1
    else if (formData.codingQuestions === "0") codingQuestionsScore = 0

    const codingTotalScore = codingBadgesScore + codingQuestionsScore
    calculatedScores.codingScore = codingTotalScore

    // Internship Experience (10 marks)
    let internshipScore = 0
    formData.internshipExperience.forEach((internship) => {
      if (internship === "iitNit") internshipScore += 5
      else if (internship === "srmPlacement") internshipScore += 5
      else if (internship === "fortune500") internshipScore += 4
      else if (internship === "smallCompanies") internshipScore += 3
      else if (internship === "lessThan3Months") internshipScore += 2
      else if (internship === "paidInternship") internshipScore += 1
    })
    internshipScore = Math.min(internshipScore, 10) // Max 10 marks
    calculatedScores.internshipScore = internshipScore

    // Skillset & Certifications (10 marks)
    let certificationsScore = 0
    formData.certifications.forEach((cert) => {
      if (cert === "standard") certificationsScore += 2
      else if (cert === "nptel") certificationsScore += 2
      else if (cert === "coursera") certificationsScore += 1
      else if (cert === "programming") certificationsScore += 1
      else if (cert === "udemy") certificationsScore += 0.5
    })
    certificationsScore = Math.min(certificationsScore, 10) // Max 10 marks
    calculatedScores.certificationsScore = certificationsScore

    // Projects Done (5 marks)
    let projectsScore = 0
    formData.projectsDone.forEach((project) => {
      if (project === "iitNitDrdo") projectsScore += 5
      else if (project === "government") projectsScore += 4
      else if (project === "mobileWeb") projectsScore += 3
      else if (project === "miniHigh") projectsScore += 2
      else if (project === "miniLow") projectsScore += 1
    })
    projectsScore = Math.min(projectsScore, 5) // Max 5 marks
    calculatedScores.projectsScore = projectsScore

    // Full Stack Developer Experience (5 marks)
    let fullStackScore = 0
    if (formData.fullStackProject === "yes") fullStackScore = 5
    else if (formData.fullStackProject === "no") fullStackScore = 0
    calculatedScores.fullStackScore = fullStackScore

    // Coding Competitions & Hackathons (10 marks)
    let competitionsScore = 0
    formData.codingCompetitions.forEach((comp) => {
      if (comp === "first") competitionsScore += 5
      else if (comp === "second") competitionsScore += 4
      else if (comp === "third") competitionsScore += 3
      else if (comp === "participated") competitionsScore += 2
    })
    competitionsScore = Math.min(competitionsScore, 10) // Max 10 marks
    calculatedScores.competitionsScore = competitionsScore

    // Inhouse Projects (8 marks)
    let inhouseScore = 0
    formData.inhouseProjects.forEach((project) => {
      if (project === "yes") inhouseScore += 4
    })
    inhouseScore = Math.min(inhouseScore, 8) // Max 8 marks
    calculatedScores.inhouseScore = inhouseScore

    // Professional Membership (2 marks)
    let membershipScore = 0
    if (formData.professionalMembership === "yes") membershipScore = 2
    else if (formData.professionalMembership === "no") membershipScore = 0
    calculatedScores.membershipScore = membershipScore

    // CCC Rank (15 marks)
    let cccScore = 0
    if (formData.cccRank === "20orBelow") cccScore = 15
    else if (formData.cccRank === "21-30") cccScore = 14
    else if (formData.cccRank === "31-40") cccScore = 13
    else if (formData.cccRank === "41-50") cccScore = 12
    else if (formData.cccRank === "51-99") cccScore = 11
    else if (formData.cccRank === "76-100") cccScore = 10
    else if (formData.cccRank === "101-125") cccScore = 9
    else if (formData.cccRank === "126-150") cccScore = 8
    else if (formData.cccRank === "151-175") cccScore = 7
    else if (formData.cccRank === "176-200") cccScore = 6
    else if (formData.cccRank === "201-225") cccScore = 5
    else if (formData.cccRank === "226-250") cccScore = 4
    else if (formData.cccRank === "251-275") cccScore = 3
    else if (formData.cccRank === "276-300") cccScore = 2
    else if (formData.cccRank === "above300") cccScore = 1
    calculatedScores.cccScore = cccScore

    // Calculate total score
    const total =
      tenthScore +
      twelfthScore +
      cgpaScore +
      githubTotalScore +
      codingTotalScore +
      internshipScore +
      certificationsScore +
      projectsScore +
      fullStackScore +
      competitionsScore +
      inhouseScore +
      membershipScore +
      cccScore

    setScores(calculatedScores)
    setTotalScore(total)
  }

  const blogPosts = [
    {
      title: "Coming Soon!",
      link: "#",
    },
  ]

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Banner Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4" style={{ fontWeight: "500" }}>
            Ranking Matrix
          </h1>
          <p className="lead">
            Learn how ranking matrix plays a significant role in your placements, and we are here to help.
          </p>
        </div>
      </header>

      <div className="container my-5">
        <div className="row">
          {/* Calculator Section (80%) */}
          <div className="col-lg-9">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <h3 className="mb-0">Placement Ranking Calculator</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">10th Percentage</label>
                      <select
                        className="form-select"
                        value={formData.tenthPercentage}
                        onChange={(e) => handleInputChange(e, "tenthPercentage")}
                      >
                        <option value="">Select Range</option>
                        <option value="96-100">96% to 100%</option>
                        <option value="91-95">91% to 95%</option>
                        <option value="86-90">86% to 90%</option>
                        <option value="75-85">75% to 85%</option>
                        <option value="below75">Below 75%</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">12th Percentage</label>
                      <select
                        className="form-select"
                        value={formData.twelfthPercentage}
                        onChange={(e) => handleInputChange(e, "twelfthPercentage")}
                      >
                        <option value="">Select Range</option>
                        <option value="96-100">96% to 100%</option>
                        <option value="91-95">91% to 95%</option>
                        <option value="86-90">86% to 90%</option>
                        <option value="75-85">75% to 85%</option>
                        <option value="below75">Below 75%</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">CGPA</label>
                      <select
                        className="form-select"
                        value={formData.cgpa}
                        onChange={(e) => handleInputChange(e, "cgpa")}
                      >
                        <option value="">Select Range</option>
                        <option value="above9.5">Above 9.5</option>
                        <option value="9.1-9.5">9.1 to 9.5</option>
                        <option value="8.6-9.0">8.6 to 9.0</option>
                        <option value="7.5-8.5">7.5 to 8.5</option>
                        <option value="below7.5">Below 7.5</option>
                      </select>
                    </div>
                  </div>

                  <h5 className="card-title border-bottom pb-2">GitHub Profile (15 Marks)</h5>
                  <div className="row mb-4">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Number of Contributions</label>
                      <select
                        className="form-select"
                        value={formData.githubContributions}
                        onChange={(e) => handleInputChange(e, "githubContributions")}
                      >
                        <option value="">Select Range</option>
                        <option value="above20">More than 20</option>
                        <option value="16-20">16 to 20</option>
                        <option value="11-15">11 to 15</option>
                        <option value="6-10">6 to 10</option>
                        <option value="1-5">1 to 5</option>
                        <option value="0">No Contribution</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Monthly Frequency</label>
                      <select
                        className="form-select"
                        value={formData.githubFrequency}
                        onChange={(e) => handleInputChange(e, "githubFrequency")}
                      >
                        <option value="">Select Option</option>
                        <option value="2perMonth">2 per Month</option>
                        <option value="1perMonth">1 per Month</option>
                        <option value="0">No Contribution</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Community Projects</label>
                      <select
                        className="form-select"
                        value={formData.githubCommunityProjects}
                        onChange={(e) => handleInputChange(e, "githubCommunityProjects")}
                      >
                        <option value="">Select Option</option>
                        <option value="2">2 Projects</option>
                        <option value="1">1 Project</option>
                        <option value="0">No Projects</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Collaborations</label>
                      <select
                        className="form-select"
                        value={formData.githubCollaborations}
                        onChange={(e) => handleInputChange(e, "githubCollaborations")}
                      >
                        <option value="">Select Option</option>
                        <option value="3orMore">3 or More</option>
                        <option value="2">2 Collaborations</option>
                        <option value="1">1 Collaboration</option>
                        <option value="0">No Collaborations</option>
                      </select>
                    </div>
                  </div>

                  <h5 className="card-title border-bottom pb-2">Coding Practice Platform (10 Marks)</h5>
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Number of Badges/Recognitions</label>
                      <select
                        className="form-select"
                        value={formData.codingBadges}
                        onChange={(e) => handleInputChange(e, "codingBadges")}
                      >
                        <option value="">Select Range</option>
                        <option value="5orMore">5 or More</option>
                        <option value="4">4 Badges</option>
                        <option value="3">3 Badges</option>
                        <option value="2">2 Badges</option>
                        <option value="1">1 Badge</option>
                        <option value="0">No Badges</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Medium/Difficult Questions Solved</label>
                      <select
                        className="form-select"
                        value={formData.codingQuestions}
                        onChange={(e) => handleInputChange(e, "codingQuestions")}
                      >
                        <option value="">Select Range</option>
                        <option value="above20">More than 20</option>
                        <option value="16-20">16 to 20</option>
                        <option value="11-15">11 to 15</option>
                        <option value="6-10">6 to 10</option>
                        <option value="1-5">1 to 5</option>
                        <option value="0">No Questions</option>
                      </select>
                    </div>
                  </div>

                  <h5 className="card-title border-bottom pb-2">Internship Experience (10 Marks)</h5>
                  <div className="row mb-4">
                    {formData.internshipExperience.map((internship, index) => (
                      <div className="col-md-12 mb-2" key={`internship-${index}`}>
                        <div className="input-group">
                          <select
                            className="form-select"
                            value={internship}
                            onChange={(e) => handleArrayInputChange(e, "internshipExperience", index)}
                          >
                            <option value="">Select Option</option>
                            <option value="iitNit">IIT, NIT Internships</option>
                            <option value="srmPlacement">Placed through SRM Placement Process</option>
                            <option value="fortune500">Fortune 500 Companies</option>
                            <option value="smallCompanies">Small Companies</option>
                            <option value="lessThan3Months">Internship less than 3 Months</option>
                            <option value="paidInternship">Paid Internship</option>
                            <option value="none">No Internship</option>
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeArrayItem("internshipExperience", index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.internshipExperience.length < 2 && (
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => addArrayItem("internshipExperience")}
                        >
                          Add Internship
                        </button>
                      </div>
                    )}
                  </div>

                  <h5 className="card-title border-bottom pb-2">Skillset & Certifications (10 Marks)</h5>
                  <div className="row mb-4">
                    {formData.certifications.map((cert, index) => (
                      <div className="col-md-12 mb-2" key={`cert-${index}`}>
                        <div className="input-group">
                          <select
                            className="form-select"
                            value={cert}
                            onChange={(e) => handleArrayInputChange(e, "certifications", index)}
                          >
                            <option value="">Select Certification Type</option>
                            <option value="standard">Standard (CISCO, CCNA, etc.)</option>
                            <option value="nptel">NPTEL</option>
                            <option value="coursera">Coursera</option>
                            <option value="programming">Programming Certifications</option>
                            <option value="udemy">Udemy</option>
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeArrayItem("certifications", index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.certifications.length < 5 && (
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => addArrayItem("certifications")}
                        >
                          Add Certification
                        </button>
                      </div>
                    )}
                  </div>

                  <h5 className="card-title border-bottom pb-2">Projects Done (5 Marks)</h5>
                  <div className="row mb-4">
                    {formData.projectsDone.map((project, index) => (
                      <div className="col-md-12 mb-2" key={`project-${index}`}>
                        <div className="input-group">
                          <select
                            className="form-select"
                            value={project}
                            onChange={(e) => handleArrayInputChange(e, "projectsDone", index)}
                          >
                            <option value="">Select Project Type</option>
                            <option value="iitNitDrdo">IIT, NIT, DRDO Projects</option>
                            <option value="government">Other Government Projects</option>
                            <option value="mobileWeb">Mobile/Web Application</option>
                            <option value="miniHigh">Mini Project (High Quality)</option>
                            <option value="miniLow">Mini Project (Low Quality)</option>
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeArrayItem("projectsDone", index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.projectsDone.length < 3 && (
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => addArrayItem("projectsDone")}
                        >
                          Add Project
                        </button>
                      </div>
                    )}
                  </div>

                  <h5 className="card-title border-bottom pb-2">Full Stack Developer Experience (5 Marks)</h5>
                  <div className="row mb-4">
                    <div className="col-md-12 mb-3">
                      <select
                        className="form-select"
                        value={formData.fullStackProject}
                        onChange={(e) => handleInputChange(e, "fullStackProject")}
                      >
                        <option value="">Select Option</option>
                        <option value="yes">One FSD Project</option>
                        <option value="no">No FSD Projects</option>
                      </select>
                    </div>
                  </div>

                  <h5 className="card-title border-bottom pb-2">Coding Competitions & Hackathons (10 Marks)</h5>
                  <div className="row mb-4">
                    {formData.codingCompetitions.map((comp, index) => (
                      <div className="col-md-12 mb-2" key={`comp-${index}`}>
                        <div className="input-group">
                          <select
                            className="form-select"
                            value={comp}
                            onChange={(e) => handleArrayInputChange(e, "codingCompetitions", index)}
                          >
                            <option value="">Select Achievement</option>
                            <option value="first">First Prize</option>
                            <option value="second">Second Prize</option>
                            <option value="third">Third Prize</option>
                            <option value="participated">Participated</option>
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeArrayItem("codingCompetitions", index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.codingCompetitions.length < 4 && (
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => addArrayItem("codingCompetitions")}
                        >
                          Add Competition
                        </button>
                      </div>
                    )}
                  </div>

                  <h5 className="card-title border-bottom pb-2">Inhouse Projects (8 Marks)</h5>
                  <div className="row mb-4">
                    {formData.inhouseProjects.map((project, index) => (
                      <div className="col-md-12 mb-2" key={`inhouse-${index}`}>
                        <div className="input-group">
                          <select
                            className="form-select"
                            value={project}
                            onChange={(e) => handleArrayInputChange(e, "inhouseProjects", index)}
                          >
                            <option value="">Select Option</option>
                            <option value="yes">Completed Inhouse Project</option>
                            <option value="no">No Inhouse Project</option>
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeArrayItem("inhouseProjects", index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.inhouseProjects.length < 1 && (
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => addArrayItem("inhouseProjects")}
                        >
                          Add Inhouse Project
                        </button>
                      </div>
                    )}
                  </div>

                  <h5 className="card-title border-bottom pb-2">Professional Membership (2 Marks)</h5>
                  <div className="row mb-4">
                    <div className="col-md-12 mb-3">
                      <select
                        className="form-select"
                        value={formData.professionalMembership}
                        onChange={(e) => handleInputChange(e, "professionalMembership")}
                      >
                        <option value="">Select Option</option>
                        <option value="yes">Member of Professional Body</option>
                        <option value="no">No Membership</option>
                      </select>
                    </div>
                  </div>

                  <h5 className="card-title border-bottom pb-2">CCC Rank (15 Marks)</h5>
                  <p className="text-secondary small">You can skip this section if the rank is still not known</p>
                  <div className="row mb-4">
                    <div className="col-md-12 mb-3">
                      <select
                        className="form-select"
                        value={formData.cccRank}
                        onChange={(e) => handleInputChange(e, "cccRank")}
                      >
                        <option value="">Select Range</option>
                        <option value="20orBelow">20 and Below</option>
                        <option value="21-30">21 to 30</option>
                        <option value="31-40">31 to 40</option>
                        <option value="41-50">41 to 50</option>
                        <option value="51-99">51 to 99</option>
                        <option value="76-100">76 to 100</option>
                        <option value="101-125">101 to 125</option>
                        <option value="126-150">126 to 150</option>
                        <option value="151-175">151 to 175</option>
                        <option value="176-200">176 to 200</option>
                        <option value="201-225">201 to 225</option>
                        <option value="226-250">226 to 250</option>
                        <option value="251-275">251 to 275</option>
                        <option value="276-300">276 to 300</option>
                        <option value="above300">Greater than 300</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="button" className="btn btn-dark btn-lg" onClick={calculateScore}>
                      Calculate Ranking Score
                    </button>
                  </div>
                </form>

                {totalScore !== null && (
                  <div className="mt-4">
                  <div className="alert alert-primary border-2 border-dark rounded-3 shadow-sm p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="mb-0 text-dark">
                        <i className="fas fa-trophy me-2 text-warning"></i>
                        Your Ranking Score: 
                        <span className="ms-2 fw-bold display-6">{totalScore.toFixed(2)}</span>
                        <span className="fs-5 text-muted"> / 100</span>
                      </h4>
                      <span className="badge bg-dark rounded-pill fs-6 px-3 py-2">
                        Performance Rating
                      </span>
                    </div>
                    
                    <hr className="border-success opacity-25 my-3" />
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className={`d-flex justify-content-between py-2 ${(scores.tenthScore/2.5) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>10th Percentage:</span>
                          <span className={`fw-bold ${(scores.tenthScore/2.5) < 0.6 ? 'text-danger' : ''}`}>{scores.tenthScore} / 2.5</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.twelfthScore/2.5) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>12th Percentage:</span>
                          <span className={`fw-bold ${(scores.twelfthScore/2.5) < 0.6 ? 'text-danger' : ''}`}>{scores.twelfthScore} / 2.5</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.cgpaScore/5) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>CGPA:</span>
                          <span className={`fw-bold ${(scores.cgpaScore/5) < 0.6 ? 'text-danger' : ''}`}>{scores.cgpaScore} / 5</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.githubScore/15) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>GitHub Profile:</span>
                          <span className={`fw-bold ${(scores.githubScore/15) < 0.6 ? 'text-danger' : ''}`}>{scores.githubScore} / 15</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.codingScore/10) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Coding Practice:</span>
                          <span className={`fw-bold ${(scores.codingScore/10) < 0.6 ? 'text-danger' : ''}`}>{scores.codingScore} / 10</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.internshipScore/10) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Internship:</span>
                          <span className={`fw-bold ${(scores.internshipScore/10) < 0.6 ? 'text-danger' : ''}`}>{scores.internshipScore} / 10</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.certificationsScore/10) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Certifications:</span>
                          <span className={`fw-bold ${(scores.certificationsScore/10) < 0.6 ? 'text-danger' : ''}`}>{scores.certificationsScore} / 10</span>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className={`d-flex justify-content-between py-2 ${(scores.projectsScore/5) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Projects:</span>
                          <span className={`fw-bold ${(scores.projectsScore/5) < 0.6 ? 'text-danger' : ''}`}>{scores.projectsScore} / 5</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.fullStackScore/5) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Full Stack:</span>
                          <span className={`fw-bold ${(scores.fullStackScore/5) < 0.6 ? 'text-danger' : ''}`}>{scores.fullStackScore} / 5</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.competitionsScore/10) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Competitions:</span>
                          <span className={`fw-bold ${(scores.competitionsScore/10) < 0.6 ? 'text-danger' : ''}`}>{scores.competitionsScore} / 10</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.inhouseScore/8) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Inhouse Projects:</span>
                          <span className={`fw-bold ${(scores.inhouseScore/8) < 0.6 ? 'text-danger' : ''}`}>{scores.inhouseScore} / 8</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.membershipScore/2) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>Membership:</span>
                          <span className={`fw-bold ${(scores.membershipScore/2) < 0.6 ? 'text-danger' : ''}`}>{scores.membershipScore} / 2</span>
                        </div>
                        <div className={`d-flex justify-content-between py-2 ${(scores.cccScore/15) < 0.6 ? 'border-start border-danger border-3 ps-2' : ''}`}>
                          <span>CCC Rank:</span>
                          <span className={`fw-bold ${(scores.cccScore/15) < 0.6 ? 'text-danger' : ''}`}>{scores.cccScore} / 15</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>

          {/* Blog Section (20%) */}
          <div className="col-lg-3">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <h4 className="mb-0">Blogs</h4>
              </div>
              <div className="card-body">
                <div className="list-group">
                  {blogPosts.map((post, index) => (
                    <a key={index} href={post.link} className="list-group-item list-group-item-action">
                      {post.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default RankingMatrix

