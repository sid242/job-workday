import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchJobs } from '../services/jobs';
import Loader from '../components/Loader';
import Input from '../components/Input';
import JobCard from '../components/JobCard';
import '../assets/jobs.scss';
import useDebounce from '../hooks/useDebounce';

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchString, setSearchString] = useState('');
  const debouncedSearch = useDebounce(searchString, 1000);
  const [filter, setFilter] = useState([]);

  const handleLoading = (value) => setIsLoading(value);
  const handleJobDetails = (data) => {
    setJobs(data?.jdList);
    setTotal(data?.totalCount);
  };

  const doGetJobs = async (limit) => {
    handleLoading(true);
    await fetchJobs(limit, handleJobDetails, handleLoading);
  };

  useEffect(() => {
    doGetJobs(10);
  }, []);

  const fetchData = async (limit) => {
    await fetchJobs(limit, handleJobDetails, handleLoading);
  };

  useEffect(() => {
    if (jobs?.length) {
      if (debouncedSearch) {
        const filterData = jobs?.filter(
          (job) =>
            job.companyName
              ?.toLowerCase()
              .includes(debouncedSearch?.toLowerCase()) ||
            job.jobRole
              ?.toLowerCase()
              .includes(debouncedSearch?.toLowerCase()) ||
            job.location?.toLowerCase().includes(debouncedSearch?.toLowerCase())
        );
        setFilter(filterData);
      } else {
        setFilter(jobs);
      }
    }
  }, [debouncedSearch, jobs]);

  return (
    <div className='container'>
      <h1 className='heading'>Jobs</h1>
      {isLoading ? (
        <div className='d-flex justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <Input
            className='search-job'
            placeholder='search jobs'
            value={searchString}
            onChange={(e) => setSearchString(e?.target?.value)}
          />
          {filter.length ? (
            <InfiniteScroll
              dataLength={jobs.length}
              next={() => fetchData(filter.length + 10)}
              hasMore={!debouncedSearch && total > filter.length}
              loader={
                <div className='d-flex justify-center'>
                  <Loader />
                </div>
              }
            >
              <div className='jobs'>
                {filter?.map((job) => (
                  <JobCard jobDetails={job} key={job?.jdUid} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className='d-flex justify-center'>No jobs found</div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;
