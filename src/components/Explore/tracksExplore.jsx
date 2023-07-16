import { useEffect, useState, useContext } from "react";
import { FaPlay, FaPlus, FaPause } from "react-icons/fa";
import { apiClient } from "../../api";
import { Link } from "react-router-dom";
import AudioPlayerContext from "../../context/audioContext";

export default function TracksExplore() {
    const {
        isPlaying,
        currentTrack,
        playAudio,
        stopAudio,
        setTotal,
    } = useContext(AudioPlayerContext);
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiClient.get(
                "playlists/37i9dQZEVXbNG2KDcFcKOF"
            );
            const filterTracks = data.tracks.items.filter((track) => track.track.preview_url);
            const modifiedTracks = filterTracks?.map((track) => ({
                ...track,
                track: {
                    ...track.track,
                    album: {
                        ...track.track.album,
                        id: undefined,
                    },
                },
            }));
            setTracks(modifiedTracks);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="xl:col-span-3 p-4 bg-white rounded-lg shadow-md dark:bg-[#111111]">
                <div className="flex justify-between">
                    <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-200">
                        Top Hits
                    </h4>
                    <div className="text-gray-200 text-sm tracking-wide">
                        
                    </div>
                </div>
                <div className="flex flex-col">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            className="flex items-center mt-4 justify-between"
                            key={i}
                        >
                            <div className="flex w-64 items-center">
                                <div className="w-24 h-11 ml-3 rounded-lg bg-gray-300"></div>
                                <div className="flex flex-col ml-3 h-10 overflow-hidden">
                                    <div className="name-text animate-pulse bg-gray-500 rounded w-96"></div>
                                    <div className="text-xs hover:underline text-gray-500 animate-pulse bg-gray-300 w-2/4 h-4 rounded"></div>
                                </div>
                            </div>
                            <div className="flex w-32 items-center justify-between">
                                <div className="text-sm text-white animate-pulse bg-gray-300 w-5 h-5 rounded-sm"></div>
                                <div className="text-sm text-white animate-pulse bg-gray-300 w-7 h-7 rounded-sm"></div>
                                <div className="text-sm text-white animate-pulse bg-gray-300 w-5 h-5 rounded-sm"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="col-span-3 bg-white rounded-lg shadow-md dark:bg-[#111111]">
            <div className="flex justify-between p-4">
                <h4 className="font-semibold text-gray-600 dark:text-gray-200">
                    Top Hits
                </h4>
                <Link
                    to="/track"
                    className="text-gray-200 text-sm tracking-wide"
                >
                    see all
                </Link>
            </div>
            <div className="flex flex-col mb-5">
                {tracks.slice(0, 4).map((m, i) => (
                    <div
                        className="flex items-center mt-4 justify-between"
                        key={i}
                    >
                        <div className="flex w-[15rem] items-center">
                            {isPlaying &&
                            currentTrack.name === m.track.name &&
                            currentTrack.artists[0].id ===
                                m.track.artists[0].id ? (
                                <div id="wave" className="flex ml-3">
                                    <span className="stroke"></span>
                                    <span className="stroke"></span>
                                    <span className="stroke"></span>
                                    <span className="stroke"></span>
                                    <span className="stroke"></span>
                                    <span className="stroke"></span>
                                    <span className="stroke"></span>
                                </div>
                            ) : (
                                <h5 className="text-gray-500 ml-[0.80rem] mr-[0.5rem]">
                                    0{i + 1}
                                </h5>
                            )}
                            <img
                                className="w-10 h-10 ml-3 rounded-lg"
                                src={
                                    m.track.album
                                        ? m.track.album.images[0].url
                                        : ""
                                }
                                alt=""
                            />
                            <div
                                className={`${
                                    m.track.name.length >= 20 ? "coba" : ""
                                } flex flex-col ml-3 h-10 overflow-hidden`}
                            >
                                <p className="name-text text-sm w-96 text-white font-semibold">
                                    {m.track.name}
                                </p>
                                <Link
                                    to={`/artist/${
                                        m.track.artists
                                            ? m.track.artists[0].id
                                            : ""
                                    }`}
                                    className="text-xs hover:underline text-gray-500"
                                >
                                    {m.track.artists
                                        ? m.track.artists[0].name
                                        : ""}
                                </Link>
                            </div>
                        </div>
                        <div className="flex w-32 items-center justify-between mr-4">
                            <p className="text-sm text-white">0:30</p>
                            {isPlaying &&
                            currentTrack.name === m.track.name &&
                            currentTrack.artists[0].id ===
                                m.track.artists[0].id ? (
                                <div
                                    className="w-7 h-7 flex items-center justify-center rounded-sm cursor-pointer bg-[#32323D]"
                                    onClick={stopAudio}
                                >
                                    <FaPause className="w-2 h-2 text-[#9575DE]" />
                                </div>
                            ) : (
                                <div
                                    className="w-7 h-7 flex items-center justify-center rounded-sm cursor-pointer bg-[#32323D]"
                                    onClick={() => {
                                        if (
                                            currentTrack &&
                                            currentTrack.name ===
                                                m.track.name &&
                                            currentTrack.artists[0].id ===
                                                m.track.artists[0].id
                                        ) {
                                            if (currentTrack.playlist?.id) {
                                                playAudio(
                                                    currentTrack,
                                                    currentTrack.playlist.id
                                                );
                                            } else if (
                                                currentTrack.album?.id !==
                                                undefined
                                            ) {
                                                playAudio(
                                                    currentTrack,
                                                    currentTrack.album.id
                                                );
                                            } else if (
                                                currentTrack.artists[0]
                                                    ?.isPlaying === true
                                            ) {
                                                playAudio(currentTrack);
                                            } else {
                                                playAudio(currentTrack);
                                            }
                                        } else {
                                            setTotal([tracks[i]]);
                                            playAudio(m.track);
                                        }
                                    }}
                                >
                                    <FaPlay className="w-2 h-2 text-[#9575DE]" />
                                </div>
                            )}
                            <div className="w-5 h-5 flex items-center justify-center rounded-sm cursor-pointer bg-gray-500">
                                <FaPlus className="w-2 h-2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}