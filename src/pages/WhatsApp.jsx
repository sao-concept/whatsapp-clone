import React, { useState, useEffect, useRef } from "react";
import {
  signOutUser,
  auth,
  db,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  storage,
  ref,
  deleteObject,
} from "../firebase";
import { format } from "date-fns";
import { IoMdLogOut } from "react-icons/io";
import EmojiPickerButton from "../components/EmojiPickerButton";
import AttachmentMenu from "../components/AttachmentMenu";
import CameraButton from "../components/CameraButton";
import AudioRecorderButton from "../components/AudioRecorderButton";
import LoadingScreen from "../components/LoadingScreen";

const WhatsApp = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);

  // Loading screen start
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [progress]);
  // Loading screen end

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const currentUser = auth.currentUser;

  const handleSendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, "chats"), {
        message,
        timestamp: new Date(),
        senderId: currentUser.uid,
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleSendAttachment = async (type, messageContent) => {
    if (!messageContent) {
      return;
    }

    await addDoc(collection(db, "chats"), {
      message: messageContent,
      type,
      timestamp: new Date(),
      senderId: currentUser.uid,
    });
  };

  const handleSendCamera = async (cameraImageUrl) => {
    if (cameraImageUrl) {
      await addDoc(collection(db, "chats"), {
        message: cameraImageUrl,
        type: "image",
        timestamp: new Date(),
        senderId: currentUser.uid,
      });
    }
  };

  const handleDeleteMessage = async (chatId, messageContent) => {
    await deleteDoc(doc(db, "chats", chatId));
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urlMatch = messageContent.match(urlPattern);
    if (urlMatch) {
      const fileUrl = urlMatch[0];
      const fileRef = ref(storage, fileUrl);
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("");
  };

  const renderMessageContent = (chat) => {
    const { message, type } = chat;
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urls = message.match(urlPattern);

    if (urls) {
      return urls.map((url, index) => {
        const filename = decodeURIComponent(url.split("?")[0].split("/").pop());

        if (type === "image") {
          return (
            <div key={index}>
              <img
                src={url}
                alt=" "
                className="max-w-xs rounded-lg cursor-pointer"
              />
            </div>
          );
        } else if (type === "video") {
          return (
            <div key={index}>
              <video controls className="max-w-xs rounded-lg">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (type === "audio") {
          return (
            <div key={index}>
              <audio controls className="w-full">
                <source src={url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-600 underline block"
              >
                {filename}
              </a>
            </div>
          );
        }
      });
    }

    return message;
  };

  return (
    <>
      {loading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="flex flex-col h-screen bg-[#0d141a]">
          <div className="flex justify-between items-center p-4 border-b border-neutral-600 bg-[#202c33]">
            <div className="flex items-center">
              <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                {getInitials(currentUser.displayName)}
              </div>
              <span className="ml-2 text-neutral-200">
                {currentUser.displayName}
              </span>
            </div>
            <button
              onClick={signOutUser}
              className="text-red-500 hover:text-red-700 transition duration-150"
            >
              <IoMdLogOut size={24} />
            </button>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-grow p-4 overflow-auto space-y-4"
          >
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex ${
                  chat.senderId === currentUser.uid
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    chat.senderId === currentUser.uid
                      ? "bg-[#005c4b] text-white"
                      : "bg-[#202c33] text-neutral-200"
                  }`}
                >
                  {renderMessageContent(chat)}
                  <span className="block text-xs text-neutral-400 mt-1">
                    {format(chat.timestamp.toDate(), "PPpp")}
                  </span>
                  {chat.senderId === currentUser.uid && (
                    <button
                      onClick={() => handleDeleteMessage(chat.id, chat.message)}
                      className="text-red-500 hover:text-red-700 transition duration-150 text-xs mt-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center p-4 border-t border-neutral-600 bg-[#202c33]">
            <EmojiPickerButton onEmojiClick={handleEmojiClick} />
            <AttachmentMenu onSendAttachment={handleSendAttachment} />
            <CameraButton onSendCamera={handleSendCamera} />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow p-2 border bg-[#2c3943] rounded-full mx-2 outline-none text-sm text-neutral-200"
              placeholder="Type a message..."
            />
            <AudioRecorderButton
              message={message}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsApp;
