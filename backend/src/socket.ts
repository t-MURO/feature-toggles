import io from "socket.io";
import { Server } from "http";
import FeatureRequest from "./models/transfer/FeatureRequest";
import ToggleService from "./services/ToggleService";

const toggleService = new ToggleService();

let ws: io.Server;

export const initSocket = (server: Server) => {
  ws = io(server);
  ws.on("connection", socket => {
    console.log("connected user");
    socket.on("get-features", async (request: FeatureRequest) => {
      socket.join(request.identifier);
      const features = await toggleService.getToggles(request.identifier, request.options);
      socket.emit("features", features);
    });
  });

  return ws;
};

export const getCurrentlyUsedEnvironments = (): string[] => {
  const sids = ws.sockets.adapter.sids;
  const identifiers = Object.keys(sids)
    .filter(sid => Object.keys(sids[sid]).length > 1) // gets rid of first entry that doesnt seem to be an user
    .map(sid => Object.keys(sids[sid])[1]); // gets rid of the first entry on one user, seems to be unique id
  const uniqueIdentifiers = [...new Set(identifiers)]; // gets rid of double entries
  return uniqueIdentifiers;
};

export const updateFeaturesThroughWebSocket = () => {
  const identifiers = getCurrentlyUsedEnvironments();
  identifiers.forEach(identifier => {
    ws.sockets.in(identifier).emit("re-request");
  });
};

export const getIO = () => {
  if (!ws) {
    throw new Error("Socket.io not initialized");
  }
  return ws;
};
