import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.tsx'
import Home from './pages/Home/Home.tsx'
import Search from './pages/Search/Search.tsx'
import Movies from './pages/Movies/Movies.tsx'
import Series from './pages/Series/Series.tsx'
import Media from './pages/Media/Media.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} >
          <Route path='/' element={<Home />} />
          <Route path=':mediaType/:id' element={<Media />} />
          <Route path='search' element={<Search />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/series' element={<Series />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
