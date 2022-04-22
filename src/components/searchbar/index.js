import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useState } from 'react';
import './index.css';

export default function SearchBar({ onSuccess, onClearSearch }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchTrack(text, accessToken);
      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      toast.error(e);
    }
  }
  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }
  return (
    <div className='search-bar'>
      <form className="form-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="form-search__input"
          required
          value={text}
          onChange={handleInput}
        />
        <Button className='btn-search' variant="outlined">Search</Button>

      </form>

      {!isClear && (
        <Button onClick={handleClear} className="btn-clear" >Clear search</Button>
      )}
    </div>
  )
}
