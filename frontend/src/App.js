import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Header from "./Base/Header";
import Footer from "./Base/Footer";

import Home from "./Pages/Home";
import Location from "./Pages/Location";

import './styles/app.scss'
import './styles/base.scss'

function App() {

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

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/location/:id" element={<Header />} />
          <Route path="/location/" element={<Header />} />
          <Route path="/" element={<Header />} />
        </Routes>
        <div className="content">
          <Routes>
            <Route path="/location/:id" element={<Location />} />
            <Route path="/location" element={<Location />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
