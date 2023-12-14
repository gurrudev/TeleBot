const bodyParser = require("body-parser");
const express = require("express");
const { Telegraf } = require("telegraf");
require("dotenv").config();
const responses = require("./helper/responses");
const router = require("./router");
const generateProjectTemplate = require("./templates/projectTemplate");
const projectTemplateDetails = require("./helper/projectDetails");
const logger = require("./logs/logger");
const botlogs = require("./helper/botLogs");
const { formatDate, formatTime } = require("./helper/dateAndTime");

const bot = new Telegraf(process.env.API_KEY);

const app = express();

app.use(bodyParser.json());

router.routes();

////////////////    Method for invoking start command  - Start //////////////
bot.start((ctx) => {
    try {
        const start_msg1 =
            `👋 Hey I'm *ASHUTOSH!* 🤖\n\nI'm here to help you explore my portfolio and answer any questions you might have about my work and skills. Feel free to ask about my projects, skills, contact information, or anything else you'd like to know.` +
            `\n\n_To get started,_ \n\nyou can try commands like... \n\n/projects - _Know about my projects._ \n/skills - _Know about my skills._ \n/resume - _Download my resume._ \n/contact - _To contact me._ \n\nIf you need assistance, just type _'help'_ or click on /help. Enjoy exploring!`;

        const bot_response = `Bot responded with "/start" template message to ${ctx.message.message_id}`;
        const formattedDate = formatDate(ctx.message.date);
        const formattedTime = formatTime(ctx.message.date);
        // try {
        bot.telegram.sendMessage(ctx.chat.id, start_msg1, {
            parse_mode: "Markdown",
        });

        const logs = botlogs(
            ctx.message.message_id,
            ctx.message.from,
            ctx.message.text,
            bot_response,
            ctx.message.date,
            formattedDate,
            formattedTime
        );

        logger.info(logs)

    } catch (error) {
        console.log(error);
    }
});
////////////////    Method for invoking start command  - End //////////////

/////////////////////    Projects Section  - Start  ///////////////////////////////
bot.hears("/projects", async (ctx) => {
    try {
        let message = `*👨‍💻 Here are some of my projects 🛠️*\n\nFeel free to ask for more details about any specific project by mentioning its name!`;

        const bot_response = `Bot responded with "/projects" template message to ${ctx.message.message_id}`;
        const formattedDate = formatDate(ctx.message.date);
        const formattedTime = formatTime(ctx.message.date);

        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Crypto Tracker",
                            callback_data: "crypto_tracker",
                        },
                        {
                            text: "Netflix Clone",
                            callback_data: "netflix_clone",
                        },
                        {
                            text: "Whatsapp Bot",
                            callback_data: "whatsapp_bot",
                        },
                    ],
                    [
                        {
                            text: "Warehouse Inventory",
                            callback_data: "warehouse_inventory",
                        },
                    ],
                    [
                        {
                            text: "Telegram Bot",
                            callback_data: "telegram_bot",
                        },
                        {
                            text: "Hope Harbor",
                            callback_data: "hope_harbor",
                        },
                        {
                            text: "Blog Website",
                            callback_data: "blog_site",
                        },
                    ],
                ],
            },
            reply_to_message_id: ctx.message.message_id,
            parse_mode: "Markdown",
        });

        const logs = botlogs(
            ctx.message.message_id,
            ctx.message.from,
            ctx.message.text,
            bot_response,
            ctx.message.date,
            formattedDate,
            formattedTime
        );

        logger.info(logs)
    } catch (error) {
        console.log(error)
    }
});

projectTemplateDetails.map(project => {
    // Accessing the first property name and printing its title
    const project_title = Object.keys(project)[0];
    const project_data = project[project_title];
    // console.log(project_data); // Printing the first word of the title

    bot.action(project_title, async (ctx) => {
        try {
            // Data for the template
            const templateData = project_data;
            const bot_response = `Bot responded to the "callback_query: data {${project_title}}" with "${project_title}" template message to message_id : ${ctx.update.callback_query.message.message_id}`;
            const formattedDate = formatDate(ctx.update.callback_query.message.date);
            const formattedTime = formatTime(ctx.update.callback_query.message.date);

            // Generate message using the template
            const message = generateProjectTemplate(templateData);

            const logs = botlogs(
                ctx.update.callback_query.message.message_id,
                ctx.update.callback_query.from,
                ctx.update.callback_query.data,
                bot_response,
                ctx.update.callback_query.message.date,
                formattedDate,
                formattedTime
            );

            ctx.telegram.sendPhoto(ctx.chat.id, templateData.img_link, {
                caption: message,
                parse_mode: "Markdown",
            });

            logger.info(logs)
            // console.log(logs)
        } catch (error) {
            console.log(error)
        }
    });
});
/////////////////////    Projects Section  - End  ///////////////////////////////

