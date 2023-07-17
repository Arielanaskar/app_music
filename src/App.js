import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AudioPlayerProvider } from "./context/audioContext";
import { Explore, Albums, Artists, Genres, Playlists, DetailPlaylist, DetailAlbums, DetailArtist, Podcasts, DetailPodcast, Tracks } from './pages';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const urlWithoutCallback = window.location.origin + window.location.pathname.split('/')[0];
    const baseURL = window.location.origin;
    if (code) {
      const fetchData = async() => {
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `2f8f49f0e6f245b7aa03d5a45aa92c18:c1ff48ff741042e0a63cbfa9fdbe51ec`
            )}`,
          },
          body: `code=${code}&grant_type=authorization_code&redirect_uri=${baseURL}/callback`,
        });
        const data = await response.json();
        window.localStorage.setItem("refresh_token", data.refresh_token);
        window.location.reload();
      }
      fetchData()
      window.history.replaceState({}, document.title, urlWithoutCallback);
    }
  }, []);
  return (
    <>
      <Router>
        <AudioPlayerProvider>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/album/:albumId" element={<DetailAlbums />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artist/:artistId" element={<DetailArtist />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genre/:genreName" element={<Playlists />} />
            <Route path="/playlist/:playlistId" element={<DetailPlaylist />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:podcastId" element={<DetailPodcast />} />
            <Route path="/track" element={<Tracks />} />
            <Route path="/callback" element={<Explore />} />
          </Routes>
        </AudioPlayerProvider>
      </Router>
    </>
  );
}