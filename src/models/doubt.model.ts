import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

interface DoubtSchema extends mongoose.Document {
  token: number;
  question: string;
  answered: boolean;
  answer: string;
  askedBy: string;
  answeredBy: string;
}

const doubtSchema = new mongoose.Schema({
  token: Number,
  question: {
    type: String,
    required: true,
  },
  answered: {
    type: Boolean,
    default: false,
  },
  answer: String,
  askedBy: {
    type: String,
    default: "Anonymous",
  },
  answeredBy: {
    type: String,
    default: "Anonymous",
  },
});

doubtSchema.plugin(autoIncrement.plugin, {
  model: "Doubt",
  field: "token",
  startAt: 100,
  incrementBy: 1,
});

const Doubt = mongoose.model<DoubtSchema>("Doubt", doubtSchema);
export default Doubt;
