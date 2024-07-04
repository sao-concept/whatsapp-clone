import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const EmojiPickerButton = ({ onEmojiClick }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onEmojiClick(emojiData.emoji); // Correctly pass the emoji
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="text-gray-400"
      >
        <BsEmojiSmile size={24} className="mr-3" />
      </button>
      {showPicker && (
        <div className="absolute bottom-full mb-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
