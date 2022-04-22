import React, { useEffect, useState } from 'react'
import Musicbox from '../components/musicbox/musicbox';
import SearchBar from '../components/searchbar/index';
import config from '../lib/config';
import CreatePlaylistForm from '../components/playlistform/index';
import { getUserProfile } from '../lib/fetchApi';
import { toast } from 'react-toastify';
import { useDocumentTitle } from '../lib/custom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slice/auth';

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const dispatch = useDispatch();

  useDocumentTitle('Gigih');

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

          dispatch(login({
            accessToken: accessTokenParams,
            user: responseUser
          }));
        } catch (e) {
          toast.error(e);
        }
      }

      setUserProfile();
    }
  }, []);

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])])
  }

  const clearSearch = () => {
    setTracks(selectedTracks);
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
    <>
      {!isAuthorize && (
        <main className="center">
          <p>Login for next step...</p>
          <a href={getSpotifyLinkAuthorize()}><button>Authorize</button></a>
        </main>
      )}

      
      {isAuthorize && (
        <main className="container" id="home">
          <CreatePlaylistForm uriTracks={selectedTracksUri} />
          <SearchBar
            onSuccess={onSuccessSearch}
            onClearSearch={clearSearch}
          />

          <div className="content">
            {tracks.length === 0 && (
              <p>No tracks</p>
            )}
          <div className="cards" style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: 'center',
             }}>

              {tracks.map((track) => (
                <Musicbox
                  key={track.id}
                  urlimg={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  urlspotify={track.external_urls.spotify}
                  toggleSelect={() => toggleSelect(track)}
                  select={selectedTracksUri.includes(track.uri)}
                />
              ))}
          </div>
          </div>
        </main>
      )}
    </>
  );
}
// export default class Home extends Component {
//   state = {
//     accessToken: '',
//     isAuthorize: false,
//     tracks: [],
//   }

//   getHashParams() {
//     const hashParams = {};
//     const r = /([^&;=]+)=?([^&;]*)/g;
//     const q = window.location.hash.substring(1);
//     let e = r.exec(q);

//     while (e) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//       e = r.exec(q);
//     }
//     return hashParams;
//   }

//   componentDidMount() {
//     const params = this.getHashParams();
//     const { access_token: accessToken } = params;

//     this.setState({ accessToken, isAuthorize: accessToken !== undefined })
//   }

//   getSpotifyLinkAuthorize() {
//     const state = Date.now().toString();
//     const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

//     return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
//   }

//   onSuccessSearch(tracks) {
//     this.setState({ tracks });
//   }

//   render() {
//     return (
//       <div className='container' style={{
//         display: "flex",
//         flexDirection: "column",
//         flexWrap: "wrap",
//         justifyContent: 'center',
//       }}>
//         {!this.state.isAuthorize && (
//           <main className="center">
//             <p>Login for next step...</p>
//             <a className='btn' href={this.getSpotifyLinkAuthorize()}>Authorize</a>
//           </main>
//         )}

//         {this.state.isAuthorize && (
//           <main className="container" id="home">
//             <SearchBar
//               accessToken={this.state.accessToken}
//               onSuccess={(tracks) => this.onSuccessSearch(tracks)}
//             />

//             <div className="content">
//               {this.state.tracks.length === 0 && (
//                 <p>No tracks</p>
//               )}

//               <div className="cards" style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   justifyContent: 'center',
//                 }}>
//                 {this.state.tracks.map((song) => (
//                   <Musicbox
//                     key={song.id}
//                     urlimg={song.album.images[0].url}
//                     title={song.name}
//                     artist={song.artists[0].name}
//                     urlspotify={song.external_urls.spotify}
//                   />
//                 ))}
//               </div>
//             </div>
//           </main>
//         )}
//       </div>
//     );
//   }
// }