/////////////////////    Resume Section  - Start  ///////////////////////////////
bot.command("resume", (ctx, next) => {
    let doc_msg =
        "📄 Here's my resume—detailed with my skills, experience, and qualifications. Take a look and explore my professional journey! 🚀";
    let doc_link = "https://ashutosh-pawar.me/ASHUTOSH's_RESUME.pdf";

    bot.telegram.sendDocument(ctx.chat.id, doc_link, {
        caption: doc_msg,
        parse_mode: "Markdown",
    });
});
/////////////////////    Resume Section  - end  ///////////////////////////////

/////////////////////    Skills Section  - Start  /////////////////////////////////
bot.hears("/skills", (ctx, next) => {
    const skillsList = [
        "🌐 *Front-end:*  HTML, CSS, JavaScript",
        "💻 *Frameworks:*  ReactJS",
        "📱 *Responsive design*",
        "⚙️ *Back-end:*  PHP, NodeJS, REST API, Java",
        "🗃️ *Databases:*  MySQL, MongoDB",
        "🔗 *Version control:*  Git, GitHub",
        "🎨 *UI/UX design*",
    ];

    const skillsCaption = "*Here are some of my skills:*";
    const lastmsg = `Currently I'm learning _TypeScript_, _Solidity_ and _Angular_`;
    const skillsText = skillsList.join("\n");

    const message = `${skillsCaption}\n\n${skillsText}\n\n${lastmsg}`;

    bot.telegram.sendMessage(ctx.chat.id, message, { parse_mode: "Markdown" });
});
/////////////////////    Skills Section  - End     /////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////

//method for sending location
// bot.hears("/location", async (ctx, next) => {
//     let location_msg = "Office Location";
//     let latitude = 19.11650922426617;
//     let longitude = 72.85741558019201;
//     await bot.telegram.sendMessage(ctx.chat.id, location_msg);
//     await bot.telegram.sendLocation(ctx.chat.id, latitude, longitude);
//     let bot_location_resp_logs =
//         "bot_reply_to_message_id: " +
//         ctx.message.message_id +
//         "\n{ \n" +
//         " location_msg: " +
//         location_msg +
//         "\n latitude: " +
//         latitude +
//         "\n longitude: " +
//         longitude +
//         " \n \n}";

//     // logger.info(ctx.message);
//     // logger.info(bot_location_resp_logs);
//     console.log(ctx.message);
//     console.log(bot_location_resp_logs);
// });

////////////////////////////////////////////////////////////////////////////////////////

// bot.hears("/video", async (ctx, next) => {
//     // console.log(ctx.from)
//     let vdo_msg = "hello";
//     let vdo_link = "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/kx2d2Jf/extreme-close-up-view-of-clock-at-the-last-3-seconds-to-midnight_ejojcmqf__cf53370888a04095fe9a9410b8099739__P360.mp4";
//     await bot.telegram.sendVideo(ctx.chat.id, vdo_link);
//     let bot_vdo_resp_logs ="bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n vdo_msg: " + vdo_msg + "\n vdo_link: " + vdo_link + " \n \n}";

//     console.log(ctx.message);
//     console.log(bot_vdo_resp_logs);
// });

////////////////////////////////////////////////////////////////////////////////////////

//method to share contact
// bot.hears("/contact", async (ctx, next) => {
//     let contactName = "ASHUTOSH PAWAR";
//     let contactNumber = "+91 9000000009";
//     // console.log(ctx.from)
//     await bot.telegram.sendContact(ctx.chat.id, contactNumber, contactName);

//     console.log(ctx.message);

// });


////////////////////////////   Help Section - Start   /////////////////////////////////////////

//method for help
bot.hears("/help", async (ctx) => {
    // console.log(ctx.from)
    let hlp_msg = `For more information please visit our website`;
    let btn_txt = "Visit";
    let url_ = "https://ashutosh-pawar.me";
    await bot.telegram.sendMessage(ctx.chat.id, hlp_msg, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: btn_txt,
                        url: url_,
                    },
                ],
            ],
        },
    });
    
    console.log(ctx.message);
});
////////////////////////////   Help Section - End   /////////////////////////////////////////

/////////////////////////////   Text Section - Start    /////////////////////////////////////

// Middleware for handling text messages
bot.on("text", (ctx) => {
    const message = ctx.message.text.toLowerCase();

    // Check if any keyword matches the message
    for (const keyword in responses) {
        if (message.includes(keyword)) {
            const possibleReplies = responses[keyword];
            const randomIndex = Math.floor(Math.random() * possibleReplies.length);
            const randomResponse = possibleReplies[randomIndex];

            ctx.reply(randomResponse);
            return;
        }
    }

    // If no keyword matches, respond with a default message
    ctx.reply("I'm sorry, I didn't understand that.", {
        reply_to_message_id: ctx.message.message_id,
    });
});
////////////////////////   Text Section - End    ////////////////////////////////////

//method to start the bot
bot.launch();
