import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './Layout';
import Signin from './pages/Signin';
import axios from 'axios';
import HostProperty from './pages/HostProperty';
// import { UserContextProvider } from './UserContext';
// import AccountPage from './pages/AccountPage';
// import PlacesPage from './pages/PlacesPage';
// import PlacesFormPage from './pages/PlacesFormPage';
import PropertyDetails from './pages/PropertyDetails';
// import { UserContextProvider } from './UserContext';
import { createContext, useState } from 'react';
import BookingPage from "./pages/BookingPage";

import AllBookings from './pages/AllBookings';
export const userContext = createContext({});


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState("")
  const [alert, setAlert] = useState({
    link: "",
    message: "",
    text: ""
  })

  return (
    <userContext.Provider value={{
      user: user,
      setUser: setUser,
      alert: alert,
      setAlert: setAlert
    }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signin />} />
          {/* <Route path='/account' element={<AccountPage />} /> */}
          {/* <Route path='/account/places' element={<PlacesPage />} /> */}
          <Route path='/host/property' element={<HostProperty />} />
          {/* <Route path='/account/places/:id' element={<PlacesFormPage />} /> */}
          <Route path='/property/:id' element={<PropertyDetails />} />
          <Route path="/bookings" element={<AllBookings />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </userContext.Provider>

  )
}

export default App