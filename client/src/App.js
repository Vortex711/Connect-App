import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Logout from './pages/Logout';
import RateUser from './pages/RateUser';
import UserProfile from './pages/UserProfile';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <ScrollToTop />
          <Routes>
            <Route 
              path='/'
              element={<Landing/>}
            />
            <Route
              path='/login'
              element={<Login/>}
            />
            <Route
              path='/signup'
              element={<SignUp/>}
            />
            <Route
              path='/home'
              element={<Home/>}
            />
            <Route
              path='/logout'
              element={<Logout/>}
            />
            <Route 
              path='/user/:userId' 
              element={<UserProfile/>}
            />
            <Route 
              path='/rate/:userId'
              element={<RateUser/>}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
