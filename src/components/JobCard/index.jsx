import React, { useEffect, useRef, useState } from 'react';
import './index.scss';

const index = ({ jobDetails }) => {
  const {
    companyName,
    logoUrl,
    jobRole,
    location,
    minJdSalary,
    maxJdSalary,
    jobDetailsFromCompany,
    minExp,
    maxExp,
  } = jobDetails;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (paragraphRef.current) {
      setIsOverflowing(
        paragraphRef.current.scrollHeight > paragraphRef.current.clientHeight
      );
    }
  }, [isExpanded]);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className='job-card'>
      <section className='company-designation'>
        <div>
          <img src={logoUrl} alt={companyName} />
        </div>
        <div className='info'>
          <h3>{companyName}</h3>
          <h2>{jobRole}</h2>
          <div>{location}</div>
        </div>
      </section>
      <div className='salary'>
        Estimated Salary: {minJdSalary} - {maxJdSalary} LPA
      </div>
      <hr />
      <article>
        <h3>About Company</h3>
        <div className={`text-container ${isExpanded ? 'expanded' : ''}`}>
          <p className='para' ref={paragraphRef}>
            {jobDetailsFromCompany}
          </p>
          {(isOverflowing || isExpanded) && (
            <span className='see-more-btn' onClick={toggleText} role='button'>
              {isExpanded ? 'See Less' : '...See More'}
            </span>
          )}
        </div>
      </article>
      {minExp && maxExp ? (
        <>
          <hr />
          <article>
            <h3>Experience</h3>
            <p>
              {minExp} - {maxExp} years
            </p>
          </article>
        </>
      ) : null}
    </div>
  );
};

export default index;
