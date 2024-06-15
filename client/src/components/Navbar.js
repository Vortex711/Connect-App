import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const logged = props.logged

    return (
        <div class="header">
            <div className="container">
                <Link to="/home">
                    <h1>RateRipple</h1>
                </Link>
                <div className='auth-links'>
                    {logged && <Link to="/logout"><h2>Logout</h2></Link>}
                    {!logged && <Link to="/login"><h2>Login</h2></Link>}
                    {!logged && <Link to="/signup"><h2>Sign Up</h2></Link>}
                </div>
            </div>
        </div>
    )
}

export default Navbar