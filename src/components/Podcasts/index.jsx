import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api";
import { FaPlay, FaPause } from "react-icons/fa";
import AudioPlayerContext from "../../context/audioContext";

export default function Podcast() {
  const [podcast, setPodcast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } =
    useContext(AudioPlayerContext);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("cachedPodcast");
      if (cachedData) {
        setPodcast(JSON.parse(cachedData));
      } else {
        const data = await apiClient.get(
          `playlists/7ggwgQPqsTvXGrzAsL9CQv/tracks`
        );
        const PodcastItems = data.items;
        const modifiedTracks = PodcastItems.map((track) => ({
          ...track,
          track: {
            ...track.track,
            podcast: { id: track.track.artists[0].id },
          },
        }));
        setPodcast(modifiedTracks);
        localStorage.setItem("cachedPodcast", JSON.stringify(modifiedTracks));
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleClick = async (id, event) => {
    if (
      Object.entries(currentTrack).length === 0 ||
      currentTrack.podcast?.id !== id
    ) {
      event.classList.add("bg-[#6554af]");
      event.classList.add("hover:bg-[#6554af]");
      event.classList.add("animate-spin");
      event.childNodes[0].removeChild(event.childNodes[0].childNodes[0]);
      event.childNodes[0].innerHTML = `<path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>`;
      const data = await apiClient.get(`shows/${id}`);
      const filterData = data.episodes.items.filter((m) => m.audio_preview_url);
      const modifiedTracks = filterData.map((track) => ({
        track: {
          album: { images: track.images },
          podcast: { id: id },
          artists: [
            {
              name: data.name,
            },
          ],
          name: track.name,
          preview_url: track.audio_preview_url,
          description: track.description,
          release_date: track.release_date,
          id: track.id,
        },
      }));
      setTotal(modifiedTracks);
      playAudio(modifiedTracks[0].track);
    } else {
      playAudio(currentTrack);
    }
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse w-[240px] bg-gray-300 rounded overflow-hidden h-[240px] mb-4"
          >
            <div className="flex mt-[160px] items-center justify-around">
              <div className="flex flex-col">
                <div className="w-[100px] h-[8px] bg-gray-300"></div>
                <div className="w-[50px] h-[8px] bg-gray-300 mt-3"></div>
              </div>
              <div className="w-[50px] h-[50px] border bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {podcast.map((m, i) => (
        <div
          key={i}
          className="podcast-card relative w-[240px] h-[250px] rounded"
        >
          <Link
            to={`/podcast/${m.track.artists[0].id}`}
            className="text-white bottom-12 left-5 font-semibold absolute z-20"
          >
            <h1>
              {m.track.artists[0].name.length > 15
                ? m.track.artists[0].name.substring(0, 15) + "..."
                : m.track.artists[0].name}
            </h1>
          </Link>
          <figure className="card-banner relative rounded-lg overflow-hidden mb-[20px] z-[1]">
            <Link to={`/podcast/${m.track.artists[0].id}`}>
              <img
                src={m.track.album.images[0].url}
                className="opacity-60 w-full"
                alt={m.track.artists[0].name}
              />
            </Link>
            {isPlaying && currentTrack.podcast?.id === m.track.podcast.id ? (
              <div
                onClick={stopAudio}
                className="card-banner-icon absolute bottom-[20px] right-[20px] w-[50px] h-[50px] grid place-items-center rounded-[50%] text-[20px] text-white cursor-pointer bg-[#6554af] "
              >
                <FaPause />
              </div>
            ) : (
              <div
                onClick={(event) =>
                  handleClick(m.track.artists[0].id, event.currentTarget)
                }
                className="card-banner-icon absolute bottom-[20px] right-[20px] w-[50px] h-[50px] grid place-items-center rounded-[50%] text-[20px] text-white bg-[#6554af] duration-[0.25s] animate-[ease-in-out] cursor-pointer"
              >
                <FaPlay />
              </div>
            )}
          </figure>
        </div>
      ))}
    </>
  );
}
