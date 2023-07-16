import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { apiClient } from "../../api";
import AudioPlayerContext from "../../context/audioContext";

export default function TracksArtist({ id }) {
  const {
    isPlaying,
    currentTrack,
    playAudio,
    stopAudio,
    setTotal,
    currentPercentage,
  } = useContext(AudioPlayerContext);

  const [tracks, setTracks] = useState([]);
  const [modifiedTracks, setModifiedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
        const fetchData = async () => {
          try {
            const account = JSON.parse(window.localStorage.getItem("account"));
            const country = account ? account.country : "US";
            const dataTracks = await apiClient.get(
              `artists/${id}/top-tracks?market=${country}`
            );
            const filterTracks = dataTracks.tracks.filter(
              (item) => item.preview_url
            );
            const modifiedTracks = filterTracks?.map((track) => ({
              track: {
                ...track,
                artistId: id,
                artists: [
                  {
                    ...track.artists[0],
                    isPlaying: true,
                  },
                ],
                album: {
                  ...track.album,
                  id: undefined,
                },
              },
            }));
            setTracks(filterTracks?.map((track) => ({ track: { ...track } })));
            setModifiedTracks(modifiedTracks);
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
          }
        };
        fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }, (_, i) => (
          <tr key={i} className="animate-pulse track-card">
            <td className="w-[1%] whitespace-nowrap font-bold">
              <p className="text-center">{i + 1}</p>
              <div className="relative w-10 flex items-center justify-center">
                <div className="playpause-btn absolute text-white text-xs ml-0.5 rounded-full w-4 h-4 opacity-0"></div>
              </div>
            </td>
            <td className="flex">
              <div className="flex items-center justify-center 0 mr-[1rem]">
                <div className="w-10 h-10 bg-gray-300 rounded"></div>
                <div className="flex flex-col ml-6 w-60">
                  <p className="w-14 h-2 mb-3 font-bold bg-gray-300 rounded"></p>
                  <p className="w-10 h-2 font-bold bg-gray-300 rounded"></p>
                </div>
              </div>
            </td>
            <td>
              <div className="text-sm bg-gray-300 rounded w-28 h-2 mr-10"></div>
            </td>
            <td>
              <div className="text-sm bg-gray-300 rounded w-10 h-2 "></div>
            </td>
          </tr>
        ))}
      </>
    );
  }

  if (tracks.length === 0) {
    return (
      <tr>
        <td colSpan="5">
          <h1 className="text-lg py-10 text-center text-white font-bold">
            No tracks available
          </h1>
        </td>
      </tr>
    );
  }

  return (
    <>
      {tracks.map((track, index) => (
        <tr
          key={index}
          className={`hover:bg-[#202026] ${
            currentTrack.name === track.track.name &&
            currentTrack.artists[0].id === track.track.artists[0].id &&
            currentTrack.artistId
              ? "bg-[#202026]"
              : ""
          } track-card`}
        >
          <td className="w-[1%] whitespace-nowrap font-bold">
            <div
              id="wave"
              className={`${
                isPlaying &&
                currentTrack.name === track.track.name &&
                currentTrack.artists[0].id === track.track.artists[0].id &&
                currentTrack.artistId
                  ? "flex"
                  : "hidden"
              }`}
            >
              <span className="stroke"></span>
              <span className="stroke"></span>
              <span className="stroke"></span>
              <span className="stroke"></span>
              <span className="stroke"></span>
              <span className="stroke"></span>
              <span className="stroke"></span>
            </div>
            <p
              className={`w-10 text-center ${
                isPlaying &&
                currentTrack.name === track.track.name &&
                currentTrack.artists[0].id === track.track.artists[0].id &&
                currentTrack.artistId
                  ? "hidden"
                  : "track-num"
              }`}
            >
              {index + 1}
            </p>
            <div className="relative w-10 flex items-center justify-center">
              {isPlaying &&
              currentTrack.name === track.track.name &&
              currentTrack.artists[0].id === track.track.artists[0].id &&
              currentTrack.artistId ? (
                <div
                  className="playpause-btn absolute text-white text-xs ml-0.5 rounded-full w-4 h-4 opacity-0"
                  onClick={stopAudio}
                >
                  <FaPause size="1rem" />
                </div>
              ) : (
                <div
                  className="playpause-btn absolute text-white text-xs ml-0.5 rounded-full w-4 h-4 opacity-0"
                  onClick={() => {
                    setTotal(modifiedTracks);
                    playAudio(modifiedTracks[index].track);
                  }}
                >
                  <FaPlay size="1rem" />
                </div>
              )}
            </div>
          </td>
          <td className="flex">
            <div className="flex items-center justify-center 0 mr-[1rem]">
              <img
                className="w-10 h-10 object-cover rounded"
                src={track.track.album.images[0].url}
                alt="Song 1"
              />
              <p className="ml-6 font-bold">
                {track.track.name} <br />
              </p>
            </div>
          </td>
          <td>
            <Link
              to={`/album/${track.track.album.id}`}
              className="text-sm text-zinc-400 hover:underline"
            >
              {track.track.album.name}
            </Link>
          </td>
          <td>
            <div
              className="progress-bar"
              style={{
                width:
                  currentTrack.name === track.track.name &&
                  currentTrack.artists[0].id === track.track.artists[0].id &&
                  currentTrack.artistId
                    ? currentPercentage + "%"
                    : "0%",
              }}
            ></div>
          </td>
          <td>
            <p className="text-sm text-zinc-400">0:30</p>
          </td>
        </tr>
      ))}
    </>
  );
}
