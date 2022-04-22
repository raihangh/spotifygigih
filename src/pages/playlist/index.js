import React, { useState } from 'react'
import SearchBar from "../../components/searchbar";
import CreatePlaylistForm from "../../components/playlistform";
import "./index.css";
import Navbar from '../../components/navbar';
import Track from '../../components/musicbox/index';
import { useEffect } from 'react';

const CreatePlayList = () =>{
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const [message, setMessage] = useState('No tracks');

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const onSuccessSearch = (searchTracks, query) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks(() => {
      const _tracks = [...new Set([...selectedSearchTracks, ...searchTracks])];

      if (_tracks.length === 0) {
        setMessage(`No tracks found with query "${query}"`);
      } else {
        setMessage('');
      }

      return _tracks;
    });
  }

  const clearSearch = () => {
    setTracks(selectedTracks);
    setMessage('No tracks');
    setIsInSearch(false);
  }

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

	return (
		<div className="home">
          <div className='navbar-wrap'>
            <Navbar /></div>
          <div className='search-bar'>
            <SearchBar  onSuccess={onSuccessSearch}
              onClearSearch={clearSearch}/>
          </div>
            <CreatePlaylistForm  uris={selectedTracksUri}/>
          
            <div className="content">
              {tracks.length === 0 && (
                <p>{message}</p>
              )}

              <div className="music-box" data-testid = "tracks-list">

                {tracks.map((song) => (
                  // eslint-disable-next-line react/jsx-pascal-case
                  <Track
                    key={song.id}
                    urlimg={song.album.images[0].url}
                    title={song.name}
                    artist={song.artists[0].name}
                    urlspotify={song.external_urls.spotify}
                    select={selectedTracksUri.includes(song.uri)}
                    toggleSelect={() => toggleSelect(song)}
                  />
                ))}

              </div>
            </div>
          </div>
  )
}


export default CreatePlayList;