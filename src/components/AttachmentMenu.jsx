import React, { useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import {
  IoDocument,
  IoImage,
  IoMusicalNote,
  IoDocumentText,
  IoVideocam,
} from "react-icons/io5";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebase";

const AttachmentMenu = ({ onSendAttachment }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = async (iconType, file = null) => {
    setShowMenu(false);

    let messageContent = "";

    if (file) {
      const fileRef = ref(storage, `attachments/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      messageContent = url;
    }

    switch (iconType) {
      case "Document":
      case "Gallery":
      case "Video":
      case "Audio":
      case "PDF":
      case "Recording":
        if (messageContent) {
          await onSendAttachment(iconType, messageContent);
        }
        break;
      case "Camera":
        messageContent = "Camera - camera_image_url";
        break;
      case "Location":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const locationUrl = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
            messageContent = locationUrl;
            await onSendAttachment(iconType, messageContent);
          });
        }
        return;
      case "Contact":
        messageContent = "Contact - Contact Access Triggered";
        break;
      case "Poll":
        messageContent = "Poll - Poll Access Triggered";
        break;
      default:
        console.log(`Unhandled type: ${iconType}`);
    }

    if (messageContent && !messageContent.includes("Location")) {
      await onSendAttachment(iconType, messageContent);
    }
  };

  const handleFileChange = (event, iconType) => {
    const file = event.target.files[0];
    handleMenuClick(iconType, file);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-neutral-500 p-2"
      >
        <FaPaperclip size={20} />
      </button>
      {showMenu && (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-neutral-300 rounded shadow-md w-[200px] text-2xl">
          <label className="block cursor-pointer p-2">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e, "PDF")}
            />
            <IoDocumentText className="inline mr-2" /> PDF
          </label>
          <label className="block cursor-pointer p-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "Image")}
            />
            <IoImage className="inline mr-2" /> Gallery
          </label>
          <label className="block cursor-pointer p-2">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "Video")}
            />
            <IoVideocam className="inline mr-2" /> Video
          </label>
          <label className="block cursor-pointer p-2">
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "Audio")}
            />
            <IoMusicalNote className="inline mr-2" /> Audio
          </label>
          <label className="block cursor-pointer p-2">
            <input
              type="file"
              accept=".doc,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileChange(e, "Document")}
            />
            <IoDocument className="inline mr-2" /> Document
          </label>
        </div>
      )}
    </div>
  );
};

export default AttachmentMenu;
