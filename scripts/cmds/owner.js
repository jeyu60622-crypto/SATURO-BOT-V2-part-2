const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    aliases: ["info"],
    version: "1.3.0",
    author: "Anik Islam Sadik",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : 𝐇𝐞𝐧𝐫𝐲 
│ 🦋 Nɪᴄᴋ       : ᴄʜᴜᴄᴋʏ 
│ 🎂 Aɢᴇ        : 𝟭𝟴
│ 💘 Rᴇʟᴀᴛɪᴏɴ : 𝕊𝕚𝕟𝕘𝕝𝕖
│ 🎓 Pʀᴏғᴇssɪᴏɴ : 𝗦𝘁𝘂𝗱𝗲𝗻𝘁
│ 📚 Eᴅᴜᴄᴀᴛɪᴏɴ : 𝕃𝕒𝕤𝕥 𝕘𝕣𝕒𝕕𝕖
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : 𝕊𝕠𝕦𝕥𝕙 𝕒𝕗𝕣𝕚𝕔𝕒
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  : https://www.facebook.com/profile.php?id=100068914723350
│ 💬 Messenger: ɪᴅ:100068914723350
│ 📞 WhatsApp  : +27 769124957
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/gyVwtoC.gif";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send)
  }
};
