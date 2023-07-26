const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

// You might want to store this in an environment variable or something
const token = process.env.DISCORD_TOKEN;

const discordIdtoTime = (discordId) => {
  const EPOCH_OFFSET = 1420070400000; // Discord epoch (January 1, 2015)
  // Convert the snowflake ID to a 64-bit integer
  const discordInt = BigInt(discordId);
  // Get the timestamp portion of the snowflake (remove the worker, process, increment bits)
  const timestampBits = discordInt >> BigInt(22);
  // Add the Discord epoch offset to get the actual timestamp
  const timestamp = Number(timestampBits + BigInt(EPOCH_OFFSET));
  // Convert to a Date object
  const date = new Date(timestamp);
  return date;
};

const verifyDiscordId = (id) => {
  if (id.length !== 18) return false;
  return true;
};

const getGuild = async (id) => {
  const response = await axios(
    `https://discord.com/api/v9/invites/${id}?with_counts=true&with_expiration=true`
  );
  if (response.status !== 200) return { message: "Invalid ID" };

  let urlAvatar = "";
  if (response.data.guild.icon)
    urlAvatar = `https://cdn.discordapp.com/icons/${response.data.guild.id}/${response.data.guild.icon}.webp`;
  else urlAvatar = `https://cdn.discordapp.com/embed/avatars/0.png`;
  return {
    type: "guild",
    name: response.data.guild.name,
    id: response.data.guild.id,
    members: response.data.approximate_member_count,
    online: response.data.approximate_presence_count,
    description: response.data.guild.description,
    urlAvatar,
    status: response.status,
    url: `https://discord.gg/${id}`,
  };
};

const getUserData = async (id) => {
  const response = await axios(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${token}`,
    },
  });
  if (response.status !== 200) return { message: "Invalid ID" };
  let urlAvatar = "";
  if (response.data.avatar)
    urlAvatar = `https://cdn.discordapp.com/avatars/${id}/${response.data.avatar}.png`;
  else
    urlAvatar = `https://cdn.discordapp.com/embed/avatars/${response.data
      .discriminator % 5}.png`;
  const created_time = discordIdtoTime(id);
  return {
    type: "user",
    username: response.data.username,
    id: response.data.id,
    color: response.data.banner_color,
    created_time,
    urlAvatar,
    status: response.status,
  };
};

app.post("/discord", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "No ID or URL" });
  let id = "";
  let data = {};
  if (url.includes("https://discord.gg/")) {
    id = url.split("https://discord.gg/")[1];
    data = await getGuild(id);
  } else if (verifyDiscordId(url)) {
    id = url;
    data = await getUserData(id);
  } else {
    return res.status(400).json({ message: "Invalid ID or URL" });
  }
  if (data.status !== 200)
    return res.status(400).json({ message: "Invalid ID" });

  res.json(data);
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running in port ${process.env.PORT || 3000}`)
);
