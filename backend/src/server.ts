import app from "./app";
import http from "http";
import { initSocket } from "./socket/socket";


const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})