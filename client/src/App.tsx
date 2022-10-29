/* eslint-disable max-len */
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  Login, SignUp, Home, Profile, SearchResult, EventDetails, Calender, Chat,
} from './pages'
import { useAuth } from './hooks/useAuth'

const App : React.FC = () => {
  const auth = useAuth()
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: auth.user ? <Navigate to="/" replace /> : <Login />,

    },
    {
      path: 'sign-up',
      element: auth.user ? <Navigate to="/" replace /> : <SignUp />,
    },
    {
      path: 'users/:followerId',
      element: <Profile />,
    },
    {
      path: 'search-result',
      element: <SearchResult />,
    },
    {
      path: 'event/:id',
      element: <EventDetails />,
    },
    {
      path: 'chat',
      element: <Chat />,
    },
    {
      path: 'calendar',
      element: <Calender />,
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <EventCard event={event} /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  )
}

export default App
