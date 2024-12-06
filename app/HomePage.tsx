"use client";  // Add this to make the component a client component


import Link from 'next/link';
// import './css/styles.css';  // Adjust path according to your directory structure
import '../css/styles.css';  // Correct path to styles.css

import React, { useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  location: { display_name: string };
  company: { display_name: string };
  description: string;
  redirect_url: string;
}

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2f8ca26b&app_key=f6132cf569dae73c3e4e7956d978bad0&results_per_page=10&what=software%20engineer&where=Charlotte`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data.results);
      } catch (error) {
        setError("An error occurred while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2f8ca26b&app_key=f6132cf569dae73c3e4e7956d978bad0&results_per_page=10&what=${encodeURIComponent(
          searchKeyword || "technology"
        )}&where=${encodeURIComponent(searchLocation || "Charlotte")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data.results);
    } catch (error) {
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">LAKA</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
        <div className="profile-icon">
          <Link href="/profile">
            <img src="/path-to-profile-icon.png" alt="Profile" style={{ cursor: 'pointer' }} />
          </Link>
        </div>
      </nav>

      {/* Search Bar */}
      <header>
  <input
    type="text"
    placeholder="Software Engineer"
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
  />
  <input
    type="text"
    placeholder="Charlotte, NC, USA"
    value={searchLocation}
    onChange={(e) => setSearchLocation(e.target.value)}
  />
  <button onClick={handleSearch}>Search</button>
</header>

      {/* Filters
      <div className="filters">
        <button>Full-Time</button>
        <button>Within 50 miles</button>
        <button>$90,000+</button>
      </div> */}

      {/* Job Listings and Details */}
      <div className="content">
        <div className="job-list">
          {loading && <p>Loading jobs...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && jobs.map((job) => (
            <div
              key={job.id}
              className="job-card"
              onClick={() => setSelectedJob(job)}
            >
              <h3>{job.title}</h3>
              <p>{job.company.display_name}</p>
              <p>{job.location.display_name}</p>
            </div>
          ))}
        </div>

        <div className="job-details">
          {selectedJob ? (
            <>
              <h3>{selectedJob.title}</h3>
              <p>{selectedJob.company.display_name}</p>
              <p>{selectedJob.location.display_name}</p>
              <h4>Job Description</h4>
              <p>{selectedJob.description}</p>
              <div className="job-actions">
                <button
                  onClick={() => window.open(selectedJob.redirect_url, "_blank")}
                  className="apply-button"
                >
                  Apply Now
                </button>
                <button className="save-button">Save</button>
              </div>
            </>
          ) : (
            <p>Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
