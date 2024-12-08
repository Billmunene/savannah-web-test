// Importing React, React Router DOM's Link, and API data fetching functions
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, fetchAlbumsByUserId } from '../api/fetchData';

// Home component displays the list of users with their album count
const Home = ({ darkMode }) => {
  // State variables to hold users, album count, loading state, and error messages
  const [users, setUsers] = useState([]); // Stores list of users
  const [albumsCount, setAlbumsCount] = useState({}); // Stores album count for each user
  const [loading, setLoading] = useState(true); // Tracks whether data is still loading
  const [error, setError] = useState(null); // Tracks errors during data fetching

  // Fetch users and album count when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Show loading indicator

        // Fetch users from API
        const usersData = await fetchUsers();
        setUsers(usersData); // Store users data

        // Fetch album count for each user
        const albumCounts = {};
        for (const user of usersData) {
          const userAlbums = await fetchAlbumsByUserId(user.id); // Fetch albums for each user
          albumCounts[user.id] = userAlbums.length; // Store the album count
        }
        setAlbumsCount(albumCounts); // Update album count state

        setLoading(false); // Stop loading indicator
      } catch (err) {
        setError('Failed to load data'); // Display error message
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Empty dependency array, so the effect runs once when the component mounts

  // Render a loading message while data is being fetched
  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  // Render an error message if data fetching fails
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Render user data in a table format with dark mode support
  return (
    <div
      className={`p-6 rounded-lg shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Current Leads</h1>
      <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr
            className={`border-b ${
              darkMode ? 'border-gray-700 bg-gray-700 text-gray-300' : 'border-gray-300 bg-gray-100 text-gray-700'
            }`}
          >
            {/* Table headers */}
            <th className="p-4">Avatar</th>
            <th className="p-4">Name</th>
            <th className="p-4">Albums</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each user as a table row */}
          {users.map((user) => (
            <tr
              key={user.id}
              className={`border-b ${
                darkMode
                  ? 'border-gray-700 hover:bg-gray-700'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              <td className="p-4">
                {/* Display user avatar */}
                <img
                  src={`https://reqres.in/img/faces/${user.id}-image.jpg`}
                  alt={`${user.name} avatar`}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="p-4">
                {/* Link to user detail page */}
                <Link to={`/user/${user.id}`} className="text-blue-500 dark:text-blue-400 hover:underline">
                  {user.name}
                </Link>
              </td>
              <td className="p-4">{albumsCount[user.id] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home; // Export the Home component
