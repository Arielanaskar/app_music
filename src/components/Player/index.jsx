import { useContext } from "react";
import { FaPlay, FaStepBackward, FaStepForward, FaPause, FaQuestion } from "react-icons/fa";
import { ImLoop, ImShuffle } from "react-icons/im";
import AudioPlayerContext from "../../context/audioContext";

export default function Player() {
    const { isPlaying,
        currentTrack,
        playAudio,
        stopAudio,
        nextAudio,
        prevAudio,
        seekPosition,
        curr_time,
        seekTo,
        setIsRepeat,
        isRepeat,
        setIsRandom,
        isRandom } = useContext(AudioPlayerContext);
        
    return (
        <div className="xl:row-span-2 xl:col-span-2 flex flex-col justify-between bg-white rounded-lg shadow-md dark:bg-[#111111]">
            <div className="flex p-3 justify-between items-center">
                <h4 className="font-semibold text-gray-600 dark:text-gray-200">
                    Player
                </h4>
            </div>
            <div className="flex flex-col items-center">
                {Object.entries(currentTrack).length !== 0 ? (
                    <>
                        <img
                            className="w-40 rounded-lg"
                            src={currentTrack.album?.images[0]?.url}
                            alt=""
                        />
                        <p className="text-white text-2xl mt-6 font-semibold">
                            {currentTrack.name.length > 18
                                ? currentTrack.name.substring(0, 18) + ".."
                                : currentTrack.name}
                        </p>
                        <p className="text-gray-200 text-sm">
                            {currentTrack.artists ? currentTrack.artists[0].name : ""}
                        </p>
                        <div className="w-56 mt-6 flex items-center justify-between">
                            <p className="w-10 text-right curr-time text-white text-xs">
                                {curr_time}
                            </p>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                className="seek-slider"
                                value={seekPosition}
                                onChange={(event) => seekTo(event.target)}
                            />
                            <p className="curr-duration text-white text-xs">0:30</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center">
                            <FaQuestion className="text-[#202026]" />
                        </div>
                        <p className="text-white text-2xl mt-6 font-semibold">
                            No Track Playing
                        </p>
                        <p className="text-gray-200 text-sm">-</p>
                        <div className="w-56 mt-6 flex items-center justify-between">
                            <p className="curr-time text-white text-xs">0:00</p>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                className="seek-slider"
                                value={0}
                                onChange={() => { }}
                                readOnly
                            />
                            <p className="curr-duration text-white text-xs">0:00</p>
                        </div>
                    </>
                )}
            </div>
            <div className="h-28 flex justify-center items-center rounded-b-lg bg-[#9575DE] text-white">
                <div
                    className={`relative flex justify-center Play-track w-max h-max p-4 ${Object.entries(currentTrack).length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                >
                    <ImLoop
                        className={`${Object.entries(currentTrack).length === 0 ? "" : "cursor-pointer"
                            }`}
                        size="15px"
                        onClick={() => setIsRepeat(!isRepeat)}
                        title="repeat"
                    />
                    <span
                        className={`absolute top-6 text-xl ${isRepeat ? "" : "hidden"}`}
                    >
                        &#8226;
                    </span>
                </div>
                <div
                    className={`Prev-track w-max h-max p-4 ${Object.entries(currentTrack).length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                    onClick={prevAudio}
                >
                    <FaStepBackward
                        className={`${Object.entries(currentTrack).length === 0 ? "" : "cursor-pointer"
                            }`}
                        size="15px"
                    />
                </div>
                {isPlaying ? (
                    <div
                        className={`Play-track cursor-pointer bg-white w-max h-max p-4 border rounded-xl`}
                        onClick={stopAudio}
                    >
                        <FaPause className={`text-[#9575DE]`} size="12px" />
                    </div>
                ) : (
                    <div
                        className={`Play-track bg-white w-max h-max p-4 border rounded-xl ${Object.entries(currentTrack).length === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                        onClick={() =>
                            playAudio(
                                currentTrack,
                                currentTrack.playlist
                                    ? currentTrack.playlist.id
                                    : currentTrack.album.id
                            )
                        }
                    >
                        <FaPlay className="text-[#9575DE]" size="12px" />
                    </div>
                )}
                <div
                    className={`next-track w-max h-max p-4 ${Object.entries(currentTrack).length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                    onClick={nextAudio}
                >
                    <FaStepForward
                        className={`${Object.entries(currentTrack).length === 0 ? "" : "cursor-pointer"
                            }`}
                        size="15px"
                    />
                </div>
                <div
                    className={`Play-track w-max h-max p-4 relative flex justify-center${Object.entries(currentTrack).length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                >
                    <ImShuffle
                        className={`${Object.entries(currentTrack).length === 0 ? "" : "cursor-pointer"
                            }`}
                        onClick={() => setIsRandom(!isRandom)}
                        size="15px"
                        title="random"
                    />
                    <span
                        className={`absolute top-6 text-xl ${isRandom ? "" : "hidden"}`}
                    >
                        &#8226;
                    </span>
                </div>
            </div>
        </div>
    );
}
