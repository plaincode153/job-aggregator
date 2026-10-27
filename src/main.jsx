import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Link } from "react-router"
import Layout from './Layout.jsx'
import { JobSearch } from './pages/JobSearch.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <JobSearch />
      }
    ]
  }
], {
    basename: import.meta.env.BASE_URL
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>

  </StrictMode>
)
