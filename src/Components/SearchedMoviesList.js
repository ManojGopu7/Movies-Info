import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import './SearchedMoviesList.css'

const SearchedMoviesList = () => {

    const { searchTitle } = useParams();
    const [title, setTitle] = useState(searchTitle || '');
    const [moviesList, setMovieList] = useState([]);

   
    useEffect(() => {
        if (title.trim()) {
            fetchMovies(title);
        }
    }, [title]);

    const fetchMovies = (query) => {
        Axios.get(`https://www.omdbapi.com/?apikey=96030101&s=${query}`)
            .then((response) => {
                setMovieList(response.data.Search || []);
            })
            .catch((error) => {
                console.log("Data Not Found", error);
                setMovieList([]);
            });
    }

    const handleSearch = () => {
        if (title.trim()) {
            fetchMovies(title);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className='SearchedMoviesList'>
            <div className='container titleInput'>
                <input
                    className='form-control'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className='icon'>
                    <i className='bi bi-search' onClick={handleSearch}></i>
                </div>
            </div>

            <div className='moviesContainer'>
                {moviesList.length > 0 ? (
                    moviesList.map((movie) => (
                        <div className='movieCard' key={movie.imdbID}>
                            <div className='movieImg'>
                                <img src={movie.Poster} alt="Image Not Found" />
                            </div>
                            <div className='movieData'>
                                <div className='movieTitle'>
                                    {movie.Title} ({movie.Year})
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 className='mt-5 pt-5'>No Results Found..</h3>
                )}
            </div>
        </div>
    )
}

export default SearchedMoviesList;
