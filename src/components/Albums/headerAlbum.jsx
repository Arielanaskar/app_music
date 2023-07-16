import { useContext, useEffect, useState } from "react";
import { FaPlay, FaRegHeart, FaArrowDown, FaPause } from "react-icons/fa";
import apiClient from "../../api";
import AudioPlayerContext from "../../context/audioContext";

export default function HeaderAlbum({ id }) {
  const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } = useContext(AudioPlayerContext);
  const [album, setAlbum] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
        const fetchData = async () => {
          const data = await apiClient.get(`albums?ids=${id}`);
          const albumImg = data?.albums[0].images;
          const albumId = data?.albums[0].id;
          const albumName = data?.albums[0].name;
          const albumType = data?.albums[0].album_type;
          const albumRelease = data?.albums[0].release_date;
          const filterTracks = data?.albums[0].tracks.items.filter(
            (track) => track.preview_url
          );
          if (filterTracks.length > 0) {
            const modifiedTracks = filterTracks.map((track) => ({
              track: {
                ...track,
                album: {
                  images: albumImg,
                  id: albumId,
                  name: albumName,
                  album_type: albumType,
                  release_date: albumRelease,
                },
              },
            }));
            setTracks(modifiedTracks);
          } else {
            setTracks([]);
          }
          setAlbum(data?.albums);
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
              <div className="animate-pulse bg-gray-300 w-[50px] h-[16px] rounded mb-3"></div>
              <div className="animate-pulse bg-gray-300 w-[200px] h-[35px] rounded mb-2"></div>
              <div className="animate-pulse bg-gray-300 w-3/4 h-[20px] rounded mb-2"></div>
              <div className="animate-pulse bg-gray-300 w-4/5 h-[20px] rounded mt-5"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] ml-5 mr-2 my-[1rem]">
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
            src={album[0]?.images[0].url}
            alt="Playlist Avatar"
          />
          <div className="flex flex-col">
            <p className="text-[16px] mb-3 text-white font-bold">
              {album[0]?.album_type}
            </p>
            <h1 className="text-[1.5rem] text-white font-bold">
              {album[0]?.name}
            </h1>

            <div className="text-sm mt-5 text-white font-bold flex items-center">
              <div
                className="w-5 h-5 rounded-full mr-2"
                style={{
                  background: `url(${album[0]?.images[0].url})`,
                }}
              ></div>
              <p>{album[0]?.artists[0]?.name}</p>
              <span className="text-lg ml-2">&#8226;</span>
              <span className="ml-2">
                {album[0]?.release_date?.split("-")[0]}
              </span>
              <span className="text-lg ml-2">&#8226;</span>
              <span className="ml-2">{tracks?.length} songs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {isPlaying && currentTrack.album.id === id ? (
          <div
            onClick={stopAudio}
            className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] ml-5 mr-2 my-[1rem]"
          >
            <FaPause className="text-white" size="20px" />
          </div>
        ) : (
          <div
            onClick={() => {
              if (tracks.length !== 0) {
                setTotal(tracks);
                playAudio(
                  Object.entries(currentTrack).length !== 0 &&
                    currentTrack.album?.id === id
                    ? currentTrack
                    : tracks[0].track,
                  id
                );
              }
            }}
            className="play-button cursor-pointer hover:scale-[1.1] flex items-center justify-center w-[60px] h-[60px] rounded-[50%] bg-[#9575DE] text-[2rem] leading-[80px] ml-5 mr-2 my-[1rem]"
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
