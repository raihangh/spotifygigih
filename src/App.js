import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import CreatePlaylist from './pages/playlist'
import {useSelector} from 'react-redux';

const App = () => {
	const isLogin = useSelector(state => state.auth.isLogin);
	return (
	  <Router>
		<Switch>
		  <Route path={"/create-playlist"}>
			{isLogin ? (
			  <CreatePlaylist />
			):(
			  <Redirect to={"/"}/>
		  )}
		  </Route>
		  <Route path={"/"} >
			<Login/>
		  </Route>
		</Switch>
	  </Router>
	);
  }
  
  export default App;