import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../slice/auth';
import { useHistory } from "react-router-dom";
import config from '../../lib/config';
import './index.css';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.auth.isLogin);

  const history = useHistory(); 

  React.useEffect(() => {
    const accessTokenParams= new URLSearchParams(window.location.hash).get('#access_token')
  
    if (accessTokenParams !== null) {

      const setUserProfile = async () => {
        try {
          const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessTokenParams,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${config.SPOTIFY_BASE_URL}/me`, requestOptions).then(data => data.json());
        dispatch(login({
          accessToken : accessTokenParams,
          user : response,
        }));
        history.push("/create-playlist")
        } catch (e) {
          alert(e);
        }

      }

      setUserProfile();
    }
  }, []);

  const getLinkAuth = () =>{
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${config.BASE_URL}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar className="nav-box" sx={{ backgroundColor: '#90caf9'}}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className="logo">
            GIGIH Spotify
          </Typography>
          {isLogin ? (
            <div>

            </div>
          ) : (
                <div className="auth-link">
                  <a id="link" href={getLinkAuth()}>Login</a>
                </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}