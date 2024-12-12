
import './App.css'

import Signup from './ui-components/Signup';
import Login from './ui-components/Login';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'

const App = () => {
  //route with the path / takes the MainLayout component as its element and has two nested routes
  //when /login is called the Login component is rendered within the MainLayout component
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path ='/' element={<MainLayout />}> 
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login toggleLogin={() => {}} />} />
        <Route path="/signup" element={<Signup toggleRegister={() => {}} />} />
      </Route>
    )
  )
    return <RouterProvider router={router} />

  

}

export default App;
