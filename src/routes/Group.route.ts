import { IncomingMessage, ServerResponse } from "http";
import FontGroup, { FontGroupInterface } from "../models/Group.model";
import parser from "../lib/parser";
const getGroups = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data = await FontGroup.find({});
    if (data.length === 0) {
      return res.end(JSON.stringify({ message: "No groups found" }));
    }
    return res.end(JSON.stringify({ data }));
  } catch (error) {
    return res.end(JSON.stringify({ error: "Error fetching groups" }));
  }
};

const postGroup = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { groupName, fonts } = (await parser(req)) as FontGroupInterface;
    console.log({ groupName, fonts });
    const response = await FontGroup.create({ groupName, fonts });
    if (!response) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Group not created" }));
    }
    console.log({ response });
    res.end(
      JSON.stringify({
        message: "Group created",
        data: { groupName, fonts, response },
      })
    );
  } catch (error) {
    res.end(JSON.stringify({ message: "Faild to Group created", data: null }));
  }
};

export { getGroups, postGroup };
