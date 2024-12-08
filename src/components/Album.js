// Importing necessary React and React Router DOM libraries
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Importing functions to fetch data from the API
import { fetchAlbumById, fetchPhotosByAlbumId } from '../api/fetchData';

// Component to display details of an album and its photos
const Album = () => {
  // Get album ID from the route parameters
  const { id } = useParams();

  // State variables to hold album data, photos, loading state, and error messages
  const [album, setAlbum] = useState(null); // Stores album information
  const [photos, setPhotos] = useState([]); // Stores photos in the album
  const [loading, setLoading] = useState(true); // Tracks whether data is still loading
  const [error, setError] = useState(null); // Tracks errors during data fetching

  // Fetch album and photo data whenever the ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Show loading indicator
        const albumData = await fetchAlbumById(id); // Fetch album details
        setAlbum(albumData); // Store album data

        const albumPhotos = await fetchPhotosByAlbumId(id); // Fetch photos for the album
        setPhotos(albumPhotos); // Store photo data

        setLoading(false); // Stop loading indicator
      } catch (err) {
        setError('Failed to load album data'); // Display error message
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [id]); // Dependencies for the effect (run when ID changes)

  // Render a loading indicator while data is being fetched
  if (loading) return <div>Loading...</div>;

  // Render an error message if data fetching fails
  if (error) return <div>{error}</div>;

  // Render album details and the list of photos
  return (
    <>
      {/* Inline CSS for styling */}
      <style>
        {`
          .album-container {
            padding: 20px;
          }

          .photo-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            list-style: none;
            padding: 0;
          }

          .photo-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
          }

          .photo-image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
          }

          .photo-item:hover .photo-image {
            transform: scale(1.1);
          }

          .photo-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .photo-item:hover .photo-overlay {
            opacity: 1;
          }

          .photo-title {
            font-size: 14px;
            text-align: center;
            padding: 10px;
          }
        `}
      </style>

      <div className="album-container">
        <h1>Album Information</h1>
        {album && (
          <div className="album-details">
            {/* Displaying album details */}
            <h2>{album.title}</h2>
            <p>Album ID: {album.id}</p>
            <p>User ID: {album.userId}</p>
          </div>
        )}

        <h2>Photos</h2>
        {photos.length > 0 ? (
          <ul className="photo-list">
            {/* Render each photo as a list item */}
            {photos.map((photo) => (
              <li key={photo.id} className="photo-item">
                <Link to={`/photo/${photo.id}`} className="photo-link">
                  <img src={photo.thumbnailUrl} alt={photo.title} className="photo-image" />
                  <div className="photo-overlay">
                    <p className="photo-title">{photo.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          // Display a message if no photos are found
          <p>No photos found for this album.</p>
        )}
      </div>
    </>
  );
};

export default Album; // Export the Album component
