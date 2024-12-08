import React, { useState, useEffect } from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase'; // Import Firebase auth and provider
import Landing from './components/Landing';
import Login from './components/Login';
import Home from './components/Home';
import User from './components/User';
import Album from './components/Album';
import Photo from './components/Photo';

const App = () => {
  const location = useLocation(); // useLocation now safely used
  const [authUser, setAuthUser] = useState(null); // Store the authenticated user
  const [darkMode, setDarkMode] = useState(false); // For dark mode toggle

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        setAuthUser(null);
        localStorage.removeItem('authUser');
      }
    });

    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setAuthUser(result.user);
      localStorage.setItem('authUser', JSON.stringify(result.user));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAuthUser(null);
    localStorage.removeItem('authUser');
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}
    >
      <header className="p-4 shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h1>App Title</h1>
          <div className="flex items-center space-x-4">
            {authUser ? (
              <>
                <div className="text-lg font-semibold">{authUser.displayName}</div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                Login with Google
              </button>
            )}
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={
              authUser ? <Navigate to="/home" state={{ from: location }} /> : <Login />
            }
          />
          <Route
            path="/home"
            element={authUser ? <Home /> : <Navigate to="/login" state={{ from: location }} />}
          />
          <Route
            path="/user/:id"
            element={authUser ? <User /> : <Navigate to="/login" state={{ from: location }} />}
          />
          <Route
            path="/album/:id"
            element={authUser ? <Album /> : <Navigate to="/login" state={{ from: location }} />}
          />
          <Route
            path="/photo/:id"
            element={authUser ? <Photo /> : <Navigate to="/login" state={{ from: location }} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
