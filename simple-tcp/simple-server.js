const net = require("node:net");
const fs = require("node:fs/promises");

const server = net.createServer(async (socket) => {
  //   console.log(socket);
  const fileHandle = await fs.open("store-data.txt", "w");

  socket.on("data", (data) => {
    console.log(data);
    console.log(data.toString());
    fileHandle.write(data);
  });

  socket.on("connectionAttempt", (c) => {
    console.log("----- connection -------", c);
  });

  socket.on("error", (err) => {
    console.log(err);
  });
  socket.on("end", () => {
    console.log("Client disconnected; CIAO\n");
    fileHandle.close();
  });
});

server.listen(9999, "127.0.0.1", () => {
  console.log("Server bound", server.address());
});

server.on("error", (err) => {
  console.log(err);
});

server.on("connection", (c) => {
  console.log("----- connection -------");
});
