import React, { useState } from 'react';
import MovieForm from '../MovieForm';
import Movie from '../Movie';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const removeMovie = (id) => {
    setMovies(
      movies.filter((movie) => {
        return movie.id !== id;
      })
    );
  };
  const renderMovies = movies.length
    ? movies.map((movie) => {
        return <Movie movie={movie} key={movie.id} removeMovie={removeMovie} />;
      })
    : '추가된 영화가 없습니다.';

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  return (
    <>
      <h1>Movie list</h1>
      <MovieForm addMovie={addMovie} />
      {renderMovies}
    </>
  );
};

export default Movies;
