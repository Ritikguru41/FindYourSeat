import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api-helpers/api-helpers';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  useEffect(() => {
    if (!userId) {
      navigate('/Auth'); // Redirect to login if not logged in
      return;
    }
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove session
    navigate('/Auth'); // Redirect to login
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
