import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

const RQHomework = () => {
  const [isQueryEnabled, setIsQueryEnabled] = useState(true);

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching ", data);
    if (data?.length > 0) {
      setIsQueryEnabled(false);
    }
  };

  const onError = (data) => {
    console.log("Perform side effect after encountering error ", data);
  };

  // destructure 'results' from useQuery
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError, isQueryEnabled);

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
        return <h2>{error.message}</h2>
    }


  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {data?.map(hero => {
        return <div key={hero}>{hero}</div>
      })} 
    </>
  );
};

export default RQHomework;
