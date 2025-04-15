import fs from "fs";
import http from "http";
import mongoose, { ObjectId } from "mongoose";
import { config } from "dotenv";
import { getFont, postFont } from "./routes/Font.route";
import Font from "./models/Font.model";
import formidable from "formidable";
import { getGroups, postGroup } from "./routes/Group.route";
config();

// Cors setup
function setCorsHeaders(res: http.ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
// mongodb connetion setup
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log({ err: err.message, message: "Failed to connect to MongoDB" });
  });

const server = http
  .createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const { url, method } = req;
    setCorsHeaders(res);
    res.writeHead(200, { "Content-Type": "application/json" });
    if (method === "GET") {
      if (url === "/") {
        return res.end(
          JSON.stringify({ message: "Welcome to FONT-FAMILY GROUPING" })
        );
      }

      if (url === "/fonts") {
        getFont(req, res);
        return;
      }

      if (url === "/groups") {
        getGroups(req, res);
        return;
      }
    }

    if (method === "POST") {
      if (url === "/fonts") {
        postFont(req, res);
        return;
      }
      if (url === "/groups") {
        console.log(url);
        postGroup(req, res);
        return;
      }
    }

    if (method === "DELETE") {
      if (url?.startsWith("/fonts")) {
        const validURL = url?.split("/").length === 3;
        if (validURL) {
          const id = url.split("/")[2];
          if (id.length !== 24) {
            return res.end(JSON.stringify({ message: "Invalid ID" }));
          }
          const response = await Font.findByIdAndDelete(id);
          if (!response) {
            return res.end(JSON.stringify({ message: "Font not found" }));
          }
          return res.end(JSON.stringify({ message: "Font deleted" }));
        }
      }
      return;
    }

    return res.end(JSON.stringify({ message: "Not found" }));
  })
  .listen(1000, () => {
    console.log("Listening on port 1000");
  });
