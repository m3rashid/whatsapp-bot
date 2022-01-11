import venom from "venom-bot";
import Link from "../models/link.model";
import sendMessage from "../utils/sendMessage";

const showLinks = async (client: venom.Whatsapp, group: string) => {
  try {
    const links = await Link.find({});
    if (!links || links.length < 1) {
      await sendMessage(client, group, "No links found");
      return;
    }
    let msg: string = "";
    links.forEach((link) => {
      msg += `${link.url}\n`;
    });
    await sendMessage(client, group, msg);
  } catch (err) {
    console.log(err);
    return;
  }
};

export default showLinks;
