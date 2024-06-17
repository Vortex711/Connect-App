import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Review from '../components/Review';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rated, setRated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
        const res = await fetch(`/api/ratings/${data.username}`)
        const status = await res.json();
        const reviewsResponse = await fetch(`/api/ratings/reviews/${data.username}`)
        const reviewDetails = await reviewsResponse.json()
        setReviews(reviewDetails)
        console.log(reviewDetails)
        if (status.rated) {
            setRated(true)
        } else {
            setRated(false)
        }
        setLoading(false);
      } catch (err) {
        setRated(false)
        setUser(null)
        setReviews(null)
        setError(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="loading-container"><div className="loading"><center>Loading...</center></div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <Navbar logged = {true} />
        <div className="profile-container">
          <div className="user-details-container">
            <h1>{user.username}</h1>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Appearance: {user.appearance}</p>
            <p>Personality: {user.personality}</p>
            <p>Ratings: {user.ratingCount}</p>
            <div class="button-container">
                {!rated && <Link to={`/rate/${user._id}`}><button>Rate</button></Link>}
                <Link to={"/home"}><button>Back</button></Link>
            </div>
          </div>
          <div className="reviews-container">
              {reviews.length === 0 && <h2>{"No reviews :("}</h2>}
              {reviews.length !== 0 && <h2>Reviews</h2>}
              <div className="reviews">
                {reviews && reviews.map((review) => (
                  <Review key={review.reviewerUsername} review={review} />
                ))}
              </div>
          </div>
        </div>
    </div>
  );
};

export default UserProfile;
