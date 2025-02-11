import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import "./Movies.css"
import { Link } from 'react-router-dom';

const MoviesComponent = () => {

  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState(" ");
  const [genresList, setGenresList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const API_Key ="82b8ef351212cc03c2fd4298204b1b96";

  useEffect(() => {
    Promise.all([Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}`),
    Axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_Key}`)]).then(([moviesResponse, genresResponse]) => {
      setMovies(moviesResponse.data.results);
      setGenresList(genresResponse.data.genres);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const filteredMovies = selectedGenre ? movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre))) : movies;

  return (
    <div className='movieDiv'>
      <div className='container movieInput'>
        <input type="text" placeholder="Search by Title...." onChange={(e) => { setSearchTitle(e.target.value) }} className='form-control input' required/>
        <div className='icon'><Link to={searchTitle.trim()?`/movieFounded/${searchTitle}`:"#"}><i className='bi bi-search'></i></Link></div>
        <marquee behavior="scroll" direction="left" style={{color:"red",fontWeight:"bold"}}>
          Note: This page contains only a limited number of movies.
        </marquee>
        <div className='select'>
          <select className='form-control' value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Genres</option>
            {
              genresList.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))
            }
          </select></div>
      </div>
      <div className='moviesContainer'>
        {
          filteredMovies.map((movie) =>
          (<div className='movieCard' key={movie.id}>
            <div className='movieImg'>
              <Link><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Image Not Found" /></Link>
            </div>
            <div className='movieData'>
              <div className='movieTitle'>
                {movie.title}
              </div>
              <div className='moreDetails'>
                <Link to={`/movieFounded/${movie.title}`}><small>More info</small></Link>
              </div>
            </div>
          </div>))
        }
      </div>
    </div>
  )
}

export default MoviesComponent
