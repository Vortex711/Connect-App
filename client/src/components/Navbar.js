import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/home">
                    <h1>RateRipple</h1>
                </Link>
                <div className='auth-links'>
                    <Link to="/logout"><h2>Logout</h2></Link>
                    <Link to="/login"><h2>Login</h2></Link>
                    <Link to="/signup"><h2>Sign Up</h2></Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar