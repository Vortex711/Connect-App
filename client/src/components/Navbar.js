import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getUserFromToken from '../util/auth'

const Navbar = ( { logged } ) => {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userDetails = getUserFromToken()
            console.log(userDetails)
            if (userDetails) {
                setUserId(userDetails.id)
            } else {
                setUserId(null)
            }
            
        }
        
        fetchUser()
    }, [])

    return (
        <div class="header">
            <div className="container">
                <Link to="/home">
                    <h1>RateRipple</h1>
                </Link>
                <div className='auth-links'>
                    {logged && <Link to="/logout"><h2>Logout</h2></Link>}
                    {logged && userId && <Link to={`/user/${userId}`} ><img className="profile-img" src="/images/user.png" alt="profile"/></Link>}
                    {!logged && <Link to="/login"><h2>Login</h2></Link>}
                    {!logged && <Link to="/signup"><h2>Sign Up</h2></Link>}
                </div>
            </div>
        </div>
    )
}

export default Navbar