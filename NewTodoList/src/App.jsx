import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import TodoDetail from './page/todoDetail'
import Main from './components/layout/Main/main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
function App() {
  const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
