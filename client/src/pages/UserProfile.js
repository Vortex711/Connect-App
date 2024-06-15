import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
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
        console.log(res)
        if (res.rated) {
            setRated(true)
        } else {
            setRated(false)
        }
        setLoading(false);
      } catch (err) {
        setRated(false)
        setError(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <Navbar logged = {true} />
        <div className="profile-container">
            <h1>{user.username}</h1>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Appearance: {user.appearance}</p>
            <p>Personality: {user.personality}</p>
            <p>Ratings: {user.ratingCount}</p>
            <div>
                {!rated && <button>Rate</button>}
                <Link to={"/home"}><button>Back</button>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default UserProfile;
