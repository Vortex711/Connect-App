import { useState } from "react"
import { Navigate } from "react-router-dom"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {username, password}

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {'Content-Type': 'application/json'}
            })
            const json = await response.json()
            if (response.ok) {
                localStorage.setItem('jwt', json.token);
                setError(null)
                setIsLoggedIn(true)
            }

            if (!response.ok) {
                setError(json)
                console.log(error)
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    if (isLoggedIn) {
        return <Navigate to="/home" />
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="form-heading">Login</h2>
            
            <label>Username: </label>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value = {username}
            />
            {error.username && <span className="error">{error.username}</span>}
            <label>Password: </label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
            />
            {error.password && <span className="error">{error.password}</span>}
            <button className="buttons" type="submit">Login</button>
        </form>
    )
}

export default LoginForm