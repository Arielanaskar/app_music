import { useEffect, useState, useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { apiClient } from "../../api";
import { Link } from "react-router-dom";
import AudioPlayerContext from "../../context/audioContext";

export default function Track() {
  const { isPlaying,
    currentTrack,
    playAudio,
    stopAudio,
    setTotal,
    currentPercentage } = useContext(AudioPlayerContext);

  const [tracks, setTracks] = useState([]);
  const [modifiedTracks, setModifiedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiClient.get("playlists/37i9dQZEVXbNG2KDcFcKOF");
      const filterTracks = data.tracks.items.filter(
        (track) => track.track.preview_url
      );
      const modifiedTracks = filterTracks?.map((track) => ({
        ...track,
        track: {
          ...track.track,
          album: {
            ...track.track.album,
            id: undefined,
          },
        },
      }));
      setModifiedTracks(modifiedTracks);
      setTracks(filterTracks);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <tr key={i} className="animate-pulse track-card">
            <td className="w-[1%] whitespace-nowrap font-bold">
              <p className="text-center ">{i + 1}</p>
              <div className="relative w-10 flex items-center justify-center">
                <div className="playpause-btn absolute text-white text-xs ml-0.5 rounded-full w-4 h-4 opacity-0"></div>
              </div>
            </td>
            <td className="flex">
              <div className="flex items-center justify-center 0 mr-[1rem] pr-[300px]">
                <div className="w-10 h-10 bg-gray-300 rounded"></div>
                <div className="flex flex-col ml-6">
                  <p className="w-14 h-2 mb-3 font-bold bg-gray-300 rounded"></p>
                  <p className="w-10 h-2 font-bold bg-gray-300 rounded"></p>
                </div>
              </div>
            </td>
            <td>
              <div className="text-sm bg-gray-300 rounded w-15 h-2"></div>
            </td>
            <td>
              <div className="text-sm bg-gray-300 rounded w-15 h-2 "></div>
            </td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      {tracks.map((track, i) => (
        <tr
          key={i}
          className={`hover:bg-[#202026] ${
            currentTrack.name === track.track.name &&
            currentTrack.artists[0].id === track.track.artists[0].id
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
                currentTrack.artists[0].id === track.track.artists[0].id
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
                currentTrack.artists[0].id === track.track.artists[0].id
                  ? "hidden"
                  : "track-num"
              }`}
            >
              {i + 1}
            </p>
            <div className="relative w-10 flex items-center justify-center">
              {isPlaying &&
              currentTrack.name === track.track.name &&
              currentTrack.artists[0].id === track.track.artists[0].id ? (
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
                    if (
                      currentTrack &&
                      currentTrack.name === track.track.name &&
                      currentTrack.artists[0].id === track.track.artists[0].id
                    ) {
                      if (currentTrack.playlist?.id) {
                        playAudio(currentTrack, currentTrack.playlist.id);
                      } else if (currentTrack.album?.id !== undefined) {
                        playAudio(currentTrack, currentTrack.album.id);
                      } else if (currentTrack.artists[0]?.isPlaying === true) {
                        playAudio(currentTrack);
                      } else {
                        playAudio(currentTrack);
                      }
                    } else {
                      setTotal([modifiedTracks[i]]);
                      playAudio(modifiedTracks[i].track);
                    }
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
            </div>
            <div>
              <p className="song-title font-bold flex">
                {track.track.name}
                {currentTrack &&
                  currentTrack.name === track.track.name &&
                  currentTrack.artists[0].id === track.track.artists[0].id && (
                    <>
                      {currentTrack.playlist?.id && (
                        <span class="rounded-full ml-2 py-1 px-4 font-medium text-white bg-[#9333EA] text-xs">
                          Play in Playlist
                        </span>
                      )}
                      {currentTrack.album?.id !== undefined && (
                        <span class="rounded-full ml-2 py-1 px-4 font-medium text-white bg-[#9333EA] text-xs">
                          Play in Album
                        </span>
                      )}
                      {currentTrack.artists[0]?.isPlaying === true && (
                        <span class="rounded-full ml-2 py-1 px-4 font-medium text-white bg-[#9333EA] text-xs">
                          Play in Artist
                        </span>
                      )}
                    </>
                  )}
              </p>
              <Link
                to={`/artist/${track.track.artists[0].id}`}
                className="hover:underline song-artist text-[#777777] text-[0.8rem]"
              >
                {track.track.artists[0].name}
              </Link>
            </div>
          </td>
          <td>
            <Link
              to={`/album/${track.track.album.id}`}
              className="hover:underline text-sm text-zinc-400"
            >
              {track.track.album.name.length > 35
                ? track.track.album.name.substring(0, 35) + "..."
                : track.track.album.name}
            </Link>
          </td>
          <td>
            <p className="text-sm text-zinc-400">0:30</p>
          </td>

          <td>
            <div
              className={`progress-bar`}
              style={{
                width:
                  currentTrack.name === track.track.name &&
                  currentTrack.artists[0].id === track.track.artists[0].id
                    ? currentPercentage + "%"
                    : "0%",
              }}
            ></div>
          </td>
        </tr>
      ))}
    </>
  );
}
