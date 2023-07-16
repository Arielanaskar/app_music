import { FaPlay, FaPause } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import AudioPlayerContext from "../../context/audioContext";
import { Link } from "react-router-dom";
import apiClient from "../../api";

export default function Artist() {
  const [artists, setArtists] = useState([]);
  const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } = useContext(AudioPlayerContext);
  const [showError, setShowError] = useState(false);

  const toggleError = () => {
    setShowError(true);
    setTimeout(() => {
        setShowError(false);
    }, 1000);
  }

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("cachedArtists");
      if (cachedData) {
        setArtists(JSON.parse(cachedData));
      } else {
        const request1 = apiClient.get(
          `search?q=year%3A2023&type=artist&limit=48&offset=0`
        );
        const request2 = apiClient.get(
          `search?q=year%3A2023&type=artist&limit=48&offset=48`
        );

        const responses = await Promise.all([request1, request2]);
        const data = responses.map((response) => response.artists.items);
        const mergedData = data.flat();

        setArtists(mergedData);
        localStorage.setItem("cachedArtists", JSON.stringify(mergedData));
      }
    };
    fetchData();
  }, []);

  const handleClick = async (id) => {
    if (
      Object.entries(currentTrack).length === 0 ||
      !currentTrack.artistId ||
      currentTrack.artistId !== id
    ) {
      
      const account = JSON.parse(window.localStorage.getItem("account"));
      const country = account ? account.country : "US";
      const dataTracks = await apiClient.get(
        `artists/${id}/top-tracks?market=${country}`
      );
      const filterTracks = dataTracks.tracks.filter((item) => item.preview_url);
      if (filterTracks.length > 0) {
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
        setTotal(modifiedTracks);
        playAudio(modifiedTracks[0].track);
      } else {
        toggleError();
      }
    } else {
      playAudio(currentTrack);
    }
  };

  return (
    <>
      {artists?.length > 0 ? (
        artists?.map((m, i) => (
          <div
            key={i}
            className="relative artist-card bg-[#181818] w-[15.5rem] py-4 flex flex-col items-center justify-center rounded-lg m-0 hover:bg-[#2B2B2B] cursor-pointer"
          >
            <Link
              to={`/artist/${m.id}`}
              className="absolute w-full h-full"
            ></Link>
            <div>
              <img
                className="w-[12rem] h-[12rem] rounded-full"
                src={m.images ? m?.images[0]?.url : ""}
                alt="ArtistImage"
              />
            </div>
            {isPlaying &&
            currentTrack.artists[0]?.isPlaying === true &&
            currentTrack.artistId === m.id ? (
              <div
                onClick={stopAudio}
                className="absolute top-[50%] right-8 p-4 bg-[#9575DE] text-white rounded-full"
              >
                <FaPause />
              </div>
            ) : (
              <div
                onClick={() => handleClick(m.id)}
                className="absolute top-[50%] right-8 p-4 bg-[#9575DE] text-white rounded-full play-button-artist opacity-0"
              >
                <FaPlay />
              </div>
            )}
            <div className="px-5 py-3 self-start">
              <div className="font-bold text-lg mb-2 text-white">{m.name}</div>
              <p className="text-[#878787] text-sm">Artist</p>
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="animate-pulse relative artist-card bg-[#181818] w-[15.5rem] py-4 flex flex-col items-center justify-center rounded-lg shadow-lg m-0 hover:bg-[#2B2B2B] cursor-pointer"
            >
              <div className="w-[12rem] h-[12rem] rounded-full bg-gray-500"></div>
              <div className="px-5 py-3 self-start">
                <div className="w-28 font-bold text-lg mt-3 bg-gray-300 h-4 rounded"></div>
                <div className="w-12 text-[#878787] text-sm mt-4 bg-gray-300 h-4 rounded"></div>
              </div>
            </div>
          ))}
        </>
      )}
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
