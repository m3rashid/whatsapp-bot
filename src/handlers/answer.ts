import venom from "venom-bot";
import Doubt from "../models/doubt.model";
import sendMessage from "../utils/sendMessage";

const answer = async (
  args: string[],
  client: venom.Whatsapp,
  group: string,
  message: venom.Message
) => {
  if (!args || args.length < 1) return;
  const doubtToken = args[0];
  const doubtAnswer = args.slice(1).join(" ");
  try {
    const doubt = await Doubt.findOne({ token: doubtToken });
    if (!doubt) {
      await sendMessage(client, group, "No doubt found");
      return;
    }
    doubt.answer = doubtAnswer;
    doubt.answered = true;
    doubt.answeredBy = message.sender.pushname;
    await doubt.save();
    await sendMessage(client, group, "Answer added");
  } catch (err) {
    console.log(err);
    return;
  }
};

export default answer;
