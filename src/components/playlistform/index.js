import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import config from '../../lib/config';
import './index.css';

export default function CreatePlaylistForm({ uriTracks }) {
	const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.id);
    
    const [form, setForm] = useState({
        title: '',
        description: ''
    }) 

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.title.length > 10){
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                    }
                }
                
                const optionsCreatePlaylist = {
                    ...requestOptions,
                    body: JSON.stringify({
                        name: form.title,
                        description: form.description,
                        public: false,
                        collaborative: false,
                    }),
                }
                
                const responseCreatePlayList = await fetch(`${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`, optionsCreatePlaylist).then(data=> data.json());
                
                const optionsAddTrack = {
                    ...requestOptions,
                    body: JSON.stringify({
                      uriTracks
                     }),
                }
                
                await fetch(`${config.SPOTIFY_BASE_URL}/playlists/${responseCreatePlayList.id}/tracks`, optionsAddTrack).then(data=> data.json());
                
                
                setForm({ title: '', description: '' });
                alert('Playlist created successfully');
                
            } catch (error) {
            alert(error);
            }
        }else{
            alert('Title must be large than 10 characters');
        }
    }


  return (
    <div className="create-playlist-form">
        <h2>Create Playlist</h2>

        <form className="form form-playlist" onSubmit={handleSubmit}>         
            <input
			  className="form-search__input input-title-playlist"
              label="Title"
              placeholder="Title of playlist"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleChange}
              required
            />
                    
            <textarea
			  className="form-search__input"
              type='textarea'
              label="Description"
              placeholder="Description of playlist"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleChange}
              required
            />
          
          <div className="form-playlist__action">
            <button className='btn btn-create-playlist' type="submit">Create</button>
          </div>
        </form>
    </div>
  )
}