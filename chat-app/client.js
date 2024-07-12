const net = require("node:net");
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const connectionOptions = {
  host: "127.0.0.1",
  port: 9999,
};

const socket = net.createConnection(connectionOptions, async () => {
  console.log("Connected");
  const message = await rl.question("Enter a message > ");

  socket.write(message);
});

socket.on("data", async (data) => {
  console.log("\n" + data.toString() + "\n");
  const message = await rl.question("> ");
  socket.write(message);
});

socket.on("error", (err) => {
  console.log(err);
});

socket.on("end", () => {
  console.log("Client disconnected");
});
