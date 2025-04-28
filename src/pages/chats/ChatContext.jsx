import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { UserContext } from "../../components/context/UserContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [authenticated] = useContext(UserContext);
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  const serverURL = import.meta.env.VITE_TRIALSHOPY_API_URL;
  const initialStoreId = authenticated?.user?.storeId || null;
  const [storeId, setStoreId] = useState(initialStoreId);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    if (!storeId) return;
    const socketInstance = io(serverURL);

    setSocket(socketInstance);

    socketInstance.on("onlineUser", (users) => {
      setOnlineUsers(new Set(users));
    });

    socketInstance.emit("sidebar", storeId);

    socketInstance.on("conversation", (data) => {
      const conversationUserData = data.map((conversationUser) => {
        if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
          return { ...conversationUser, userDetails: conversationUser?.sender };
        } else if (conversationUser?.receiver?._id === storeId) {
          return {
            ...conversationUser,
            userDetails: conversationUser.receiver,
          };
        } else {
          return { ...conversationUser, userDetails: conversationUser.sender };
        }
      });
      setUserChats(conversationUserData);
      console.log(data, "conversationUserData");
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [storeId, serverURL]);

  useEffect(() => {
    // Update storeId if authenticated.user.storeId changes
    if (authenticated?.user?.storeId) {
      setStoreId(authenticated.user.storeId);
    }
  }, [authenticated?.user?.storeId]);

  const isUserOnline = (userId) => onlineUsers.has(userId);
  return (
    <ChatContext.Provider
      value={{
        userChats,
        setUserChats,
        isUserChatsLoading,
        userChatsError,
        socket,
        isUserOnline,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
