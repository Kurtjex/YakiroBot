module.exports.config = {
  name: "offbot",
  role: 1,
  description: "offbot",
  usage: "offbot",
  author: "kurt",
        };
module.exports.onRun = ({event, api}) =>api.sendMessage("the bot is now turning off.",event.threadID, () =>process.exit(0))