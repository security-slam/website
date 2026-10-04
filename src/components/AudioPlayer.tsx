import React, { useState, useRef, useEffect } from "react";
import { useAudio } from "../contexts/AudioContext";

export interface AudioPlayerProps {
  src: string;
  label?: string;
  inline?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, label, inline = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setCurrentAudio } = useAudio();

  useEffect(() => {
    if (isOpen && audioRef.current) {
      // Register this player with a close callback
      setCurrentAudio(audioRef.current, () => setIsOpen(false));
    }
  }, [isOpen, setCurrentAudio]);

  const handleButtonClick = () => {
    if (!hasBeenClicked) {
      setHasBeenClicked(true);
    }
    if (!isOpen) {
      setIsOpen(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      {!hasBeenClicked && !inline && (
        <style>
          {`
            @keyframes pulse-glow {
              0%, 100% {
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
              }
              50% {
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6);
              }
            }
            .pulse-button {
              animation: pulse-glow 2s ease-in-out infinite;
            }
          `}
        </style>
      )}
      <div
        style={{
          display: inline ? "inline-flex" : "flex",
          alignItems: "center",
          gap: "var(--gf-space-md)",
          marginLeft: inline ? "var(--gf-space-md)" : "0"
        }}
      >
        <button
          type="button"
          onClick={handleButtonClick}
          title={label || "Play audio"}
          className={!hasBeenClicked && !inline ? "audio-btn pulse-button" : "audio-btn"}
          style={{
            background: "var(--gf-color-accent-soft)",
            border: "1px solid var(--gf-color-accent)",
            borderRadius: "50%",
            width: inline ? "32px" : "40px",
            height: inline ? "32px" : "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: inline ? "1rem" : "1.2rem",
            padding: 0
          }}
        >
          🎧
        </button>
      {isOpen && (
        <audio
          ref={audioRef}
          controls
          autoPlay
          style={{
            height: inline ? "32px" : "40px",
            maxWidth: inline ? "250px" : "400px"
          }}
        >
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
    </>
  );
};
