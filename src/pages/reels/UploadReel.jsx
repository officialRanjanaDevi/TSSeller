import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { SlDislike } from "react-icons/sl";
import { LiaCommentSolid } from "react-icons/lia";
const UploadReel = () => {
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [authenticated] = useContext(UserContext);
  const parsedUserData = authenticated.user;
  const navigate = useNavigate();
 console.log(authenticated)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const postData = async () => {
    if (!data) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("reel", data);
    formData.append("caption", caption);
    formData.append("storeId",authenticated.user.storeId)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/reels/upload/${parsedUserData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      if (response.data) {
        navigate("/reels");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="w-[500px] mx-auto shadow-md border-2 p-4 rounded m-4 flex flex-col gap-4 items-center">
        {preview ? (
          <div className="relative w-full h-full text-center">
            <video src={preview} controls className="border-2 border-black w-fit mx-auto h-[60vh] rounded " />
            <div className="flex flex-col absolute right-6 gap-6 text-2xl bottom-28">
                <CiHeart/>
                <IoShareSocialOutline/>
                <SlDislike />
                <LiaCommentSolid/>
            </div>
            <button
              onClick={() => {
                setData(null);
                setPreview(null);
              }}
              className="mt-2 text-red-500 hover:underline"
            >
              Change File
            </button>
          </div>
        ) : (
          <input type="file" accept="video/*" onChange={handleFileChange} className="border-2 rounded h-[60vh]" />
        )}

     
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border-2 w-full rounded p-2"
          placeholder="Enter caption"
        />

       
        <button
          onClick={postData}
          className="w-40 bg-amber-500 px-6 py-2 hover:scale-105 duration-300 rounded text-white text-lg"
        >
          Upload Reel
        </button>
      </div>
    </div>
  );
};

export default UploadReel;
