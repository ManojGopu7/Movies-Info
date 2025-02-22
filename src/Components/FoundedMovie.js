import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./FoundedMovie.css";
import Axios from 'axios';

const FoundedMovie = () => {
    const { movieTitle } = useParams();

    const API_Key = process.env.REACT_APP_MOVIE_API_KEY;

    const [movieName, setMovieName] = useState(movieTitle);

    const [movieList, setMovieList] = useState([]);

    const [getMovie, setGetMovie] = useState([]);

    const [genreData, setGenreData] = useState([]);

    useEffect(() => {
        Promise.all([Axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}`),
        Axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_Key}`)]).then(([movieResponse, genreResponse]) => {
            setMovieList(movieResponse.data.results);
            setGenreData(genreResponse.data.genres);
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    useEffect(() => {
        if (!movieName || movieName.trim() === "") {
            alert("Incorrect Movie Name");
            return;
        }

        const filtered = movieList.filter((movie) =>
            movie.title.toLowerCase().includes(movieName.toLowerCase().trim())
        );

        setGetMovie(filtered);
    }, [movieList, movieName, movieTitle]);

    const genreNames = (ids) => {

        return ids.map(id => genreData.find(genre => genre.id === id)?.name || "UnKnown").join(", ");

    };


    return (
        <div className='fMovieDiv container-fluid'>
            {getMovie.length > 0 ? (
                getMovie.map((movie) => (
                    <div key={movie.id} className='container fmovieData'>
                        <div className='row'>
                            <div className='fmovieImg col-sm-12 col-md-5 col-lg-5'>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt="Image not Found" className='img-thumbnail' />
                            </div>
                            <div className='col-sm-12 col-md-7 col-lg-7'>
                                <div className='fmovieDetails'>
                                    <h5>{movie.title}</h5>
                                    <i>{movie.release_date}</i>
                                    <h6><li>{genreNames(movie.genre_ids)}</li></h6>
                                    <p><b>Overview:</b><br />&nbsp;{movie.overview}</p>
                                </div>
                                <div className='backbtn'>
                                    <Link to='/' className='btn btn-primary'>Back to Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className='ferrorDiv container p-5'>
                    <h3>Movie Not Found !!!</h3>
                    <div>
                        <Link to='/' className='btn btn-primary'>Back to Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoundedMovie;
