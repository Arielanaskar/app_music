import { FaPlay, FaPause } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import AudioPlayerContext from "../../context/audioContext";
import apiClient from "../../api";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function Playlist({ genre }) {
    const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } = useContext(AudioPlayerContext);
    const [playlist, setPlaylist] = useState([]);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleError = () => {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 1000);
    };

    useEffect(() => {
        if (genre !== undefined) {
            const fetchData = async () => {
                const data = await apiClient.get(
                    `search?q=${genre}&type=playlist&limit=50`
                );
                setPlaylist(data.playlists.items);
                setIsLoading(false);
            };
            fetchData();
        }
    }, [genre]);

    const handleClick = async (id, event) => {
        if (Object.entries(currentTrack).length === 0 || currentTrack.playlist?.id !== id) {
            event.classList.remove("play-button");
            event.classList.remove("opacity-0");
            event.innerHTML = `<div class="animate-spin">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <style>svg{fill:#ffffff}</style>
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>
            </svg>
            </div>
            `;
            const data = await apiClient.get(`playlists/${id}/tracks`);
            const filterTracks = data.items.filter((track) => track.track.preview_url);
            if (filterTracks.length > 0) {
                const modifiedTracks = filterTracks.map((track) => ({
                    ...track,
                    track: {
                        ...track.track,
                        album: {
                            ...track.track.album,
                            id: undefined,
                        },
                        playlist: {
                            id: id,
                        },
                    },
                }));
                
                setTotal(modifiedTracks);
                playAudio(modifiedTracks[0].track, id);
            } else {
                toggleError();
            }
        } else {
            playAudio(currentTrack);
        }
    };

    if (isLoading) {
        return (
            <>
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className="animate-pulse relative playlist-card p-[1rem] rounded-lg bg-[#181818]"
                        style={{ backdropFilter: "blur(10px)" }}
                    >
                        <div className="w-full h-[200px] rounded-lg bg-gray-300"></div>
                        <div className="absolute top-[45%] right-7 p-3 bg-[#9575DE] text-white rounded-full play-button"></div>
                        <div>
                            <div className="text-[14px] font-bold text-white mt-[1rem] mb-[0.5rem] bg-gray-300 h-4 rounded"></div>
                            <p className="text-[13px] text-gray-300 bg-gray-300 h-4 rounded"></p>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
      <>
        {playlist.map((m, i) => (
          <div
            key={i}
            className="relative playlist-card p-[1rem] rounded-lg cursor-pointer bg-[#181818] hover:bg-[#2B2B2B]"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <Link key={i} to={`/playlist/${m.id}`} className="block">
              <img
                className="object-cover w-full h-[200px] rounded-lg"
                src={m.images[0].url}
                alt="Playlist Cover"
              />
            </Link>
            {isPlaying && currentTrack.playlist?.id === m.id ? (
              <>
                <div
                  onClick={stopAudio}
                  className={`absolute top-[45%] right-7 p-4 bg-[#9575DE] text-white rounded-full`}
                >
                  <FaPause className="text-lg ml-[1px]" />
                </div>
              </>
            ) : (
              <div
                onClick={(event) => handleClick(m.id, event.currentTarget)}
                className="absolute top-[45%] right-7 p-4 bg-[#9575DE] text-white rounded-full play-button opacity-0"
              >
                <FaPlay />
              </div>
            )}
            <div>
              <Link key={i} to={`/playlist/${m.id}`} className="block">
                <h2 className="text-[1.25rem] font-bold text-white mt-[1rem] mb-[0.5rem]">
                  {m.name.length >= 17
                    ? `${m.name.substring(0, 16)}..`
                    : m.name}
                </h2>
                <p
                  className="text-sm text-gray-300"
                >
                  {parse(m.description).length > 50
                    ? parse(m.description.substring(0, 50))
                    : parse(m.description).length === 0 
                    ? "no description"
                    : parse(m.description)}
                </p>
              </Link>
            </div>
          </div>
        ))}
        <div
          id="error"
          className={`w-max h-max top-[17%] ${
            showError ? "opacity-1" : "opacity-0"
          }  left-1/2 transform fixed flex justify-center font-medium items-center bg-[#9333EA] rounded-md py-3 px-5 text-white transition-all duration-[500ms] text-sm`}
        >
          <h4>Sorry, tracks not available</h4>
        </div>
      </>
    );

}



