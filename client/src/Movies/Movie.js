import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Link } from "react-router-dom";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  
  const deleteItem = e => {
    
    e.preventDefault();
    // make an axios.delete request
    // in the .then, update state with props.setItems and navigate to the shop
    axios.delete(`http://localhost:5000/api/movies/${match.params.id}`).then(res => {
      // res.data
      console.log(res.data);
     // setMovie(res.data);
      window.location = "http://localhost:3000/";
    //  history.push('/');
    });
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

   

      <Link key={movie.id} to={`/update-item/${movie.id}`}>Edit</Link>

      <button className="md-button" onClick={deleteItem}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
