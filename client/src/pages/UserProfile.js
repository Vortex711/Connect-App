import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Review from '../components/Review';
import getUserFromToken from '../util/auth';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null)
  const [ratings, setRatings] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rated, setRated] = useState(false);
  const [currUser, setCurrUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } 
        const data = await response.json();
        setUser(data);
        const res = await fetch(`/api/ratings/rating/${data.username}`)
        const status = await res.json();
        const reviewsResponse = await fetch(`/api/ratings/reviews/${data.username}`)
        const reviewDetails = await reviewsResponse.json()
        const ratingsResponse = await fetch(`/api/ratings/${data.username}`)
        const ratingDetails = await ratingsResponse.json()
        const getUser = getUserFromToken()
        const userResponse = await fetch(`/api/users/${getUser.id}`)
        const currentUser = await userResponse.json()
        setCurrUser(currentUser)
        setReviews(reviewDetails)
        console.log(reviewDetails)
        setRatings(ratingDetails)
        console.log(ratingDetails)
        if (status.rated) {
            setRated(true)
        } else {
            setRated(false)
        }
        setLoading(false);
      } catch (err) {
        setCurrUser(false)
        setRated(false)
        setUser(null)
        setReviews(null)
        setRatings(null)
        setError(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const refresh = () => {
    window.location.reload()
  }

  if (loading) return <div className="loading-container"><div className="loading"><center>Loading...</center></div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <Navbar logged = {true} />
        <div className="profile-container">
          <div className="initial-profile-container">
            <div className="user-details-container">
              <h1>{`${user.username} (${user.ratingCount})`}</h1>
              <div className="user-details">
                <div className="user-labels">
                  <p><strong>Name:</strong> </p>
                  <p><strong>Age:</strong></p> 
                  <p><strong>Gender:</strong></p> 
                  <p><strong>Appearance:</strong></p> 
                  <p><strong>Personality:</strong></p>   
                </div>
                <div className="user-values">
                  <p>{user.name}</p>
                  <p>{user.age}</p>
                  <p>{user.gender}</p>
                  <p>{user.appearance}</p>
                  <p>{user.personality}</p>
                </div>
              </div>
              <div class="button-container">
                  {!rated && <Link to={`/rate/${user._id}`}><button className="buttons">Rate</button></Link>}
                  <Link to={"/home"}><button className="buttons">Back</button></Link>
              </div>
            </div>
            <div className="ratings-container">
              {ratings.length === 0 && <h2>{"No ratings :("}</h2>}
              {ratings.length !== 0 && <h2>Given Reviews</h2>}
              <div className="reviews">
                {ratings && ratings.map((rating) => (
                  <Review key={rating.reviewedUsername} rev={rating} rating={true} username={currUser.username}/>
                ))}
              </div>
            </div>
          </div>
          <div className="reviews-container">
            {reviews.length === 0 && <h2>{"No reviews :("}</h2>}
            {reviews.length !== 0 && <h2>Received Reviews</h2>}
            <div className="reviews">
              {reviews && reviews.map((review) => (
                <Review key={review.reviewerUsername} rev={review} rating={false} username={currUser.username} refresh={refresh}/>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default UserProfile;
