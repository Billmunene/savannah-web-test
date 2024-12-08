import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPhotoById, updatePhotoTitle } from "../api/fetchData";

const Photo = ({ theme }) => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const photoData = await fetchPhotoById(id);
        setPhoto(photoData);
        setNewTitle(photoData.title);
        setLoading(false);
      } catch (err) {
        setError("Failed to load photo data");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewTitle(photo.title);
  };

  const handleSave = async () => {
    try {
      const updatedPhoto = await updatePhotoTitle(id, { title: newTitle });
      setPhoto(updatedPhoto);
      setEditing(false);
    } catch (err) {
      setError("Failed to update photo title");
    }
  };

  // Define theme-specific styles
  const containerStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
    },
    dark: {
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
    },
  };

  // Get current theme style based on the passed theme prop
  const currentStyles = containerStyles[theme] || containerStyles["light"];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        ...currentStyles,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "60%",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={photo.url}
          alt={photo.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {editing ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                marginBottom: "10px",
                padding: "5px",
                fontSize: "16px",
                color: currentStyles.color,
                backgroundColor: theme === "dark" ? "#333333" : "#f9f9f9",
                border: `1px solid ${theme === "dark" ? "#555555" : "#cccccc"}`,
                borderRadius: "5px",
              }}
            />
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{photo.title}</h2>
            <button
              onClick={handleEdit}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              Edit Title
            </button>
          </div>
        )}
        <p>Photo ID: {photo.id}</p>
        <p>Album ID: {photo.albumId}</p>
      </div>
    </div>
  );
};

export default Photo;
