import React, { useContext, useEffect, useState } from 'react'
import apiClient from '../../api'
import AudioPlayerContext from '../../context/audioContext'
import { FaPlay, FaRegHeart, FaArrowDown, FaPause } from "react-icons/fa"
import parse from "html-react-parser";

export default function HeaderPlaylist({ id }) {
    const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } = useContext(AudioPlayerContext);
    const [header, setHeader] = useState({});
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const totalSong = header?.tracks?.items.filter(
      (track) => track?.track?.preview_url
    )?.length;

    useEffect(() => {
      if (id) {
        const fetchData = async () => {
          const data = await apiClient.get(`playlists/${id}`);
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
              playlist: {
                id: id,
              },
            },
          }));
          setTracks(modifiedTracks);
          setHeader(data);
          setIsLoading(false);
        };
        fetchData();
      }
    }, [id]);

    if (isLoading) {
      return (
        <>
          <div className="h-[300px] flex items-end p-[2rem] relative">
            <div className="absolute inset-0 z-0 bg-[#080808]"></div>
            <div className="playlist-info flex items-end z-10">
              <div className="animate-pulse rounded bg-gray-300 w-[210px] h-[210px] mr-[1.5rem]"></div>
              <div className="flex flex-col">
                <div className="animate-pulse bg-gray-300 w-[180px] h-[24px] rounded mb-1"></div>
                <div className="animate-pulse bg-gray-300 w-3/4 h-[20px] rounded mb-2"></div>
                <div className="animate-pulse bg-gray-300 w-[200px] h-[35px] rounded"></div>
                <div className="animate-pulse bg-gray-300 w-1/4 h-[16px] rounded mt-5"></div>
                <div className="animate-pulse bg-gray-300 w-1/2 h-[16px] rounded mt-2"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] m-[1rem]">
              <FaPlay className="text-white" size="20px" />
            </div>
            <div className="love-button cursor-pointer flex items-center justify-center w-[55px] h-[55px] text-white text-[2rem] leading-[80px]">
              <FaRegHeart />
            </div>
            <div className="donwload-button cursor-pointer flex items-center justify-center w-[30px] h-[30px] border-[2px] rounded-full text-white text-[2rem] leading-[80px] m-3">
              <FaArrowDown size="15px" />
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="playlist-header flex h-[300px] items-end p-[2rem] relative">
          <div className="absolute inset-0 z-0 bg-[#080808]"></div>
          <div className="playlist-info flex items-end z-10">
            <img
              className="w-[210px] h-[210px] object-cover mr-[1.5rem] rounded"
              src={header.images ? header.images[0].url : ""}
              alt="Playlist Avatar"
            />
            <div className="flex flex-col">
              <p className="text-white text-[1rem] font-bold leading-10">
                Public Playlist
              </p>
              <h1 className="text-[1.5rem] text-white font-bold">
                {header.name}
              </h1>
              <p
                className="text-sm text-gray-200 mt-5"
              >
                {parse(header.description)}
              </p>
              <div className="text-sm mt-5 text-white font-bold flex items-center bg-cover bg-center">
                <div
                  className="w-5 h-5 rounded-full mr-2"
                  style={{
                    background: `url(${
                      header.images ? header.images[0].url : ""
                    })`,
                  }}
                ></div>
                <span className="ml-2">
                  {header?.followers?.total.toLocaleString()} likes
                </span>
                <span className="text-lg ml-2">&#8226;</span>
                <span className="ml-2">{totalSong} songs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {isPlaying && currentTrack.playlist?.id === id ? (
            <div
              onClick={stopAudio}
              className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] m-[1rem]"
            >
              <FaPause className="text-white" size="20px" />
            </div>
          ) : (
            <div
              onClick={() => {
                setTotal(tracks);
                playAudio(
                  Object.entries(currentTrack).length !== 0 &&
                    currentTrack.playlist?.id === id
                    ? currentTrack
                    : tracks[0]?.track,
                  id
                );
              }}
              className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] m-[1rem]"
            >
              <FaPlay className="text-white" size="20px" />
            </div>
          )}
          <div className="love-button cursor-pointer flex items-center justify-center w-[55px] h-[55px] text-white text-[2rem] leading-[80px]">
            <FaRegHeart />
          </div>
          <div className="donwload-button cursor-pointer flex items-center justify-center w-[30px] h-[30px] border-[2px] rounded-full text-white text-[2rem] leading-[80px] m-3">
            <FaArrowDown size="15px" />
          </div>
        </div>
      </>
    );
}
