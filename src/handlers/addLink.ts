import venom from "venom-bot";
import ValidateUrl from "../utils/url.validator";
import sendMessage from "../utils/sendMessage";
import Link from "../models/link.model";

const addLink = async (
  args: string[],
  client: venom.Whatsapp,
  group: string
) => {
  if (!args || args.length < 1) return;
  if (!ValidateUrl(args[0])) return;
  // parse the metadata from the link and save those things also
  const link = new Link({
    url: args[0],
  });
  try {
    await link.save();
    await sendMessage(client, group, "Link added");
  } catch (err) {
    console.log(err);
    return;
  }
};

export default addLink;
