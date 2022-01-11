import venom from "venom-bot";

const tagAll = (client: venom.Whatsapp, message: venom.Message) => {
  let members = [];
  let msg: any;
  if (!message.chat.groupMetadata) return;
  client
    // previous thing was message.chat.groupMetadata.id
    // changed due to ts error
    .getGroupMembersIds(message.chat.groupMetadata)
    .then((res) => {
      res.forEach((member) => {
        members.push(member.user.toString());
        msg += `@${member.user.toString()}\n`;
      });
      client
        .sendMentioned(message.from, msg, members)
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export default tagAll;
