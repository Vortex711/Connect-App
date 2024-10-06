import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getUserFromToken from '../util/auth'

const Navbar = ( { logged } ) => {
    const [userId, setUserId] = useState(null)
    const [image, setImage] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const userDetails = getUserFromToken()
            console.log(userDetails)
            if (userDetails) {
                setUserId(userDetails.id)
                try{
                    const userResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/${userId}`)
                    const user = await userResponse.json()
                    setImage(user.image)
                    console.log("image set" + image)
                } catch(err) {
                    setImage(null)
                }
                
            } else {
                setUserId(null)
            }
        }
        
        fetchUser()
    }, [userId, image])

    return (
        <div className="header">
            <div className="container">
                <Link to="/home">
                    <h1>RateRipple</h1>
                </Link>
                <div className='auth-links'>
                    {logged && <Link to="/logout"><h2>Logout</h2></Link>}
                    {logged && userId && <Link to={`/user/${userId}`} ><img className="profile-img" src="/icons/user.png" alt="profile-img"/></Link>}
                    {!logged && <Link to="/login"><h2>Login</h2></Link>}
                    {!logged && <Link to="/signup"><h2>Sign Up</h2></Link>}
                </div>
            </div>
        </div>
    )
}

export default Navbar