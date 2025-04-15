import { Schema, Types, model } from "mongoose";

export interface FontGroupInterface {
  groupName: string;
  fonts: {
    fontName: string;
    fontId: Types.ObjectId;
    fontFamily: string;
  }[];
}

const groupSchema = new Schema<FontGroupInterface>({
  groupName: {
    type: String,
    required: true,
  },
  fonts: [
    {
      fontName: {
        type: String,
        required: true,
      },
      fontId: {
        type: Schema.Types.ObjectId,
        ref: "Font",
        required: true,
      },
      fontFamily: {
        type: String,
      },
    },
  ],
});

const FontGroup = model("FontGroup", groupSchema);
export default FontGroup;
