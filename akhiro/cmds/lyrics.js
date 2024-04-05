const axios = require('axios');
const fs = require("fs");

module.exports = {
  config: {
    name: "lyrics",
    aliases: ["song"],
    author: "Mark | Kurt",
    description: "Get lyrics for a song",
    usage: "lyrics [song name]"
  },
  onRun: async function({ api, event, args }) {
    const t = args.join(" ");

    if (!t) return api.sendMessage("The title of the song is missing.", event.threadID, event.messageID);

    try {
      const r = await axios.get('https://lyrist.vercel.app/api/' + t);
      const { image, lyrics, artist, title } = r.data;

      let ly = __dirname + "/cache/lyrics.png";
      let suc = (await axios.get(image, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(ly, Buffer.from(suc, "utf-8"));
      let img = fs.createReadStream(ly);

      api.setMessageReaction("🎼", event.messageID, (err) => {}, true);

      return api.sendMessage({
        body: `Title: ${title}
Artist: ${artist}

𖢨°•°•——[ LYRICS ]——•°•°𖢨
${lyrics}
𖢨°•°•——[ LYRICS ]——•°•°𖢨`,
        attachment: img
      }, event.threadID, () => fs.unlinkSync(ly), event.messageID);
    } catch (a) {
      api.setMessageReaction("😿", event.messageID, (err) => {}, true);

      return api.sendMessage(a.message, event.threadID, event.messageID);
    }
  }
};