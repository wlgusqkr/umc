import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import TodoDetail from './page/todoDetail'
import Main from './components/layout/Main/main'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element : <Layout />,
      children : [
        {
          path : '/detail/:id',
          element : <TodoDetail />
        },
        {
          path : 'main',
          element : <Main />
        },
      ]
    }
  ],)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
