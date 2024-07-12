const net = require("node:net");

const connectionOptions = {
  host: "127.0.0.1",
  port: 9999,
};

const socket = net.createConnection(connectionOptions, async () => {
  console.log("Connected");
  let i = 0;

  function sendData() {
    let canWrite = true;
    console.log("Sending data", i);
    while (i < 1_000_000_000 && canWrite) {
      canWrite = socket.write(`${i} - Hello world\n`);
      i++;

      if (!canWrite) {
        console.log("Can not write");
      }
    }
  }

  socket.on("drain", sendData);

  socket.on("data", (data) => {
    console.log("received:", data.toString());
  });
  socket.on("error", (err) => {
    console.log(err);
  });
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  sendData();
});
