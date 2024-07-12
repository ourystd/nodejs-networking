const net = require("node:net");

const clients = [];

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    clients.forEach((client) => {
      client.write(data);
    });
  });

  socket.on("error", (err) => {
    console.log(err);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen({ hostname: "127.0.0.1", port: 9999 }, () => {
  console.log("Server bound", server.address());
});

server.on("connection", (socket) => {
  clients.push(socket);
  console.log("A new connection registered");
});
