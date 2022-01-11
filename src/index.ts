import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import venom from "venom-bot";
import menu from "./utils/menu";
import sendMessage from "./utils/sendMessage";

// handlers
import tagAll from "./handlers/tagAll";
import addLink from "./handlers/addLink";
import showLinks from "./handlers/showLinks";
import doubt from "./handlers/doubt";
import alldoubts from "./handlers/allDoubts";
import showdoubt from "./handlers/showDoubt";
import answer from "./handlers/answer";

const connect = async () => {
  if (process.env.NODE_ENV === "prod") {
    // add a production database connection here
    await mongoose.connect("mongodb://localhost/venom");
  } else {
    await mongoose.connect("mongodb://localhost/venom");
  }
};

const group = process.env.TESTING_GROUP;
const initial = "/";

const start = (client: venom.Whatsapp) => {
  client.onMessage(async (message) => {
    if (message.chatId !== group || !message.body.startsWith(initial)) return;

    let arr = message.body.split(" ");
    const command = arr[0].split(initial)[1];
    const args = arr.slice(1);

    switch (command) {
      case "help":
        await sendMessage(client, group, menu);
        break;

      case "tagall":
        tagAll(client, message);
        break;

      case "addlink":
        await addLink(args, client, group);
        break;

      case "showlinks":
        await showLinks(client, group);
        break;

      case "doubt":
        await doubt(client, args, message, group);
        break;

      case "alldoubts":
        await alldoubts(client, group);
        break;

      case "showdoubt":
        showdoubt(client, group, args);
        break;

      case "answer":
        await answer(args, client, group, message);
        break;

      default:
        await sendMessage(client, group, "Unknown command");
        break;
    }
  });
};

const main = async () => {
  try {
    await connect();
    const client = await venom.create({
      session: "Testing",
      multidevice: false,
    });
    start(client);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

main();
