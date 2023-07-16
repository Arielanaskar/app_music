import { FaPlay, FaPause } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import apiClient from "../../api";
import parse from "html-react-parser";
import moment from "moment";
import AudioPlayerContext from "../../context/audioContext";

export default function TracksPodcast({ id }) {
  const [podcast, setPodcast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isPlaying, currentTrack, playAudio, stopAudio, setTotal } =
    useContext(AudioPlayerContext);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await apiClient.get(`shows/${id}`);
        const filterData = data.episodes.items.filter(
          (m) => m.audio_preview_url
        );
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
            id: track.id
          },
        }));
        setPodcast(modifiedTracks);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <tr className="border-t-[1px] border-[#222222] h-[200px]">
        <td>
          <div className="mt-4 pl-4">
            <div className="w-[112px] h-[112px] rounded-lg bg-gray-300 animate-pulse"></div>
          </div>
        </td>
        <td className="align-middle">
          <div className="flex flex-col pl-5">
            <div className="w-[700px] h-[20px] rounded bg-gray-300 animate-pulse flex items-center mb-4"></div>
            <div className="w-[700px] h-[15px] mb-4 mr-5 bg-gray-300 animate-pulse rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex animate-pulse bg-gray-300"></div>
              <div className="bg-gray-400 ml-3 w-[50px] h-[14px] rounded"></div>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      {podcast.map((m, i) => (
        <tr
          key={i}
          className={`h-[200px] align-top ${isPlaying && currentTrack?.id === m.track.id ? 'bg-[#222222]' : 'hover:bg-[#222222]'} cursor-pointer border-t-[1px] border-[#222222]`}
        >
          <td>
            <div className="mt-6 pl-4">
              <img
                className="w-[112px] h-[112px] rounded-lg"
                src={m.track.album.images[0]?.url}
                alt={m.track.name}
              />
            </div>
          </td>
          <td className="align-middle">
            <div className="flex flex-col pl-5">
              <div className="w-[700px] flex items-center mb-4">
                <h2 className="text-[16px] font-semibold text-white">
                  {m.track.name}.
                </h2>
              </div>
              <div className="w-[700px] mb-4 mr-5">
                <p className="text-gray-400 text-sm">
                  {parse(m.track.description).length >= 250
                    ? parse(m.track.description).substring(0, 250) + "..."
                    : parse(m.track.description)}
                </p>
              </div>
              <div className="flex items-center">
                {isPlaying && currentTrack?.id === m.track.id ? (
                  <div
                    onClick={() => stopAudio()}
                    className="w-8 h-8 rounded-full bg-white flex justify-center items-center"
                  >
                    <FaPause className="text-[#6554af]" />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setTotal(podcast);
                      playAudio(m.track);
                    }}
                    className="w-8 h-8 rounded-full bg-white flex justify-center items-center"
                  >
                    <FaPlay className="text-[#6554af]" />
                  </div>
                )}
                <p className="text-gray-400 ml-3 text-sm">
                  {moment(m.track.release_date).format("MMMM YYYY")}
                </p>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
    // <></>
  );
}
