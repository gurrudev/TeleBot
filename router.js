const express = require("express");

const route = express();

const routes = () => {
  route.get("/", (req, res) => {
    res.send(`
        <div style="text-align: center; margin-top: 100px;">
            <h1 style="font-family: 'Arial Black', sans-serif; color: #FF6348; text-shadow: 2px 2px 4px #000000; transform: rotate(-3deg); animation: bounce 1s infinite;"><span style="color: #4169E1;">🤖</span>Bot is <span style="color: #32CD32;">Live</span><span style="color: #FFD700;">!</span></h1>
            <p style="font-style: italic; color: #777; font-family: 'Comic Sans MS', cursive;">Start the conversation with our interactive Telegram bot! <a style="text-decoration:none; color:#4169E1;" href="https://t.me/ASHUTOSHPAWARBot">@ASHUTOSHPAWARBot</a></p>
        </div>

        <style>
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
        </style>
    `);
  });

  const PORT = process.env.PORT || 3000;

  route.listen(PORT, () => {
    console.log(`🚀 app is running on port number : ${PORT}`);
  });
};

module.exports = {
  routes,
};