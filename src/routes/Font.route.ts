import { IncomingMessage, ServerResponse } from "http";
import Font from "../models/Font.model";
import { IncomingForm } from "formidable";
import fs from "fs";

const getFont = async (req: IncomingMessage, res: ServerResponse) => {
  const fonts = await Font.find({});
  if (fonts.length === 0) {
    return res.end(JSON.stringify({ message: "No fonts found" }));
  }
  return res.end(JSON.stringify({ data: fonts }));
};

const postFont = async (req: IncomingMessage, res: ServerResponse) => {
  const font = new IncomingForm();
  font.parse(req, async (err, fields, files) => {
    const file = files.font;
    if (!file || !file[0]) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Font file not found" }));
    }
    const filePath = file[0].filepath;

    fs.readFile(filePath, async (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ error: "File read error" }));
      }
      const fileName = file[0].originalFilename
        ? file[0].originalFilename.replace(".ttf", "")
        : "No font name";
      const base64Font = `data:font/ttf;base64,${data.toString("base64")}`;

      const newFont = await Font.create({
        font: base64Font,
        name: fileName,
      });
      return res.end(JSON.stringify(newFont));
    });
  });
  return;
};

const deleteFont = async (req: IncomingMessage, res: ServerResponse) => {};

export { getFont, postFont };
