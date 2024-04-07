module.exports.config = {
  name: "out",
  role: 1,
  author: "Developer",
  description: "Bot leaves the thread",
  usages: "out", //damn please ayusin mo namn mga parts -akhirodev
};

module.exports.onRun = async function({ api, event, args }) {const pogi = "61551488702462";
   if (!pogi.includes(event.senderID))
   return api.sendMessage("gold kaba?", event.threadID, event.messageID);
  try { 
  if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
  if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
