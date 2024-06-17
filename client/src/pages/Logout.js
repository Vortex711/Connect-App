import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const Logout = () => {
    useEffect(() => {
        const logout = async () => {
            await fetch('/api/users/logout')
            localStorage.removeItem('jwt')
        }
        logout()
    }, [])
    
    return <Navigate to="/" />
}

export default Logout