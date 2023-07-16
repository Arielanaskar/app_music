import React, { useContext, useEffect, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import apiClient from '../../api';
import AudioPlayerContext from '../../context/audioContext';


export default function Album() {
    const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } = useContext(AudioPlayerContext);

    const [albums, setAlbums] = useState([]);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleError = () => {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000);
    };

    useEffect(() => {
      const fetchData = async () => {
        const cachedData = localStorage.getItem("cachedAlbums");
        if (cachedData) {
          setAlbums(JSON.parse(cachedData));
          setIsLoading(false);
        } else {
          const [searchResponse, browseResponse] = await Promise.all([
            apiClient.get(
              `search?q=year%3A2022-2023&type=album&limit=48&offset=0`
            ),
            apiClient.get("browse/new-releases"),
          ]);

          const searchAlbumItems = searchResponse.albums.items;
          const browseAlbumItems = browseResponse.albums.items;

          const mergedAlbumItems = [...browseAlbumItems, ...searchAlbumItems];

          setAlbums(mergedAlbumItems);
          localStorage.setItem(
            "cachedAlbums",
            JSON.stringify(mergedAlbumItems)
          );
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    const handleClick = async (id) => {
      if (
        Object.entries(currentTrack).length === 0 ||
        currentTrack.album.id !== id
      ) {
        const tracks = await apiClient.get(`albums?ids=${id}`);
        const albumImg = tracks.albums[0].images;
        const albumId = tracks.albums[0].id;
        const filterTracks = tracks?.albums[0].tracks.items.filter(
          (track) => track.preview_url
        );
        if (filterTracks.length > 0) {
          const modifiedTracks = filterTracks.map((track) => ({
            track: {
              ...track,
              album: { images: albumImg, id: albumId },
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
              className="w-[230px] h-[300px] rounded-[40px] overflow-hidden relative animate-pulse bg-gray-300"
            ></div>
          ))}
        </>
      );
    }

    return (
      <>
        {albums.map((m, i) => (
          <div
            key={i}
            className="w-[230px] h-[300px] mt-3 mb-3 rounded-[40px] shadow-md overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group card-album"
          >
            <Link to={`/album/${m.id}`}>
              <img
                src={m.images[0].url}
                alt=""
                className={`h-full w-full absolute inset-0 object-cover rounded-[40px] opacity-80 group-hover:opacity-100`}
              />
            </Link>
            <div className="w-16 h-8 absolute top-3 right-3">
              {isPlaying && currentTrack.album.id === m.id ? (
                <div className="w-full h-full flex items-center justify-center bg-[#9333EA] rounded-full">
                  <h4 className="text-xs font-bold">Listen</h4>
                </div>
              ) : null}
            </div>
            <div className="absolute bottom-8 inset-x-0 ml-4 flex items-center space-x-3.5">
              {isPlaying && currentTrack.album.id === m.id ? (
                <>
                  <div id="waved" className={`wave-container ml-3 flex`}>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                  <div
                    onClick={stopAudio}
                    className={`h-8 w-8 bg-[#9333EA] rounded-full items-center justify-center group-hover:bg-[#9333EA] flex-shrink-0 hover:scale-110 pause-btn-album hidden`}
                  >
                    <BsFillPauseFill className="text-lg ml-[1px]" />
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => handleClick(m.id)}
                    className="h-8 w-8 bg-[#9333EA] ml-[0.90rem] rounded-full flex items-center justify-center group-hover:bg-[#9333EA] flex-shrink-0 hover:scale-110"
                  >
                    <BsFillPlayFill className="text-lg ml-[1px]" />
                  </div>
                </>
              )}

              <Link className="text-sm" to={`/album/${m.id}`}>
                <h4 className="font-semibold truncate w-36">
                  {m.name.length > 20 ? m.name.substring(0, 20) + ".." : m.name}
                </h4>
                <h6>{m.artists[0].name}</h6>
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
