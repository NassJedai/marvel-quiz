import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

import '../../App.css';
import Login from '../Login';
import Footer from '../Footer';
import Header from '../Header';
import Landing from '../Landing';
import Welcome from '../Welcome';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgetPassword from "../ForgetPassword";

function App() {
  return (
        <Router>
            <Header/>
            <Routes>

            <Route path="/" element={<Landing/>}/>
            <Route path='/welcome' element={<Welcome/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/forgetpassword' element={<ForgetPassword/>}/>
            <Route path="*"  element={<ErrorPage/>}/>

          </Routes>
          <Footer/>
        </Router>

  );
}

export default App;