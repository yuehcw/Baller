import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/profile`,
        );
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.fullName}</p>
      <p>Email: {user.emailAddress}</p>
    </div>
  );
};

export default UserPage;
