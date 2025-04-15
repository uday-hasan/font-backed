import { Document, model, Schema } from "mongoose";

interface FontInterface extends Document {
  name: string;
  font: string;
}

const fontSchema = new Schema<FontInterface>({
  name: {
    type: String,
    required: true,
  },
  font: {
    type: String,
    required: true,
  },
});

const Font = model<FontInterface>("Font", fontSchema);

export default Font;
