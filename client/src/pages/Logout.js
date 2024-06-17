import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const Logout = () => {
    useEffect(() => {
        fetch('/api/users/logout')
        localStorage.removeItem('token')
    }, [])
    
    return <Navigate to="/" />
}

export default Logout