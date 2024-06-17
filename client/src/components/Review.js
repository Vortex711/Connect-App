import { useEffect, useState } from "react"

const Review = ({rev}) => {
    const [review, setReview] = useState(rev)
    const [liked, setLiked] = useState(false)
    const [likeOpacity, setLikeOpacity] = useState(1)
    const [disliked, setDisliked] = useState(false)
    const [dislikeOpacity, setDislikeOpacity] = useState(1)

    useEffect(() => {
        const check = async () => {
            try {
                const response = await fetch(`/api/likes/check/${review._id}`)
                const status = await response.json()
                console.log(status.liked)
                if (status.liked) {
                    setLiked(true)
                    setLikeOpacity(0.6)
                } else {
                    setLiked(false)
                    setLikeOpacity(1)
                }
                const res = await fetch(`/api/dislikes/check/${review._id}`)
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
    }, [liked, disliked, review])

    const handleLike = async () => {
        if (liked) {
            try {
                const removed = await fetch(`/api/likes/remove`, {
                    method: 'DELETE',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await removed.json()
                console.log(json)
                const response = await fetch('/api/likes/update', {
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
                const added = await fetch(`/api/likes/add`, {
                    method: 'POST',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await added.json()
                console.log(json)
                const response = await fetch('/api/likes/update', {
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
                const removed = await fetch(`/api/dislikes/remove`, {
                    method: 'DELETE',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await removed.json()
                console.log(json)
                const response = await fetch('/api/dislikes/update', {
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
                const added = await fetch(`/api/dislikes/add`, {
                    method: 'POST',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await added.json()
                console.log(json)
                const response = await fetch('/api/dislikes/update', {
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

    return (
        <div className="review-container">
            <div>
                <h3>{review.reviewerUsername.toUpperCase()}</h3>
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