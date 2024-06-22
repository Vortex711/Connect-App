import { useEffect, useState } from "react"
import User from "../components/User"
import { Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const Home = () => {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            let response
            if (searchString) {
                response = await fetch(`/api/users/username/${searchString}`)
                setSearchInput('')
            } else {
                response = await fetch('/api/users/home')
            }
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                setUsers(json)
                setError(null)
            } else{
                if (json.error === 'Unverified' || json.error === 'No token'){
                    console.log('NOT LOGGED IN!')
                    setError(json)
                }    
            }
        }

        fetchUsers()
    }, [searchString])

    if (error) {
        return <Navigate to='/' />
    }

    return (
        <div className="home">
            <Navbar logged= {true} />
            <div className="search-container">
                <div className="search-box">
                    <input
                    className="search-bar" 
                    type="text" 
                    value={searchInput} placeholder="Username" 
                    onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="search-button" onClick={() => setSearchString(searchInput)}>
                        <img src="/icons/search.png" alt="Search" className="search-icon"/>
                    </button>
                </div>
            </div>
            <div className="users">
                {(!users || users.length === 0) && <h2>No users found!</h2>}
                {users && users.map((user) => (
                    <User key={user._id} user={user}></User>
                ))}
            </div>
        </div>
    )
}

export default Home