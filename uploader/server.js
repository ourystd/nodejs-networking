const fs = require("node:fs/promises");
const net = require("node:net");

const server = net.createServer();
let file, fileStream;

server.on("connection", async (socket) => {
  console.log("Client connected");

  socket.on("data", async (chunk) => {
    if (!file) {
      socket.pause();
      file = await fs.open("./storage/store-data.txt", "w");
      fileStream = file.createWriteStream();
      fileStream.write(chunk);
      socket.resume();

      fileStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!fileStream.write(chunk)) {
        socket.pause();
      }
    }
  });

  socket.on("error", (err) => {
    console.log(`err: ${err}`);
  });

  socket.on("end", () => {
    console.log("Connection ended");
    file.close();
    file = undefined;
    fileStream = undefined;
  });
});

server.listen(9999, "::1", () => {
  console.log("Server bound", server.address());
});
