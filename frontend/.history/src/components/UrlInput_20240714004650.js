// frontend/src/components/UrlInput.js

import React, { useState } from 'react';

const UrlInput = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await response.json();
      setShortenedUrl(`http://localhost:5000/${data.shortCode}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>URL Shortener</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter your URL"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Shorten URL</button>
      </form>
      {shortenedUrl && (
        <div style={styles.result}>
          <p style={styles.shortenedUrl}>{shortenedUrl}</p>
          <button onClick={handleCopy} style={styles.button}>Copy URL</button>
          {copySuccess && <span style={styles.copySuccess}>{copySuccess}</span>}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    width: '100%',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  result: {
    marginTop: '20px',
    textAlign: 'center',
  },
  shortenedUrl: {
    fontSize: '1.2em',
    color: '#333',
    marginBottom: '10px',
  },
  copySuccess: {
    color: 'green',
    marginLeft: '10px',
  },
};

export default UrlInput;
