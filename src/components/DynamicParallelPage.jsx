import React from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  console.log("queryResults :", queryResults);

  if (queryResults.some((result) => result.isLoading)) {
    return <div>Loading...</div>;
  }

  if (queryResults.some((result) => result.isError)) {
    return (
      <div>
        Error fetching data. Please try again later.
        {queryResults
          .filter((result) => result.isError)
          .map((result, index) => (
            <div key={index}>
              Error for hero: {result.error.message}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Dynamic Parallel Queries</h2>
      {queryResults.map((result) => {
        console.log('Query Key:', result.queryKey); // Log the query key
        console.log({ result }); // Log the result
        return (
          <div key={result.data.data.id}>
            <h3>Hero {result.data.data.id}</h3>
              <div>
                <p>Name: {result.data.data.name}</p>
                <p>Alter Ego: {result.data.data.alterEgo}</p>
                {/* Add more details as needed */}
              </div>
          </div>
        )
      })}
      
        </div>
  );
};
