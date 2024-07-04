import React from "react";
// import { BsCamera } from "react-icons/bs";
import { IoCamera } from "react-icons/io5";

const CameraButton = ({ onSendCamera }) => {
  const handleCameraClick = () => {
    // Placeholder for camera functionality
    const cameraImageUrl = "camera_image_url"; // You can replace this with actual camera image URL logic
    onSendCamera(cameraImageUrl);
  };

  return (
    <button onClick={handleCameraClick} className="p-2 text-neutral-500 ">
      <IoCamera size={30} />
    </button>
  );
};

export default CameraButton;
