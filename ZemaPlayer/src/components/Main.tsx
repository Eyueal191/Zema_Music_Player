import React, { useEffect, useRef, useState, ChangeEvent, DragEvent } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface MainProps {
  PlayerBackground: string;
}

type MusicItem = [string, string]; // [url, name]

const Main: React.FC<MainProps> = ({ PlayerBackground }) => {
  const [upLoadedMusics, setUpLoadedMusics] = useState<MusicItem[]>([]);
  const [toBePlayedUrl, setToBePlayedUrl] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [musicUrlList, setMusicUrlList] = useState<string[]>([]);
  const audio = useRef<HTMLAudioElement | null>(null);

  // --- File handlers ---
  function handleFileChange(files: File[]) {
    const names = files.map((music) => music.name);
    const urls = files.map((music) => URL.createObjectURL(music));
    setMusicUrlList(urls);
    setUpLoadedMusics(urls.map((url, i) => [url, names[i]]));
  }

  function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) handleFileChange(Array.from(event.target.files));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.dataTransfer.files) handleFileChange(Array.from(event.dataTransfer.files));
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  // --- Player Controls ---
  function forward() {
    const currentIndex = musicUrlList.indexOf(toBePlayedUrl);
    const next =
      currentIndex + 1 < musicUrlList.length
        ? musicUrlList[currentIndex + 1]
        : musicUrlList[0];
    setToBePlayedUrl(next);
  }

  function backward() {
    const currentIndex = musicUrlList.indexOf(toBePlayedUrl);
    const prev =
      currentIndex - 1 >= 0
        ? musicUrlList[currentIndex - 1]
        : musicUrlList[musicUrlList.length - 1];
    setToBePlayedUrl(prev);
  }

  function playController() {
    if (!audio.current) return;
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
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8 min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] transition-all duration-500">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 drop-shadow-md">
          Zema Music Player
        </h1>

        {/* Upload & Drop Zone */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="musicUpload"
              className="text-lg font-semibold text-gray-800 mb-3"
            >
              Upload Your Music Files
            </label>
            <input
              type="file"
              id="musicUpload"
              accept="audio/*"
              multiple
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-3 file:px-5
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-100 file:text-blue-700
                hover:file:bg-blue-200 transition-all duration-300"
              onChange={handleUploadChange}
            />
          </div>

          <div className="flex-1" onDrop={handleDrop} onDragOver={handleDragOver}>
            <label
              htmlFor="dropZone"
              className="text-lg font-semibold text-gray-800 mb-3"
            >
              Or Drag & Drop Your Files
            </label>
            <div
              id="dropZone"
              className="w-full h-32 sm:h-40 border-3 border-dashed border-blue-400 rounded-xl flex items-center justify-center text-gray-600 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer"
            >
              Drop your tracks here 🎶
            </div>
          </div>
        </div>

        {/* Music List & Player */}
        {upLoadedMusics.length > 0 && (
          <div className="flex flex-col md:flex-row gap-8 w-full flex-grow">
            {/* Music List */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 max-h-[60vh] overflow-y-auto border border-gray-200">
              <ul className="space-y-4">
                {upLoadedMusics.map((music, i) => (
                  <li
                    key={i}
                    className={`p-4 border-2 border-gray-200 rounded-xl text-base sm:text-lg font-medium text-gray-800 bg-gradient-to-r from-white to-blue-50 hover:from-blue-100 hover:to-blue-200 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-between
                    ${
                      toBePlayedUrl === music[0]
                        ? "ring-4 ring-blue-400 ring-offset-2 animate-pulse"
                        : ""
                    }`}
                    onClick={() => {
                      setToBePlayedUrl(music[0]);
                      audio.current?.load();
                      audio.current?.play();
                      setIsPaused(false);
                    }}
                  >
                    <span className="truncate max-w-[80%]">{music[1]}</span>
                    <Play className="w-5 h-5 text-blue-500" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Player */}
            <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl p-6 items-center border border-gray-200 min-h-[60vh]">
              <img
                src={PlayerBackground}
                alt="Player background"
                className="w-full h-64 sm:h-72 lg:h-80 rounded-xl object-cover shadow-md mb-6"
              />

              {/* Audio Element */}
              {toBePlayedUrl && (
                <audio
                  controls
                  autoPlay
                  className="w-full rounded-lg shadow-md border-2 border-blue-300 p-2"
                  ref={audio}
                >
                  <source src={toBePlayedUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}

              {/* Controls below player */}
              <div className="flex items-center justify-center gap-8 mt-6">
                <button
                  onClick={backward}
                  className="p-4 bg-white hover:bg-gray-100 rounded-full shadow transition-all"
                >
                  <SkipBack className="w-6 h-6" />
                </button>
                <button
                  onClick={playController}
                  className="p-6 bg-white hover:bg-gray-100 rounded-full shadow transition-all"
                >
                  {isPaused ? <Play className="w-8 h-8" /> : <Pause className="w-8 h-8" />}
                </button>
                <button
                  onClick={forward}
                  className="p-4 bg-white hover:bg-gray-100 rounded-full shadow transition-all"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default Main;
