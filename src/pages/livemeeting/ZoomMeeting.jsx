import React from "react";
import axios from "axios";
import { ZoomMtg } from "@zoom/meetingsdk";

const ZoomMeeting = ({
  meetId,
  meetTitle,
  meetZoomId,
  meetZoomPass,
  meetUsername,
  meetStatus,
}) => {

    const joinMeeting = async () => {
      ZoomMtg.setZoomJSLib("https://source.zoom.us/3.11.2/lib", "/av");
  
      // Load WebAssembly assets
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
  
      const apiKey = import.meta.env.VITE_ZOOM_SDK_KEY;
      const apiSecret = import.meta.env.VITE_ZOOM_SDK_SECRET;
   
      const meetConfig = {
        meetingNumber: meetZoomId,
        userName: meetUsername, 
        passWord: meetZoomPass,
        leaveUrl: "/mentor/meeting",
        role: 1,
      };
  
      ZoomMtg.generateSDKSignature({
        sdkKey: apiKey,
        sdkSecret: apiSecret,
        meetingNumber: meetConfig.meetingNumber,
        role: meetConfig.role,
        success: function (res) {
          const signature = res;
         
          console.log(meetConfig, apiKey, apiSecret, signature, "jii"); 
          
          ZoomMtg.init({
            leaveUrl: meetConfig.leaveUrl,
            isSupportAV: true,
            success: () => {
              ZoomMtg.join({
                meetingNumber: meetConfig.meetingNumber,
                userName: meetConfig.userName,
                signature: signature,  
                sdkKey: apiKey,
                passWord: meetConfig.passWord,
                success: async () => {
                  console.log("Meeting joined successfully");
  
                  // ✅ Check if user has already joined
                  const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/attendances`,
                    {
                      params: { filters: { meeting: { id: { $eq: meetId } } } },
                      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` },
                    }
                  );
  
                  if (response.data.data.length === 0) {
                    await axios.post(
                      `${process.env.NEXT_PUBLIC_STRAPI_URL}/attendances`,
                      {
                        data: {
                          meeting: meetId,
                          join_at: new Date().toISOString(),
                          presence: "waiting",
                        },
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_OPERATION}`,
                        },
                      }
                    );
                  }
                },
                error: (error) => {
                  console.error("Error joining meeting:", error);
                },
              });
            },
            error: (error) => {
              console.error("Error initializing Zoom SDK:", error);
            },
          });
  
          // ✅ Fixed event listener syntax
          ZoomMtg.inMeetingServiceListener("onUserLeave", async function () {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/attendances`,
              {
                params: { filters: { meeting: { id: { $eq: meetId } } } },
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` },
              }
            );
            if (response.data.data.length !== 0) {
              await axios.put(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/attendances/${response.data.data[0].id}`,
                {
                  data: {
                    leave_at: new Date().toISOString(),
                    presence: "present",
                  },
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_OPERATION}`,
                  },
                }
              );
            }
          });
        },
        error: (err) => console.error("Error generating SDK signature:", err),
      });
    };
  
 
  return (
    <>
      <div className="fixed mb-5 w-full cursor-pointer hover:text-white text-[#999] bg-[#222] border-b border-[#080808] top-0 min-h-14">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-3 gap-2">
              <p>Title: {meetTitle} | </p>
              <p>Name: {meetUsername}</p>
            </div>
            <div>Mentor: {meetUsername}</div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen my-auto items-center text-center flex">
        {meetStatus === "scheduled" || meetStatus === "live" ? (
          <button
            className="bg-black w-fit mx-auto rounded-md my-6 shadow-lg text-2xl px-6 py-3 text-white"
            onClick={joinMeeting}
          >
            I'm Ready to Join Meeting
          </button>
        ) : (
          <div className="bg-black w-fit mx-auto rounded-md my-6 shadow-lg text-2xl px-6 py-3 text-white">
            Meet has been {meetStatus}
          </div>
        )}
      </div>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://source.zoom.us/3.5.1/css/bootstrap.css"
      />
      <link
        type="text/css"
        rel="stylesheet"
        href="https://source.zoom.us/3.5.1/css/react-select.css"
      />
    </>
  );
};

export default ZoomMeeting;
