import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/UserProfile';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Logout from './pages/Logout';
import RateUser from './pages/RateUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
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
              element={<User/>}
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
