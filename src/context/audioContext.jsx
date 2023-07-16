import React, { createContext, useState, useRef, useEffect } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const [trackProgress, setTrackProgress] = useState(0);
  const [total, setTotal] = useState([]);

  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const prevIsRepeatRef = useRef(isRepeat);
  const prevIsRandomRef = useRef(isRandom);
  const prevTotal = useRef(total);
  const prevCurrentTrack = useRef(currentTrack);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
  const seekPosition = duration ? trackProgress * (100 / duration) : 0;
  const curr_time = `${Math.floor(trackProgress / 60)}:${
    Math.floor(trackProgress - Math.floor(trackProgress / 60) * 60) < 10
      ? "0" + Math.floor(trackProgress - Math.floor(trackProgress / 60) * 60)
      : Math.floor(trackProgress - Math.floor(trackProgress / 60) * 60)
  } `;

  audioRef.current.onerror = () => {
    alert("Tidak ada koneksi internet");
  };

  window.onbeforeunload = function () {
    localStorage.removeItem("cachedAlbums");
    localStorage.removeItem("cachedArtists");
    localStorage.removeItem("cachedGenre");
    localStorage.removeItem("cachedPodcast");
  };

  useEffect(() => {
    prevTotal.current = total;
  }, [total]);

  useEffect(() => {
    prevIsRepeatRef.current = isRepeat;
  }, [isRepeat]);

  useEffect(() => {
    prevIsRandomRef.current = isRandom;
  }, [isRandom]);

  useEffect(() => {
    prevCurrentTrack.current = currentTrack;
  }, [currentTrack]);

  const playAudio = (track, id) => {
    setCurrentTrack(track);
    if (prevCurrentTrack.current.album?.id === id) {
      if (!audioRef.current.src || audioRef.current.src !== track.preview_url) {
        audioRef.current.src = track.preview_url;
      }
    } else if (prevCurrentTrack.current.playlist?.id === id) {
      if (!audioRef.current.src || audioRef.current.src !== track.preview_url) {
        audioRef.current.src = track.preview_url;
      }
    } else {
      if (!audioRef.current.src || audioRef.current.src !== track.preview_url) {
        audioRef.current.src = track.preview_url;
      }
    }
    audioRef.current.play();
    setIsPlaying(true);
    startTimer();
  };

  const stopAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        prevIsRepeatRef.current && !prevIsRandomRef.current
          ? repeat()
          : !prevIsRepeatRef.current && prevIsRandomRef.current
          ? random()
          : prevIsRepeatRef.current && prevIsRandomRef.current
          ? random()
          : handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const handleNext = () => {
    let indexTrack =
      prevTotal.current.findIndex(
        (track) => track.track.preview_url === audioRef.current.src
      ) + 1;
    if (indexTrack === prevTotal.current.length) {
      setCurrentTrack(prevTotal.current[0].track);
      setIsPlaying(false);
      setTrackProgress(0);
      clearInterval(intervalRef.current);
      return false;
    } else {
      setTrackProgress(0);
      playAudio(prevTotal.current[indexTrack].track);
    }
  };

  const nextAudio = () => {
    let indexTrack =
      prevTotal.current.findIndex(
        (track) => track.track.preview_url === audioRef.current.src
      ) + 1;
    let nextTrack = prevTotal.current[indexTrack]?.track;
    if (nextTrack) {
      setTrackProgress(0);
      playAudio(nextTrack);
    } else {
      return false;
    }
  };

  const prevAudio = () => {
    let indexTrack =
      prevTotal.current.findIndex(
        (track) => track.track.preview_url === audioRef.current.src
      ) - 1;
    let prevTrack = prevTotal.current[indexTrack]?.track;
    if (prevTrack) {
      setTrackProgress(0);
      playAudio(prevTrack);
    } else {
      return false;
    }
  };

  const seekTo = (event) => {
    let seekto = duration * (event.value / 100);
    audioRef.current.currentTime = seekto;
    setTrackProgress(seekto);
  };

  const repeat = () => {
    let indexTrack = prevTotal.current.findIndex(
      (track) => track.track.preview_url === audioRef.current.src
    );
    let track = prevTotal.current[indexTrack]?.track;
    playAudio(track);
  };

  const random = () => {
    let indexTrack = Math.floor(Math.random() * prevTotal.current.length);
    let track = prevTotal.current[indexTrack]?.track;
    playAudio(track);
  };

  const audioState = {
    isPlaying,
    currentTrack,
    playAudio,
    stopAudio,
    setTotal,
    total,
    currentPercentage,
    nextAudio,
    prevAudio,
    seekPosition,
    trackProgress,
    curr_time,
    seekTo,
    setIsRepeat,
    isRepeat,
    setIsRandom,
    isRandom,
    user,
    setUser
  };

  return (
    <AudioPlayerContext.Provider value={audioState}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContext;
