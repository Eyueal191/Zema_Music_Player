import React, { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
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

  // ... rest of your component ...
};
export default Main;
import React, { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
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

  // ... rest of your component ...
};
export default Main;
