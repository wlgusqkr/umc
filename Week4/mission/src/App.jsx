import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './component/Layout/nav'
import Layout from './component/Layout/layout'
import Login from './page/login'
import SignUp from './page/signup'
import Search from './page/Search/search'
import Movies from './page/movies'
import MoviesByType from './page/moviesbytype'
import MovieDetail from './page/movieDetail'
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'movie',
          element: <></>
        }, 
        {
          path: 'login',
          element: <Login />
        }, 
        {
          path: 'signup',
          element: <SignUp />
        }, 
        {
          path: 'search',
          element: <Search />
        }, 
        {
          path: 'movies',
          element: <Movies />
        },
        {
          path: 'movies/:movieType',
          element: <MoviesByType />
        },
        {
          path: 'movies/detail/:movieId',
          element: <MovieDetail />
        }
      ]
    },
    {
      path: '/movies',
      element : <></>
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
