import React, { useEffect } from 'react';

const GoogleAuth = ({ setAuth }) => {
  useEffect(() => {
    /* global google */
    const initializeGoogleLogin = () => {
      google.accounts.id.initialize({
        client_id: '10331623057-ocm3ve2cqrk4v9lmj7ec6bm82ri14ll4.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    };

    const handleCredentialResponse = (response) => {
      console.log('Encoded JWT ID token:', response.credential); // This can be sent to a backend for verification
      setAuth(true); // Update auth state to true
    };

    initializeGoogleLogin();
  }, [setAuth]);

  return <div id="googleSignInButton"></div>;
};

export default GoogleAuth;
