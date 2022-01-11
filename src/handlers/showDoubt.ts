import venom from "venom-bot";
import Doubt from "../models/doubt.model";
import sendMessage from "../utils/sendMessage";

const showdoubt = async (
  client: venom.Whatsapp,
  group: string,
  args: string[]
) => {
  const doubtToken = args[0];
  try {
    const doubt = await Doubt.findOne({ token: doubtToken });
    if (!doubt) {
      await sendMessage(client, group, "No doubt found");
      return;
    }
    await sendMessage(
      client,
      group,
      `Token: ${doubt.token}\nQuestion: ${doubt.question}\nAsked by: ${doubt.askedBy}\n\n`
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

export default showdoubt;
