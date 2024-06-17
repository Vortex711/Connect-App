import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Landing = () => {
    
    return (
        <>
            <Navbar logged = {false}/>
            <div className="welcome-container">
                <h1>Welcome To <span className="title">RateRipple</span></h1>
                <p>RateRipple is a platform where you can rate others and you yourself can get rated as well. Want to know what others think of you? <Link to="/login">Login</Link> to RateRipple now!</p>
            </div>
        </>
        
    )
}

export default Landing