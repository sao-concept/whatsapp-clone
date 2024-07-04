import React, { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

const AudioRecorderButton = ({ message, onSendMessage, onSendAudio }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const handleAudioClick = () => {
    setRecording(!recording);
    console.log("Audio recording toggled");
    // Add audio recording functionality here
    if (!recording) {
      // Start recording
    } else {
      // Stop recording and set audioURL
      setAudioURL({ audioURL }); // Replace with actual audio URL
      onSendAudio("Audio", { audioURL }); // Replace with actual audio URL
    }
  };

  return (
    <div className="relative">
      {!message && !recording ? (
        <button onClick={handleAudioClick} className="text-gray-400">
          <FaMicrophone size={24} />
        </button>
      ) : (
        <button onClick={onSendMessage} className="text-gray-400">
          <FaPaperPlane size={24} />
        </button>
      )}
    </div>
  );
};

export default AudioRecorderButton;
