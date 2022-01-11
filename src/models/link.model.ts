import mongoose from "mongoose";

interface LinkSchema extends mongoose.Document {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

const linkSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
  imageUrl: String,
});

const Link = mongoose.model<LinkSchema>("Link", linkSchema);
export default Link;
