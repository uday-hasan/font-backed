import { IncomingMessage } from "http";
const parser = (req: IncomingMessage) =>
  new Promise((resolve) => {
    let body = "";
    req.on("data", function (chunk) {
      return (body += chunk);
    });
    req.on("end", () => resolve(JSON.parse(body || "{}")));
  });

export default parser;
