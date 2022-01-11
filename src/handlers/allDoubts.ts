import venom from "venom-bot";
import Doubt from "../models/doubt.model";
import sendMessage from "../utils/sendMessage";

const alldoubts = async (client: venom.Whatsapp, group: string) => {
  try {
    const doubts = await Doubt.find({ answered: false });
    if (!doubts || doubts.length < 1) {
      await sendMessage(client, group, "No unanswered doubts");
      return;
    }
    let msg: string = "";
    doubts.forEach((doubt) => {
      msg += `Token: ${doubt.token}\nQuestion: ${doubt.question}\nAsked by: ${doubt.askedBy}\n\n`;
    });
    await sendMessage(client, group, msg);
  } catch (err) {
    console.log(err);
    return;
  }
};

export default alldoubts;
