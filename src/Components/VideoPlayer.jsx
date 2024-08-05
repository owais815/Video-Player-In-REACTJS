import { useEffect, useMemo, useRef, useState } from "react";

function VideoPlayer() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoSource = useMemo(
    () => [
      "/Videos/video.mp4",
      "/Videos/video1.mp4",
      "/Videos/video2.mp4",
      "/Videos/video3.mp4",
    ],
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex > 0 ? currentIndex - 1 : videoSource.length - 1
    );
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    video.src = videoSource[currentIndex];
    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [currentIndex, videoSource]);

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < videoSource.length - 1 ? prevIndex + 1 : 0
    );
  };
  const handleReset = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    if (!isPlaying) {
      video.play();
    }
  };
  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const boundingRect = e.target.getBoundingClientRect();
    const clickX = e.clientX - boundingRect.left;
    const newTime = (clickX / boundingRect.width) * video.duration;
    video.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <>
      <header className=" w-full ">
        <nav className="bg-gray-800 border-gray-200 py-2.5 text-white dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <span className=" text-4xl font-bold whitespace-nowrap dark:text-white">
              Video Player
            </span>

            
          </div>
        </nav>
      </header>
    <div className="bg-custom-radial bg-gray-700 w-full h-screen flex justify-center items-center font-signature ">
      <div className="relative flex flex-col justify-center  items-center p-4 gap-2 bg-gray-500 text-slate-300 p-6 xl:p-10 rounded-lg">
        {/* video and progress bar  */}
        <div className="space-y-2">
          <div>
            <video
              width={900}
              className="min-w-full  rounded-lg"
              ref={videoRef}
            >
              <source src={videoSource[currentIndex]} type="video/mp4" />
            </video>
          </div>
          {/* Progress bar */}
          <div className="relative w-full h-2.5  bg-gray-300 rounded">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />

            <div
              className="absolute top-0 left-0 w-full h-full cursor-pointer"
              onClick={handleProgressClick}
            />
          </div>

          {/* Time and duration */}
          <div className="flex justify-between w-full text-white">
            <span>{formatTime(currentTime)}</span>
            <span>{isPlaying ? formatTime(duration) : "00:00"}</span>
          </div>
        </div>

        {/* All buttons  and rest of code till last*/}
        <div className="flex  items-center end-8  ">
          <div className="inline-flex   ">
            <button
              type="button"
              onClick={handlePrevious}
              className="flex items-center justify-center px-4 ml-20 h-10 text-base font-medium text-white bg-gray-100 rounded-s hover:bg-gray-300 "
            >
              <img
                src="/icons/rewind-button.png"
                alt="Pause"
                className="w-8 h-8 mr-3 "
              />
            </button>

            <button
              type="button"
              className="   flex items-center justify-center px-4  h-10 text-base font-medium text-white bg-gray-100  dark:bg-gray-100 dark:border-gray-200 dark:text-gray-400  dark:hover:text-white"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <img src="/icons/pause.png" alt="Pause" className="w-8 h-8" />
              ) : (
                <img src="/icons/play.png" alt="Play" className="w-8 h-8" />
              )}
            </button>

            <button
              dir="rtl"
              type="button"
              onClick={handleNext}
              className="flex items-center justify-center px-4  h-10 text-base font-medium text-white bg-gray-100 rounded-s hover:bg-gray-300 "
            >
              <img
                src="/icons/next-button.png"
                alt="Pause"
                className="w-9 h-9  ml-2"
              />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center mx-4 px-4 py-4 h-10 text-base font-large text-white hover:text-black rounded-full"
            >
              <svg
                className="w-5 h-5 rounded-full rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  transform="matrix(0 1 1 0 2.5 2.5)"
                >
                  <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />

                  <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)" />
                </g>
              </svg>
            </button>
          </div>
          {/* Volume up down */}
          <div className="flex  gap-2">
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 "
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default VideoPlayer;
