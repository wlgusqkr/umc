import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/layout/layout'
import Login from './page/login'
import SignUp from './page/signup'
import Search from './page/search'
import Movies from './page/movies'
import MoviesByType from './page/moviesbytype'
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
          path: 'movies/:movieId',
          element: <MoviesByType />

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
