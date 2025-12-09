import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://devhub-server-zugl.onrender.com", {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};
