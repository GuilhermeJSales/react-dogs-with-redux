import { useEffect } from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos, resetPageState } from '../../store/feed';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';

const Feed = ({user}) => {
const {infinite, loading, list, error} = useSelector(state => state.feed);
const dispatch = useDispatch();


useEffect(() => {
  dispatch(resetPageState())
  dispatch(loadNewPhotos({user, total:6}))
},[dispatch, user])

useEffect(() => {
  let wait = false;
  function infiniteScroll() {
    if(infinite) {
    const scroll = window.scrollY;
    const height = document.body.offsetHeight - window.innerHeight;
    if(scroll > height * .75 && !wait) {
      dispatch(loadNewPhotos({user, total:6}))
      wait = true;
      setTimeout(() => {
        wait = false;
      },500)
    }
    }
  }
  window.addEventListener('wheel', infiniteScroll)
  window.addEventListener('scroll', infiniteScroll)
  return () => {
    window.removeEventListener('wheel', infiniteScroll)
    window.removeEventListener('scroll', infiniteScroll)
  }
},[infinite, user, dispatch])


  return (
    <div>
      <FeedModal/>
      {list.length > 0 && <FeedPhotos/>}
      {loading && <Loading />}
      {error && <Error />}
      
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = { 
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
}

export default Feed