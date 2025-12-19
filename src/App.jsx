import { Routes,Route,BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import LoginPage from './Components/Login'
import HomePage from './Components/Home'
import PopularPage from './Components/Popular'
import MovieDetils from './Components/MovieItem'
import Profile from './Components/Profile'
import PageNotFound from './Components/pageNotFound'
import Favouites from './Components/Favourites'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }/>
        <Route path='/popular' element={
          <ProtectedRoute>
            <PopularPage/>
          </ProtectedRoute>
        }/>
        <Route path='/movies/:movieId' element={
          <ProtectedRoute>
            <MovieDetils/>
          </ProtectedRoute>
        }/>
        <Route path='/profile' element={
          <ProtectedRoute>
          <Profile/>
          </ProtectedRoute>
        }>
          </Route>
        <Route path='/favourites' element={
          <ProtectedRoute>
          <Favouites/>
          </ProtectedRoute>
        }></Route>
            
        
        <Route path='*' element={
          <PageNotFound/>
        }>

        </Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
