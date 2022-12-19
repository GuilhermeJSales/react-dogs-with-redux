import React from 'react'
import styles from './FeedModal.module.css'
import { useEffect } from 'react';
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import PhotoContent from '../Photo/PhotoContent'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/ui';


const FeedModal = () => {
  const {loading, error, data} = useSelector(state => state.photo)
  const dispatch = useDispatch()
  const {modal} = useSelector(state => state.ui);

  function handleOutsideClick(event){
    if(event.target === event.currentTarget) dispatch(closeModal());
}

useEffect(() => {
  dispatch(closeModal());
},[dispatch])

  if(!modal) return null;
  return (
    <div onClick={handleOutsideClick} className={styles.modal}>
      {error && <Error error={error}/>}
      {loading && <Loading />}
      {data && <PhotoContent/>}
      
    </div>
  )
}

export default FeedModal