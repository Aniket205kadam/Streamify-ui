import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./GIF.scss";

const TENOR_API_KEY = String(import.meta.env.VITE_STREAMIFY_TENOR_API_KEY);
const CLIENT_KEY = String(import.meta.env.VITE_STREAMIFY_CLIENT_KEY);

function GIF({ onSelectGif }) {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchGif = async () => {
    const gifResponse = await fetch(
      `https://tenor.googleapis.com/v2/search?q=funny,cricket,coding,food,good morning,happy&key=${TENOR_API_KEY}&client_key=${CLIENT_KEY}&limit=50`
    );
    const json = await gifResponse.json();
    setGifs(json.results);
    setLoading(false);
  };

  const searchGifHandler = async () => {
    setLoading(true);
    const searchResponse = await fetch(
      `https://tenor.googleapis.com/v2/search?q=${search}&key=${TENOR_API_KEY}&limit=100`
    );
    const json = await searchResponse.json();
    setGifs(json.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchGif();
  }, []);

  return (
    <div className="gif-wrapper">
      <div className="gif-container">
        <div className="search">
          <input
            type="text"
            value={search}
            placeholder="Search.."
            onChange={(event) => setSearch(event.target.value)}
          />
          {search.length === 0 && (
            <FontAwesomeIcon icon={faSearch} className="fa-search" />
          )}
          {search.length > 0 && (
            <button className="btn" onClick={searchGifHandler}>
              Search
            </button>
          )}
        </div>
        {loading && (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        )}
        {!loading && (
          <div className="gifs">
            {gifs?.map((gif) => (
              <div
                className="gif"
                key={gif.id}
                onClick={() => {
                  onSelectGif(gif.media_formats.gif.url);
                }}
              >
                <img
                  src={gif.media_formats.gif.url}
                  alt={gif.content_description}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GIF;
