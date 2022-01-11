import venom from "venom-bot";

const sendMessage = async (
  client: venom.Whatsapp,
  chatId: string,
  message: string
) => {
  try {
    await client.sendText(chatId, message);
  } catch (err) {
    console.log(err);
  }
};

export default sendMessage;
