import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = email => {
  console.log(email)
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = channelId => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data?.channelId;

  const { data: courses, isLoading, isError } = useQuery(
    ['courses', channelId],
    () => (channelId ? fetchCoursesByChannelId(channelId) : undefined),
    {
      enabled: !!channelId,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <h1>Courses</h1>
      {courses && courses.data?.courses && (
        <ul>
          {courses.data.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      )}
    </>
  );
};