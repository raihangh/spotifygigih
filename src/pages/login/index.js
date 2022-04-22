import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import config from "../../lib/config";
import { getUserProfile } from "../../lib/fetchApi";
import { login } from "../../slice/auth";
import "./index.css";
import Navbar from "../../components/navbar";

const LoginPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = new URLSearchParams(window.location.hash).get(
			"#access_token"
		);

		if (token !== null) {
			const setUserProfile = async () => {
				try {
					const response = await getUserProfile(token);
					dispatch(
						login({
							accessToken: token,
							user: response,
						})
					);
				} catch (e) {
					toast.error(e);
				}
			};

			setUserProfile();
		}
	});

	const getSpotifyLinkAuth = () => {
		const state = Date.now().toString();
		const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

		return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
	};

	return (
		<div className="home">
			<Navbar />
			<div className="auth__content">
				<button className="auth__button">
					<a href={getSpotifyLinkAuth()}>
						<i class="fa-brands fa-spotify"></i>LOG IN WITH SPOTIFY
					</a>
				</button>
			</div>
		</div>
	);
};

export default LoginPage;