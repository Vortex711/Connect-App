import { useState } from "react"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {username, password}
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
            <label>Password: </label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm