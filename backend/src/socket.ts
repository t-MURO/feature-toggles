import io from "socket.io";
import { Server } from "http";
import FeatureRequest from "./models/transfer/FeatureRequest";
import { getToggles } from "./services/ToggleService";

let ws: io.Server;

export const initSocket = (server: Server) => {
  ws = io(server);
  ws.on("connection", socket => {
    console.log("connected user");
    socket.on("get-features", async (request: FeatureRequest) => {
      socket.join(request.environmentId);
      const features = await getToggles(request.environmentId, request.options);
      socket.emit("features", features);
    });
  });

  return ws;
};

export const getCurrentlyUsedEnvironments = (): string[] => {
  const sids = ws.sockets.adapter.sids;
  const envIds = Object.keys(sids)
    .filter(sid => Object.keys(sids[sid]).length > 1) // gets rid of first entry that doesnt seem to be an user
    .map(sid => Object.keys(sids[sid])[1]); // gets rid of the first entry on one user, seems to be unique id
  const uniqueEnvIds = [...new Set(envIds)]; // gets rid of double entries
  return uniqueEnvIds;
};

export const updateFeaturesThroughWebSocket = () => {
  const environmentIds = getCurrentlyUsedEnvironments();
  environmentIds.forEach(environmentId => {
    ws.sockets.in(environmentId).emit("re-request");
  });
};

export const getIO = () => {
  if (!ws) {
    throw new Error("Socket.io not initialized");
  }
  return ws;
};
