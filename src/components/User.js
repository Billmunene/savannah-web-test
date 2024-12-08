import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchUserById, fetchAlbumsByUserId } from '../api/fetchData';

const User = ({ darkMode }) => {
  const { id } = useParams(); // Get user ID from the route params
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info'); // Tab state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user information
        const userData = await fetchUserById(id);
        setUser(userData);

        // Fetch user's albums
        const userAlbums = await fetchAlbumsByUserId(id);
        setAlbums(userAlbums);

        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={`container mx-auto p-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } rounded-lg shadow-lg`}
    >
      {/* User Info and Albums Tabs */}
      <div className="flex">
        {/* User Info Sidebar */}
        <div className="w-1/4 p-4 text-center">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : 'https://via.placeholder.com/150' // Fallback placeholder avatar
            }
            alt={user?.name}
            className="rounded-full mx-auto w-24 h-24 object-cover mb-4 shadow"
          />
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <div
            className={`border-b-2 ${
              darkMode ? 'border-blue-400' : 'border-blue-500'
            } w-10 mx-auto mt-2`}
          ></div>
        </div>

        {/* User Info/Albums Content */}
        <div
          className={`w-3/4 p-4 ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } rounded-lg`}
        >
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-2 px-4 text-sm ${
                activeTab === 'info'
                  ? `${
                      darkMode
                        ? 'border-b-2 border-blue-400 text-blue-400'
                        : 'border-b-2 border-blue-500 text-blue-500'
                    } font-bold`
                  : `${
                      darkMode
                        ? 'text-gray-300 hover:text-blue-400'
                        : 'text-gray-500 hover:text-blue-500'
                    }`
              }`}
            >
              User Info
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`py-2 px-4 text-sm ${
                activeTab === 'albums'
                  ? `${
                      darkMode
                        ? 'border-b-2 border-blue-400 text-blue-400'
                        : 'border-b-2 border-blue-500 text-blue-500'
                    } font-bold`
                  : `${
                      darkMode
                        ? 'text-gray-300 hover:text-blue-400'
                        : 'text-gray-500 hover:text-blue-500'
                    }`
              }`}
            >
              Albums <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded">{albums.length}</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-4">Full name</h3>
              <p>{user?.name}</p>
              <h3 className="text-lg font-semibold mt-4">User name</h3>
              <p>{user?.username}</p>
              <h3 className="text-lg font-semibold mt-4">Email address</h3>
              <p>{user?.email}</p>
              <h3 className="text-lg font-semibold mt-4">Address</h3>
              <p>{`${user?.address?.street}, ${user?.address?.suite}, ${user?.address?.city} - ${user?.address?.zipcode}`}</p>
              <h3 className="text-lg font-semibold mt-4">Phone</h3>
              <p>{user?.phone}</p>
              <h3 className="text-lg font-semibold mt-4">Website</h3>
              <p>
                <a
                  href={`https://${user?.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {user?.website}
                </a>
              </p>
              <h3 className="text-lg font-semibold mt-4">Company</h3>
              <p>
                <span className="block">{user?.company?.name}</span>
                <span className="text-sm text-gray-500">{user?.company?.catchPhrase}</span>
              </p>
            </div>
          )}
          {activeTab === 'albums' && (
            <div className="mt-4">
              {albums.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {albums.map((album) => (
                    <li key={album.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
                      <Link to={`/album/${album.id}`}>
                        <h3 className="text-blue-500 font-semibold">{album.title}</h3>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No albums found for this user.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
