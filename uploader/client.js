const fs = require("node:fs/promises");
const net = require("node:net");

const socket = net.createConnection({ host: "::1", port: 9999 }, async () => {
  console.log("Connected");

  const fileHandle = await fs.open("dico.txt", "r");
  const fileStream = fileHandle.createReadStream();

  fileStream.on("data", (data) => {
    if (!socket.write(data)) {
      socket.pause();
    }
  });

  fileStream.on("drain", () => {
    socket.resume();
  });

  fileStream.on("end", () => {
    console.log("File sent");
    socket.end();
  });
});
