import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from './PhotoContent';
import Head from '../Helper/Head'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhoto } from '../../store/photo';


const Photo = () => {
  const {id} = useParams();

  const {loading, error, data} = useSelector(state => state.photo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhoto(id))
  },[id, dispatch]);


  if(error) return <Error error={error} />
  if(loading) return <Loading />
  if(data) return ( 
    <section className="container mainContainer">
      <Head title={data.photo.title} description="Foto do usuário" />
      <PhotoContent single={true} data={data} />
    </section>
  )
  else return null;
}

export default Photo