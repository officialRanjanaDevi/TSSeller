import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { SlDislike } from "react-icons/sl";
import { LiaCommentSolid } from "react-icons/lia";
const Reel = () => {
  const [reels, setReels] = useState([]);
  const [authenticated] = useContext(UserContext);
  const parsedUserData = authenticated.user;
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/reels/getReels/${
          parsedUserData?._id
        }`
      );
      console.log(response.data.data);
      setReels(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="h-full w-full p-6">
      <div className="w-full justify-end flex">
        <button
          className="bg-amber-500 px-6 py-2 hover:scale-105 duration-300 rounded text-white text-lg"
          onClick={() => navigate("/reels/uploadReels")}
        >
          Upload Reel
        </button>
      </div>
      <div className="grid grid-cols-4">
        {reels.length>0 &&
          reels.map((reel, index) => (
            <div className="relative w-fit mx-auto mt-10 " key={index}>
              <video
                src={reel?.video}
                width="350"
                controls
                className="shadow-md shadow-black custom-video "
                muted
              
                loop
                controlsList="nodownload noremoteplayback"
                onClick={(e) => (e.target.muted = !e.target.muted)}
              ></video>

              <p className="font-medium text-yellow-800 text-xl capitalize px-4 mt-2">
                {reel?.caption}
              </p>

              <div className="flex flex-col absolute top-2/3 -right-10  -translate-y-1/2  p-2 gap-8 ">
              <p className="flex flex-col items-center">
              <CiHeart className="text-black text-2xl cursor-pointer hover:text-red-500" />{reel?.likes?.length}
              </p>
               <p className="flex flex-col items-center"> <IoShareSocialOutline className="text-black text-2xl cursor-pointer hover:text-lime-600" />{reel?.shares}</p>
               <p className="flex flex-col items-center"> <SlDislike className="text-black text-2xl cursor-pointer hover:text-blue-500" />{reel?.disLikes?.length}</p>
               <p className="flex flex-col items-center"><LiaCommentSolid className="text-black text-2xl cursor-pointer hover:text-yellow-500" />{reel?.comments?.length}</p>
               
               
                
              </div>
              <i
                className="fa-solid fa-trash absolute text-xl hover:text-2xl text-white hover:text-yellow-800 top-4 right-4"
                onClick={() => deleteReel(reel._id)}
              ></i>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reel;
