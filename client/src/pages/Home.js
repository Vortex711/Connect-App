import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import User from "../components/User";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [searchString, setSearchString] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const fetchUsers = async () => {
            let response, json
            if (searchString) {
                response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/username/${searchString}`,{
                    method: 'GET',
                    credentials: 'include',
                })
                setSearchInput('')
                setPageCount(10)
                json = await response.json()
                if (response.ok) {
                    setUsers(json)
                    setPageCount(1)
                    setError(null)
                } else{
                    if (json.error === 'Unverified' || json.error === 'No token'){
                        console.log('NOT LOGGED IN!')
                        setError(json)
                    }    
                }
            } else {
                response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/home?p=${currentPage > 0 ? currentPage : 0}`,{
                    method: 'GET',
                    credentials: 'include',
                })
                const pageCountResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/count`, {
                    method: 'GET',
                    credentials: 'include',
                })
                const pageCountData = await pageCountResponse.json()
                setPageCount(pageCountData)
                json = await response.json()
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
        }

        fetchUsers()
    }, [searchString, currentPage])

    const handlePageClick = async (e) => {
        console.log(e.selected)
        setCurrentPage(parseInt(e.selected))
    }

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
            <ReactPaginate
                className="paginate-container"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                activeClassName="active"
            />
        </div>
    )
}

export default Home