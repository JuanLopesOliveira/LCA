import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.tsx'
import Home from './pages/Home/Home.tsx'
import Search from './pages/Search/Search.tsx'
import Movies from './pages/Movies/Movies.tsx'
import Series from './pages/Series/Series.tsx'
import Media from './pages/Media/Media.tsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import Favorite from './pages/Favorite/Favorite.tsx'
import { Profile } from './pages/Profile/Profile.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} >
          <Route path='/' element={<Home />} />
          <Route path=':mediaType/:id' element={<Media />} />
          <Route path='search' element={<Search />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/series' element={<Series />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/profile' element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>,
)
