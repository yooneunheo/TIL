import React from 'react';

const Movie = ({ movie, removeMovie }) => {
  return (
    <div className='movie'>
      <div className='movie-title'>
        {movie.title}
        <span className='movie-year'>({movie.year})</span>
      </div>
      <div>
        <button
          onClick={() => {
            removeMovie(movie.id);
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default Movie;
