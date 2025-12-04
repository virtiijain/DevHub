import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:8080", {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};
