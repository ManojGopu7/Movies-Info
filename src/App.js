import React from 'react'
import HeaderComponent from './Components/HeaderComponent'
import MoviesComponent from './Components/MoviesComponent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import FoundedMovie from './Components/FoundedMovie'
import FooterComponent from './Components/FooterComponent'
import SearchedMoviesList from './Components/SearchedMoviesList'

const App = () => {
  return (
    <div>
      <HeaderComponent/>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<MoviesComponent/>}/>
      <Route path="/movieFounded/:movieTitle" element={<FoundedMovie/>}/>
      <Route path="/moviesList/:searchTitle" element={<SearchedMoviesList/>}/>
      </Routes>
      </BrowserRouter>
      <FooterComponent/>
    </div>
  )
}

export default App
