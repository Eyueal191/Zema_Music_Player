import React from "react";
import Main from "./components/Main";
import logo from "./assets/logo.png";
import PlayerBackground from "./assets/PlayerBackground.webp";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100 text-gray-900 font-sans">
      
      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 border-b border-gray-200 py-3 px-4 sm:py-4 sm:px-8 flex justify-center items-center sticky top-0 z-50 shadow-sm">
        <img
          src={logo}
          alt="Zema Player Logo"
          className="h-10 sm:h-14 md:h-16 lg:h-20 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-8 py-8 md:py-10 flex flex-col items-center">
        <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] bg-white/70 backdrop-blur-lg border border-gray-100 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
          <Main PlayerBackground={PlayerBackground} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-100 to-blue-50 border-t border-gray-200 text-gray-600 py-5 px-4 sm:px-8 text-center text-sm md:text-base backdrop-blur-md">
        <p className="tracking-wide">
          &copy; {new Date().getFullYear()}{" "}
          <strong className="text-blue-700">Zema Player</strong> 🎧
          <span className="mx-1">|</span>
          Built with <span className="text-pink-500">♥</span> by{" "}
          <span className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            Eyueal Ayalew
          </span>
        </p>
        <p className="mt-2">
          Contact:{" "}
          <a
            href="mailto:contact@zemaplayer.com"
            className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
          >
            contact@zemaplayer.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
