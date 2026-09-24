const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173",
      "https://helpdesk-ticketing-frontend.vercel.app",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinTicket", (ticketId) => {
      console.log(`${socket.id} joined ticket:${ticketId}`);

      socket.join(`ticket:${ticketId}`);
    });

    socket.on("leaveTicket", (ticketId) => {
      console.log(`${socket.id} left ticket:${ticketId}`);

      socket.leave(`ticket:${ticketId}`);
    });

    // ================= INTERNAL NOTE ROOM =================

    socket.on("joinInternalTicket", (ticketId) => {
      socket.join(`ticket:${ticketId}:internal`);

      console.log(
        `${socket.id} joined internal room: ticket:${ticketId}:internal`,
      );
    });

    socket.on("leaveInternalTicket", (ticketId) => {
      socket.leave(`ticket:${ticketId}:internal`);

      console.log(
        `${socket.id} left internal room: ticket:${ticketId}:internal`,
      );
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};
