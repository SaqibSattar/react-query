import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  // const[refetchIntervalTime, setRefetchIntervalTime] = useState(3000)

  const onSuccess = data => {
    // if(data?.data.length === 3) {
    //   setRefetchIntervalTime(0)
    // }
    console.log({ data })
  }

  const onError = error => {
    // setRefetchIntervalTime(0)
    console.log({ error })
  }

  const { isLoading, data , isError, error, isFetching, refetch } = useQuery('super-heroes', fetchSuperHeroes,
  {
    // refetchInterval: refetchIntervalTime,
    onSuccess,
    onError,
    select: data => {
      const superHeroNames = data?.data.map(hero => hero.name)
      return superHeroNames
    }
  })
  console.log({isLoading, isFetching })
  // const { isLoading, data } = useQuery('super-heroes', () => {
  //   return axios.get('http://localhost:4000/superheroes')
  // })

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
      {/* {data?.data.map(hero => {
        return <div key={hero.id}>{hero.name}</div>
      })} */}
      {data.map(heroName => {
        return <div key={heroName}>{heroName}</div>
      })}
    </>
  )
}