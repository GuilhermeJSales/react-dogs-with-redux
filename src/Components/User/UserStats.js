import React, { lazy } from 'react'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import { useEffect } from 'react';
import { GET_STATS } from '../../api';
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
const UserStatsGraphs = lazy(() => import('./UserStatsGraphs'))


const UserStats = () => {
  const {data, error, loading, request} = useFetch();

  useEffect(() => {
    async function getData(){
      const {url, options} = GET_STATS();
      await request(url, options);
    }
    getData();
  },[request]);

  if(loading) return <Loading />
  if(error) return <Error error={error} />
  if(data)
  return (
    <React.Suspense>
      <Head title="Estatísticas" description="Estatísticas do usuário" />
      <UserStatsGraphs data={data}/>
    </React.Suspense>
  );
  else return null;
}

export default UserStats