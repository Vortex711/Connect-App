import { Link } from "react-router-dom"

const Landing = () => {
    
    return (
        <div className="user-container">
            <h1>Welcome To <span className="title">RateRipple</span></h1>
            <p>RateRipple is a platform where you can rate others anonymously and you yourself can get rated as well. Want to know your worth in society? <Link to="/login">Login</Link> to RateRipple now!</p>
        </div>
    )
}

export default Landing