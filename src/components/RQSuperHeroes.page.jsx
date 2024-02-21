import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('super-heroes', fetchSuperHeroes)
  // const { isLoading, data } = useQuery('super-heroes', () => {
  //   return axios.get('http://localhost:4000/superheroes')
  // })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map(hero => {
        return <div key={hero.id}>{hero.name}</div>
      })}
    </>
  )
}