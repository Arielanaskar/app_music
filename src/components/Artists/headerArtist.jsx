import { FaPlay, FaShareAlt, FaEllipsisV, FaPause } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { apiClient } from "../../api";
import AudioPlayerContext from "../../context/audioContext";

export default function HeaderArtist({ artist }) {
  const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } = useContext(AudioPlayerContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (artist) {
      setIsLoading(false);
    }
  }, [artist]);

  const handleClick = async (id) => {
    if (
      Object.entries(currentTrack).length === 0 ||
      !currentTrack.artistId ||
      currentTrack.artistId !== id
    ) {
      const dataTracks = await apiClient.get(
        `artists/${id}/top-tracks?market=ID`
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
        return false;
      }
    } else {
      playAudio(currentTrack);
    }
  };

  if (isLoading) {
    return (
      <div className="playlist-header flex flex-col justify-center h-[450px] p-[2rem] relative animate-pulse">
        <div className="w-[210px] h-[210px] bg-gray-300 mb-5 rounded-full self-center"></div>
        <div className="flex flex-col justify-start">
          <div className="w-28 h-4 bg-gray-300 rounded"></div>
          <div className="w-20 h-4 mt-2 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-40 h-4 mt-3 bg-gray-300 rounded"></div>
          </div>
          <div className="w-[60px] h-[60px] rounded-full bg-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="playlist-header flex flex-col justify-center h-[450px] p-[2rem] relative">
      <img
        className="w-[210px] h-[210px] object-cover mb-4 rounded-full self-center"
        src={artist?.images ? artist.images[0].url : ""}
        alt="Playlist Avatar"
      />
      <div className="flex flex-col justify-start">
        <h1 className="text-[1.5rem] text-white font-bold">{artist?.name}</h1>
        <p className="text-sm text-gray-200 mt-1">
          {artist?.followers ? artist.followers.total.toLocaleString() : ""}{" "}
          followers
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-white">
          <button className="px-6 py-2 rounded-full border text-sm">
            Follow
          </button>
          <FaShareAlt className="ml-5 cursor-pointer text-[1rem]" />
          <FaEllipsisV className="ml-6 cursor-pointer text-[1rem]" />
        </div>
        {isPlaying &&
        currentTrack.artists[0]?.isPlaying === true &&
        currentTrack.artistId === artist?.id ? (
          <div
            onClick={stopAudio}
            className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] m-[1rem]"
          >
            <FaPause className="text-white" size="20px" />
          </div>
        ) : (
          <div
            onClick={() => {
              handleClick(artist?.id);
            }}
            className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] m-[1rem]"
          >
            <FaPlay className="text-white" size="20px" />
          </div>
        )}
      </div>
    </div>
  );
}

