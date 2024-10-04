import { useEffect, useState } from "react"

const Review = ({rev, rating, username, refresh}) => {
    const [review, setReview] = useState(rev)
    const [liked, setLiked] = useState(false)
    const [likeOpacity, setLikeOpacity] = useState(1)
    const [disliked, setDisliked] = useState(false)
    const [dislikeOpacity, setDislikeOpacity] = useState(1)
    const [del, setDel] = useState(false)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        const check = async () => {
            if (deleted) {
                setDeleted(false)
                refresh()
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/likes/check/${review._id}`)
                const status = await response.json()
                console.log(status.liked)
                if (status.liked) {
                    setLiked(true)
                    setLikeOpacity(0.6)
                } else {
                    setLiked(false)
                    setLikeOpacity(1)
                }
                const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/dislikes/check/${review._id}`)
                const json = await res.json()
                console.log(status.disliked)
                if (json.disliked) {
                    setDisliked(true)
                    setDislikeOpacity(0.6)
                } else {
                    setDisliked(false)
                    setDislikeOpacity(1)
                }
                
                
            } catch(err) {
                console.log(err)
                setLiked(false)
                setLikeOpacity(1)
                setDisliked(false)
                setDislikeOpacity(1)
            }
        }

        check()
    }, [liked, disliked, review, del, deleted, refresh])

    const handleLike = async () => {
        if (liked) {
            try {
                const removed = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/likes/remove`, {
                    method: 'DELETE',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await removed.json()
                console.log(json)
                const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/likes/update`, {
                    method: 'PATCH',
                    body: JSON.stringify({reviewId: review._id, liked: liked}),
                    headers: {'Content-Type': 'application/json'}
                })
                const updatedReview = await response.json()
                setReview(updatedReview)
                setLiked(false)
                setLikeOpacity(1)
            } catch (err) {
                console.log(err)
                setLiked(true)
                setLikeOpacity(0.6)
            }
        } else {
            if (disliked) {
                handleDislike()
            }
            try{
                const added = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/likes/add`, {
                    method: 'POST',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await added.json()
                console.log(json)
                const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/likes/update`, {
                    method: 'PATCH',
                    body: JSON.stringify({reviewId: review._id, liked: liked}),
                    headers: {'Content-Type': 'application/json'}
                })
                const updatedReview = await response.json()
                console.log(updatedReview)
                setReview(updatedReview)
                setLiked(true)
                setLikeOpacity(0.6)
            } catch(err) {
                console.log(err)
                setLiked(false)
                setLikeOpacity(1)
                setReview(rev)
            }
        }

        
    }

    const handleDislike = async () => {
        if (disliked) {
            try {
                const removed = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/dislikes/remove`, {
                    method: 'DELETE',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await removed.json()
                console.log(json)
                const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/dislikes/update`, {
                    method: 'PATCH',
                    body: JSON.stringify({reviewId: review._id, disliked: disliked}),
                    headers: {'Content-Type': 'application/json'}
                })
                const updatedReview = await response.json()
                setReview(updatedReview)
                setDisliked(false)
                setDislikeOpacity(1)
            } catch (err) {
                console.log(err)
                setDisliked(true)
                setDislikeOpacity(0.6)
            }
        } else {
            if (liked) {
                handleLike()
            }
            try{
                const added = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/dislikes/add`, {
                    method: 'POST',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await added.json()
                console.log(json)
                const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/dislikes/update`, {
                    method: 'PATCH',
                    body: JSON.stringify({reviewId: review._id, disliked: disliked}),
                    headers: {'Content-Type': 'application/json'}
                })
                const updatedReview = await response.json()
                console.log(updatedReview)
                setReview(updatedReview)
                setDisliked(true)
                setDislikeOpacity(0.6)
            } catch(err) {
                console.log(err)
                setDisliked(false)
                setDislikeOpacity(1)
                setReview(rev)
            }
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/ratings/delete`, {
                method: 'DELETE',
                body: JSON.stringify({reviewId: review._id}),
                headers: {'Content-Type': 'application/json'}
            })
            const deleted = await response.json()
            console.log(deleted)
            const updateResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/ratings/updateUser`, {
                method: 'PATCH',
                body: JSON.stringify({review: deleted, remove: true}),
                headers: {'Content-Type': 'application/json'}
            })
            const json = updateResponse.json()
            console.log(json)
            setDeleted(true)
            setDel(false)
        } catch (err) {
            setDeleted(false)
            console.log(err)
            setDel(false)
        }
    }

    if (deleted) return <></>

    if (del) return (
        <div className="review-container">
            <h3>Are you sure you want to delete this review?</h3>
            <div className="button-container">
                <button className="buttons" onClick={handleDelete}>Yes</button>
                <button className="buttons" onClick={() => setDel(false)}>No</button>
            </div>
        </div>
    )
    return (
        <div className="review-container">
            <div>
                <div class="review-top">
                    {!rating && <h3>{review.reviewerUsername.toUpperCase()}</h3>}
                    {rating && <h3>{review.reviewedUsername.toUpperCase()}</h3>}
                    {username === review.reviewerUsername && <button class="like-dislike-button" onClick={() => {setDel(true) 
                        console.log('pressed')}}><img src="/icons/bin.png" alt="delete-img"></img></button> }
                </div>
                <p><strong>Appearance: </strong>{review.appearance}</p>
                <p><strong>Personality: </strong>{review.personality}</p>
                {review.content && <p><strong className="content">Content: </strong>{review.content}</p>}
            </div>
            <div className="like-dislike-container">
                <div className="small-container">
                    <button className="like-dislike-button" onClick={handleLike} style={{opacity: likeOpacity}}>
                        <img src="/icons/like.png" alt="like button"/>
                    </button>
                    <span className="like-dislike-number">{review.likes}</span>
                    
                </div>
                <div className="small-container">
                    <button className="like-dislike-button" onClick={handleDislike} style={{opacity: dislikeOpacity}}>
                        <img src="/icons/dislike.png" alt="dislike button"/>
                    </button>
                    <span className="like-dislike-number">{review.dislikes}</span>
                </div>
            </div>
        </div>
        
    )
}

export default Review