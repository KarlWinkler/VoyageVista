import{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useQuery } from 'react-query';
import { useState } from 'react';

import Header from "./Base/Header";
import Footer from "./Base/Footer";

import Home from "./Pages/Home";
import Location from "./Pages/Location";
import Profile from "./Pages/Profile";
import Discover from "./Pages/Discover";
import Explore from "./Pages/Explore";
import Login from "./Pages/Login";

import './styles/app.scss'
import './styles/base.scss'
import './styles/variables.scss'
import Signup from "./Pages/Signup";

function App() {
  const [location, setLocation] = useState(null)
  let { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
    return fetch(`/api/auth/user/`).then(res =>
        res.json()
    );
    },
    staleTime: 10 * 1000 * 60,
    cacheTime: 10 * 1000 * 60
  });

  console.log(location)
  user = user?.id ? user : null;
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Header user={user} name={'Log In'} setLocation={setLocation} />} />
          <Route path="/signup" element={<Header user={user} name={'Sign Up'} setLocation={setLocation} />} />
          <Route path="/explore" element={<Header user={user} name={'Explore'} setLocation={setLocation} />} />
          <Route path="/discover" element={<Header user={user} name={'Discover'} setLocation={setLocation} />} />
          <Route path="/profile" element={<Header user={user} name={'Profile'} setLocation={setLocation} />} />
          <Route path="/location/:id" element={<Header user={user} name={location?.name} location={true} setLocation={setLocation} />} />
          <Route path="/location/" element={<Header user={user} setLocation={setLocation} />} />
          <Route path="/" element={<Header user={user} setLocation={setLocation} />} />
        </Routes>
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login user={user} />} />
            <Route path="/signup" element={<Signup user={user} />} />
            <Route path="/explore" element={<Explore user={user} />} />
            <Route path="/discover" element={<Discover user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/location/:id" element={<Location user={user} setLocation={setLocation} />} />
            <Route path="/location" element={<Location user={user} />} />
            <Route path="/" element={<Home user={user} />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
