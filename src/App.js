import React from 'react'
import HeaderComponent from './Components/HeaderComponent'
import MoviesComponent from './Components/MoviesComponent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import FoundedMovie from './Components/FoundedMovie'
import FooterComponent from './Components/FooterComponent'

const App = () => {
  return (
    <div>
      <HeaderComponent/>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<MoviesComponent/>}/>
      <Route path="/movieFounded/:searchTitle" element={<FoundedMovie/>}/>
      </Routes>
      </BrowserRouter>
      <FooterComponent/>
    </div>
  )
}

export default App
