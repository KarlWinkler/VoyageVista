import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useQuery } from 'react-query';


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

  // let clearSelects = (e) => {
  //   // closes all dropdowns when clicking outside of them
  //   let selects = document.querySelectorAll('.SearchSelect')
  //   selects.forEach((select) => {
  //     let input = select.querySelector('.SearchSelectInput')
  //     let options = select.querySelector('.SearchSelectOptions')

  //     if (e.target !== input && e.target !== options && !options.contains(e.target)) {
  //       select.querySelector('.SearchSelectOptions').classList.remove('active')
  //     }
  //   })
  // }
  user = user?.id ? user : null;
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/explore" element={<Header user={user} name={'Explore'} />} />
          <Route path="/discover" element={<Header user={user} name={'Discover'} />} />
          <Route path="/profile" element={<Header user={user} name={'Profile'} />} />
          <Route path="/location/:id" element={<Header user={user} />} />
          <Route path="/location/" element={<Header user={user} />} />
          <Route path="/" element={<Header user={user} />} />
        </Routes>
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login user={user}/>} />
            <Route path="/signup" element={<Signup user={user}/>} />
            <Route path="/explore" element={<Explore user={user}/>} />
            <Route path="/discover" element={<Discover user={user}/>} />
            <Route path="/profile" element={<Profile user={user}/>} />
            <Route path="/location/:id" element={<Location user={user}/>} />
            <Route path="/location" element={<Location user={user}/>} />
            <Route path="/" element={<Home user={user}/>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
