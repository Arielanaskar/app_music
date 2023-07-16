import { Link } from "react-router-dom";
import { apiClient } from "../../api";
import { useContext, useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import AudioPlayerContext from "../../context/audioContext";

export default function AlbumArtist({ id, type }) {
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
    if (id) {
      const fetchData = async () => {
        const data = await apiClient.get(`artists/${id}/albums`);
        const albumItems = data.items;
        setAlbums(albumItems);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [id]);

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
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="w-[190px] h-[240px] rounded-[40px] overflow-hidden relative animate-pulse bg-gray-300"
          ></div>
        ))}
      </>
    );
  }

  if (albums.length === 0) {
    return (
      <h1 className="text-lg text-white font-semibold">No albums available</h1>
    );
  }

  return (
    <>
      {type === "single"
        ? albums
            .filter((album) => album.album_type === "single")
            .map((m, i) => (
              <div
                key={i}
                className="w-[190px] h-[240px] rounded-[32px] shadow-md overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group card-album"
              >
                <Link to={`/album/${m.id}`}>
                  <img
                    src={m.images[0].url}
                    alt=""
                    className={`h-full w-full absolute inset-0 object-cover rounded-[32px] opacity-80 group-hover:opacity-100`}
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
                    <h4 className="font-extrabold truncate w-36">
                      {m.name.length > 10
                        ? m.name.substring(0, 10) + ".."
                        : m.name}
                    </h4>
                    <h6>{m.artists[0].name}</h6>
                  </Link>
                </div>
              </div>
            ))
        : albums
            .filter((album) => album.album_type === "album")
            .map((m, i) => (
              <div
                key={i}
                className="w-[190px] h-[240px] rounded-[32px] shadow-md overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group card-album"
              >
                <Link to={`/album/${m.id}`}>
                  <img
                    src={m.images[0].url}
                    alt=""
                    className={`h-full w-full absolute inset-0 object-cover rounded-[32px] opacity-80 group-hover:opacity-100`}
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
                    <h4 className="font-extrabold truncate w-36">
                      {m.name.length > 10
                        ? m.name.substring(0, 10) + ".."
                        : m.name}
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
