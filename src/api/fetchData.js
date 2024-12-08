import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all users
export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

// Fetch a user by ID
export const fetchUserById = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

// Fetch all albums
export const fetchAlbums = async () => {
  const response = await axios.get(`${BASE_URL}/albums`);
  return response.data;
};

// Fetch albums by user ID
export const fetchAlbumsByUserId = async (userId) => {
  const response = await axios.get(`${BASE_URL}/albums`, {
    params: { userId },
  });
  return response.data;
};

// Fetch an album by ID
export const fetchAlbumById = async (albumId) => {
  const response = await axios.get(`${BASE_URL}/albums/${albumId}`);
  return response.data;
};

// Fetch photos by album ID
export const fetchPhotosByAlbumId = async (albumId) => {
  const response = await axios.get(`${BASE_URL}/photos`, {
    params: { albumId },
  });
  return response.data;
};

// Fetch a photo by ID
export const fetchPhotoById = async (photoId) => {
  const response = await axios.get(`${BASE_URL}/photos/${photoId}`);
  return response.data;
};

// Update a photo's title
export const updatePhotoTitle = async (photoId, updatedData) => {
  const response = await axios.patch(`${BASE_URL}/photos/${photoId}`, updatedData);
  return response.data;
};
