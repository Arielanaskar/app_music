import { apiClient } from "../../api";
import React, { useState, useEffect, useContext } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import moment from "moment";
import AudioPlayerContext from "../../context/audioContext";


export default function HeaderExplore() {
    const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } = useContext(AudioPlayerContext);
    const [track, setTrack] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const data = await apiClient.get("playlists/37i9dQZEVXbNG2KDcFcKOF");
        const items = data.tracks.items;
        let currentIndex = 0;
        while (currentIndex < items.length) {
          const currentTrack = items[currentIndex];
          if (currentTrack.track?.preview_url) {
            currentTrack.track.album.id = undefined;
            setTrack(currentTrack);
            setIsLoading(false);
            break;
          } else {
            currentIndex++;
          }
        }
      };

      fetchData();
    }, []);


    if (isLoading) {
      return (
        <div className="bg-[#080808] flex justify-between items-center h-[300px] px-4 overflow-hidden">
          <div className="ml-2 w-[300px]">
            <div className="animate-pulse bg-gray-300 w-1/2 h-7 rounded my-7"></div>
            <div className="animate-pulse bg-gray-300 w-full h-12 rounded my-2"></div>
            <div className="animate-pulse bg-gray-300 w-3/4 h-9 rounded"></div>
            <div className="flex items-end">
              <div className="animate-pulse mr-5 bg-gray-300 w-1/3 h-8 rounded-full mt-6"></div>
              <div className="animate-pulse mr-5 bg-gray-300 w-1/3 h-8 rounded-full mt-2"></div>
            </div>
          </div>
          <div className="relative rounded-lg mr-2">
            <div className="animate-pulse bg-gray-300 w-[230px] h-[230px] rounded-lg"></div>
            <div className="g-play absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#080808] flex justify-between items-center h-[300px] px-4 overflow-hidden">
        <div className="ml-2">
          <h4 className="my-7 text-lg font-semibold text-white">
            Trending New Hits &#x1F525;
          </h4>
          <h1 className="my-2 text-2xl w-[600px] font-semibold text-white">
            {track?.track?.name?.length > 30
              ? track?.track?.name.substring(0, 45) + ".."
              : track?.track?.name}
          </h1>
          <p className="text-xl font-semibold text-white">
            {track?.track?.artists ? track?.track?.artists[0].name : ""}
            <span className="ml-2 text-sm text-gray-300">
              &#8226; {moment(track?.added_at).fromNow()}
            </span>
          </p>
          <div className="my-6">
            <button className="px-6 py-3 text-sm font-semibold text-white bg-purple-600 rounded-full transition duration-300 focus:outline-none">
              Listen Now
            </button>
            <button className="mx-3 px-6 py-[0.70rem] text-sm font-semibold text-white border-[2px] border-white rounded-full transition duration-300 focus:outline-none">
              Follow
            </button>
          </div>
        </div>
        <div className="relative rounded-lg">
          <img
            className="w-[230px] h-[230px] object-cover rounded-lg"
            src={track?.track?.album ? track.track.album.images[0].url : ""}
            alt="photoArtist"
          />
          <div className="g-play absolute inset-0 flex items-center justify-center">
            {isPlaying &&
            currentTrack.name === track?.track?.name &&
            currentTrack.artists[0].id === track?.track?.artists[0]?.id ? (
              <button
                className={`pauseAudio rounded-full bg-[#9575DE] bg-opacity-75 p-3 transition duration-300 hover:bg-opacity-100 focus:outline-none hidden`}
                onClick={stopAudio}
              >
                <BsPauseFill className="text-white text-4xl" />
              </button>
            ) : (
              <button
                className="rounded-full bg-[#9575DE] bg-opacity-75 p-3 transition duration-300 hover:bg-opacity-100 focus:outline-none"
                onClick={() => {
                  if (
                    currentTrack &&
                    currentTrack.name === track?.track.name &&
                    currentTrack.artists[0].id === track?.track.artists[0].id
                  ) {
                    if (currentTrack.playlist?.id) {
                      playAudio(currentTrack, currentTrack.playlist.id);
                    } else if (currentTrack.album?.id !== undefined) {
                      playAudio(currentTrack, currentTrack.album.id);
                    } else {
                      playAudio(currentTrack);
                    }
                  } else {
                    setTotal([track]);
                    playAudio(track?.track);
                  }
                }}
              >
                <BsPlayFill className="text-white text-4xl" />
              </button>
            )}
            <div
              id="waves"
              className={`loader ${
                isPlaying &&
                currentTrack.name === track?.track?.name &&
                currentTrack.artists[0].id === track?.track?.artists[0]?.id
                  ? "flex"
                  : "hidden"
              }`}
            >
              <span className="strokes"></span>
              <span className="strokes"></span>
              <span className="strokes"></span>
              <span className="strokes"></span>
              <span className="strokes"></span>
              <span className="strokes"></span>
              <span className="strokes"></span>
            </div>
          </div>
        </div>
      </div>
    );
}
