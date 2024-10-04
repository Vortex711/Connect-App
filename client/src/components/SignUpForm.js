import { useState } from "react"
import { Navigate } from 'react-router-dom';

const SignUpForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [error, setError] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!(isNaN(parseInt(age)))) {
            setAge(parseInt(age))
        }
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('name', name)
        formData.append('image', file)
        formData.append('age', age)
        formData.append('gender', gender)

        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/signup`, {
            method: 'POST',
            body: formData
        })

        const json = await response.json()
        
        if (!response.ok) {
            setError(json)
            console.log(error)
        }

        if (response.ok) {
            setError(null)
            console.log('New user added!', json)
            setIsSignedIn(true)
        }
    }

    if (isSignedIn) {
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className="form-heading">Sign Up</h2>
            
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
            <label>Name: </label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value = {name}
            />
            {error.name && <span className="error">{error.name}</span>}
            <label>Age: </label>
            <input 
                type="text" 
                onChange={(e) => setAge(e.target.value)}
                value = {age}
            />
            <label>Profile Picture: </label>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
            />
            {error.age && <span className="error">{error.age}</span>}
            <div className="gender">
                <label>Gender: </label>
                <input 
                    type="radio" 
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    value = "Male"
                />Male
                <input 
                    type="radio" 
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    value = "Female"
                />Female
                <input 
                    type="radio" 
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    value = "Other"
                />Other
            </div>
            {error.gender && <span className="error">{error.gender}</span>}
            <button className="buttons" type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpForm