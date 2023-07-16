import { useContext, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Link } from "react-router-dom";
import apiClient from "../../api";
import AudioPlayerContext from "../../context/audioContext";

export default function TracksAlbum({ id }) {
  const {
    isPlaying,
    currentTrack,
    playAudio,
    stopAudio,
    setTotal,
    currentPercentage,
  } = useContext(AudioPlayerContext);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await apiClient.get(`albums?ids=${id}`);
        const albumImg = data.albums[0].images;
        const albumId = data.albums[0].id;
        const filterTracks = data?.albums[0].tracks.items.filter(
          (track) => track.preview_url
        );
        if (filterTracks.length > 0) {
          const modifiedTracks = filterTracks.map((track) => ({
            track: {
              ...track,
              album: { images: albumImg, id: albumId },
            },
          }));
          setTracks(modifiedTracks);
        } else {
          setTracks([]);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <tr key={i} className="animate-pulse track-card">
            <td className="w-10 whitespace-nowrap font-bold">
              <p className="text-center ">{i + 1}</p>
              <div className="relative w-10 flex items-center justify-center">
                <div className="playpause-btn absolute text-white text-xs ml-0.5 rounded-full w-4 h-4 opacity-0"></div>
              </div>
            </td>
            <td className="rounded w-[900px]">
              <div className="flex flex-col">
                <p className="w-20 h-2 mb-3 font-bold bg-gray-300 rounded"></p>
                <p className="w-14 h-2 font-bold bg-gray-300 rounded"></p>
              </div>
            </td>
            <td className="w-14">
              <p className="w-full h-2 mb-3 font-bold bg-gray-300 rounded"></p>
            </td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      {tracks.length > 0 ? (
        tracks.map((track, i) => (
          <tr
            key={i}
            className={`hover:bg-[#202026] track-card ${
              currentTrack.name === track.track.name &&
              currentTrack.artists[0].id === track.track.artists[0].id &&
              currentTrack.album?.id === id
                ? "bg-[#202026]"
                : ""
            }`}
          >
            <td className="w-[1%] whitespace-nowrap font-bold">
              <div
                id="wave"
                className={`${
                  isPlaying &&
                  currentTrack.name === track.track.name &&
                  currentTrack.artists[0].id === track.track.artists[0].id &&
                  currentTrack.album?.id === id
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
                className={`track-num w-10 text-center ${
                  isPlaying &&
                  currentTrack.name === track.track.name &&
                  currentTrack.artists[0].id === track.track.artists[0].id &&
                  currentTrack.album?.id === id
                    ? "hidden"
                    : ""
                }`}
              >
                {i + 1}
              </p>
              <div className="relative w-10 flex items-center justify-center">
                {isPlaying &&
                currentTrack.name === track.track.name &&
                currentTrack.artists[0].id === track.track.artists[0].id &&
                currentTrack.album?.id === id ? (
                  <div
                    className="playpause-btn absolute text-white text-xs ml-0.5 rounded-full w-4 h-4 opacity-0"
                    onClick={() => stopAudio()}
                  >
                    <FaPause size="1rem" />
                  </div>
                ) : (
                  <div
                    className="playpause-btn absolute text-white text-xs ml-0.5 rounded-full w-4 h-4 opacity-0"
                    onClick={() => {
                      setTotal(tracks);
                      playAudio(track.track, id);
                    }}
                  >
                    <FaPlay size="1rem" />
                  </div>
                )}
              </div>
            </td>
            <td className="flex w-[900px]">
              <div>
                <p className="song-title font-bold">{track.track.name}</p>
                <Link
                  href={`/artist/${track.track.artists[0]?.id}`}
                  className="song-artist text-[#777777] text-[0.8rem] hover:underline"
                >
                  {track.track.artists[0]?.name}
                </Link>
              </div>
            </td>
            <td className="w-10">
              <p className="text-sm text-zinc-400">0:30</p>
            </td>
            <td>
              <div
                className={`progress-bar`}
                style={{
                  width:
                    currentTrack.name === track.track.name &&
                    currentTrack.artists[0].id === track.track.artists[0].id &&
                    currentTrack.album?.id === id
                      ? currentPercentage + "%"
                      : "0%",
                }}
              ></div>
            </td>
          </tr>
        ))
      ) : (
        <>
          <tr>
            <td className="w-10"></td>
            <td className="w-[900px]">
              <h1 className="text-lg py-10 text-center text-white font-bold">
                Sorry, tracks not available
              </h1>
            </td>
            <td className="w-10"></td>
          </tr>
        </>
      )}
    </>
  );
}
