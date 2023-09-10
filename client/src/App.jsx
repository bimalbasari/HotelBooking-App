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
import Property from './pages/Property';
// import BookingsPage from "./pages/BookingsPage";
// import BookingPage from "./pages/BookingPage";


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {

  return (
    // <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Signin />} />
          {/* <Route path='/account' element={<AccountPage />} /> */}
          {/* <Route path='/account/places' element={<PlacesPage />} /> */}
          <Route path='/host/property' element={<HostProperty/>} />
          {/* <Route path='/account/places/:id' element={<PlacesFormPage />} /> */}
          <Route path='/property/:id' element={<Property />} />
          {/* <Route path="/account/bookings" element={<BookingsPage />} /> */}
          {/* <Route path="/account/bookings/:id" element={<BookingPage />} /> */}
        </Route>
      </Routes>
    // </UserContextProvider>

  )
}

export default App