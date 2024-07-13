import React, { useState } from 'react';
import './UrlInput.css'; // Importing internal CSS file

const UrlInput = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleShortenUrl = async () => {
    try {
      const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (!response.ok) {
        throw new Error('Error shortening URL');
      }

      const data = await response.json();
      setShortenedUrl(`http://localhost:5000/${data.shortCode}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setErrorMessage('Failed to shorten URL');
    }
  };

  const handleInputChange = (event) => {
    setOriginalUrl(event.target.value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="container mx-auto mt-5 text-center">
      <div className="url-input-container">
        <h2 className="mb-4">URL Shortener</h2>
        <input
          type="text"
          value={originalUrl}
          onChange={handleInputChange}
          placeholder="Enter URL"
          className="url-input"
        />
        <br />
        <button
          onClick={handleShortenUrl}
          className="url-button"
        >
          Shorten
        </button>
        {shortenedUrl && (
          <div className="mt-3">
            <p className="mb-2">Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="shortened-url">
              {shortenedUrl}
            </a>
            <button
              onClick={handleCopyToClipboard}
              className="copy-button"
            >
              Copy
            </button>
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UrlInput;
