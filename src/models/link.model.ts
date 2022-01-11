import mongoose from "mongoose";

interface LinkDocument extends mongoose.Document {
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

const Link = mongoose.model<LinkDocument>("Link", linkSchema);
export default Link;
