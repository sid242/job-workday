import axios from 'axios';

export const fetchJobs = async (
  limit = 10,
  handleJobDetails,
  handleLoading
) => {
  try {
    const response = await axios.post(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      {
        limit,
        offset: 0,
      }
    );
    handleJobDetails(response?.data);
  } catch (error) {
    console.log('something went wrong while fetching jobs', error);
  } finally {
    handleLoading(false);
  }
};
