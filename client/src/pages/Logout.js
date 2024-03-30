import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const Logout = () => {
    useEffect(() => {
        fetch('/api/users/logout')
    }, [])
    
    return <Navigate to="/" />
}

export default Logout