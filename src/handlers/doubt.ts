import venom from "venom-bot";
import Doubt from "../models/doubt.model";
import sendMessage from "../utils/sendMessage";

const doubt = async (
  client: venom.Whatsapp,
  args: string[],
  message: venom.Message,
  group: string
) => {
  if (!args || args.length < 1) return;
  const doubt = new Doubt({
    question: args.join(" "),
    askedBy: message.sender.pushname,
  });
  try {
    await doubt.save();
    await sendMessage(client, group, `Doubt added, token: ${doubt.token}`);
  } catch (err) {
    console.log(err);
    return;
  }
};

export default doubt;
