import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

function Main({ PlayerBackground }) {
  const [upLoadedMusics, setUpLoadedMusics] = useState([]);
  const [toBePlayedUrl, setToBePlayedUrl] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [musicUrlList, setMusicUrlList] = useState([]);

  const audio = useRef(null);

  // Handle file selection or drop
  function handleFileChange(files) {
    const names = files.map((music) => music.name);
    const urls = files.map((music) => URL.createObjectURL(music));
    setMusicUrlList(urls);
    const musics = urls.map((url, i) => [url, names[i]]);
    setUpLoadedMusics(musics);
  }

  function handleUploadChange(event) {
    if (event.target.files) handleFileChange([...event.target.files]);
  }

  function handleDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.files) handleFileChange([...event.dataTransfer.files]);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  // Highlight currently playing music
  const musicList = upLoadedMusics.map((music, i) => {
    const isCurrent = music[0] === toBePlayedUrl;

    return (
      <li
        key={i}
        className={`w-full min-h-[60px] p-3 border-2 rounded-lg text-base sm:text-lg text-gray-800 
          bg-gradient-to-r from-blue-50 to-white 
          hover:bg-blue-100 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl 
          flex items-center justify-between
          ${isCurrent ? "border-blue-500 bg-blue-100 relative" : "border-gray-300"}`}
        onClick={() => {
          setToBePlayedUrl(music[0]);
          audio.current.load();
          audio.current.play();
          setIsPaused(false);
        }}
      >
        <span className="truncate max-w-[80%]">{music[1]}</span>
        {isCurrent && (
          <span className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
        )}
      </li>
    );
  });

  // Navigation controls
  function forward() {
    const currentIndex = musicUrlList.indexOf(toBePlayedUrl);
    const next =
      currentIndex + 1 < musicUrlList.length ? musicUrlList[currentIndex + 1] : musicUrlList[0];
    setToBePlayedUrl(next);
  }

  function backward() {
    const currentIndex = musicUrlList.indexOf(toBePlayedUrl);
    const prev =
      currentIndex - 1 >= 0 ? musicUrlList[currentIndex - 1] : musicUrlList[musicUrlList.length - 1];
    setToBePlayedUrl(prev);
  }

  function playController() {
    if (isPaused) {
      audio.current.play();
      setIsPaused(false);
    } else {
      audio.current.pause();
      setIsPaused(true);
    }
  }

  useEffect(() => {
    if (audio.current && toBePlayedUrl) {
      audio.current.load();
      audio.current.play();
      setIsPaused(false);
    }
  }, [toBePlayedUrl]);

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-600">
          Real Music Player
        </h1>

        {/* Upload + Drop Zone */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-1 flex flex-col">
            <label htmlFor="musicUpload" className="text-lg font-medium text-gray-700 mb-2">
              Upload your music
            </label>
            <input
              type="file"
              id="musicUpload"
              accept="audio/*"
              multiple
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 transition-all"
              onChange={handleUploadChange}
            />
          </div>

          <div className="flex-1" onDrop={handleDrop} onDragOver={handleDragOver}>
            <label htmlFor="dropZone" className="text-lg font-medium text-gray-700 mb-2">
              Or drag & drop here
            </label>
            <div className="w-full h-24 sm:h-28 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center text-gray-500 bg-blue-50 hover:bg-blue-100 transition-all cursor-pointer">
              Drop files here
            </div>
          </div>
        </div>

        {/* Music List + Player */}
        {upLoadedMusics.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 bg-white rounded-xl shadow-lg p-4 max-h-[60vh] overflow-y-auto">
              <ul className="space-y-3">{musicList}</ul>
            </div>

            <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg p-4 items-center">
              <img
                src={PlayerBackground}
                alt="player-background"
                className="w-full h-48 sm:h-60 rounded-md object-cover mb-4"
              />

              {/* Audio Element */}
              {toBePlayedUrl && (
                <audio
                  controls
                  autoPlay
                  className="w-full rounded-md shadow-md border-2 border-blue-300 p-2"
                  ref={audio}
                >
                  <source src={toBePlayedUrl} type="audio/mpeg" />
                  <source src={toBePlayedUrl} type="audio/ogg" />
                  <source src={toBePlayedUrl} type="audio/wav" />
                  <source src={toBePlayedUrl} type="audio/flac" />
                  <source src={toBePlayedUrl} type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              )}

              {/* Play Controls BELOW the player */}
              <div className="flex items-center justify-center space-x-6 mt-4">
                <button
                  onClick={backward}
                  className="p-3 border border-gray-400 text-gray-600 rounded-full shadow-sm transition duration-200 hover:bg-gray-100 focus:outline-none"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={playController}
                  className="p-3 border border-gray-400 text-gray-600 rounded-full shadow-sm transition duration-200 hover:bg-gray-100 focus:outline-none"
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </button>
                <button
                  onClick={forward}
                  className="p-3 border border-gray-400 text-gray-600 rounded-full shadow-sm transition duration-200 hover:bg-gray-100 focus:outline-none"
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default Main;
