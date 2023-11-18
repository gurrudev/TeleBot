
"use strict";

const bodyParser = require("body-parser");
// const winston = require("winston");
// const { MongoDB } = require("winston-mongodb");
const express = require("express");
const { Telegraf, Markup, Context, session } = require("telegraf");
// const { Console } = require("winston/lib/winston/transports");
require("dotenv").config();

const router = require('./router')

// const call = require('./db/dbcalling')

const API_KEY = process.env.API_KEY;
// const MONGO_URL = `mongodb+srv://${process.env.MONGO_URL}@cluster0.io6lfc5.mongodb.net/telegram-logs`;

const  bot = new Telegraf(API_KEY);

//  To save the logs in database
// const logger = winston.createLogger({
//     level: "info",
//     //format: winston.format.json(),
//     transports: [
//         new MongoDB({
//             db: MONGO_URL,
//             options: {
//                 useUnifiedTopology: true,
//                 useNewUrlParser: true,
//             },
//         }),
//     ],
// });

const app = express();
app.use(bodyParser.json());


router.routes();

////////////////////////////////////////////////////////////////////////////////////////

//method for invoking start command
bot.command("/start", async (ctx) => {

    let first_name = ctx.message.chat.first_name
    let last_name = ctx.message.chat.last_name
    // logger.info(ctx.from)

    //to print all values without their key
    let values = [];

    //prints data of the template without comma(,) and Single quote(' ')
    let dataOfStartTemplate = values.join('\n').replace(/'/g, '');

    let start_msg = `Hi, I am your virtual assistant from Gainn Fintech.\n\n` + "Please type the correct keyword\n\n" + dataOfStartTemplate;

    await bot.telegram.sendMessage(ctx.chat.id, start_msg);

    //logger.info(message_id);
    let bot_start_resp_logs ="bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n start_msg: " + start_msg + " \n \n}";

    let sendContact = "Please /share_your_contact number to check your authenticity";

    await bot.telegram.sendMessage(ctx.chat.id, sendContact);
    // logger.info(bot_start_resp_logs);
    console.log(ctx.message);
    console.log(bot_start_resp_logs);
    // console.log(ctx.update.message)
});

////////////////////////////////////////////////////////////////////////////////////////

//method for requesting user's phone number
bot.hears("/share_your_contact", async(ctx) => {

    //ctx.session = {};

    ///// set a timeout for 1 minute////
    // const timeout = 1 * 60 * 1000;
   
    // const timer = setTimeout(() => {
    //       timeover=1;
        
    // }, timeout);
   
    // if (timeover==1) { 
    //     ctx.reply("Your session has expired. Please start a new session using the /start command.");
    //     return;
    // }

    await bot.telegram.sendMessage(ctx.chat.id, {
        text: "Please give us your phone number",
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Share Phone Number",
                        request_contact: true,
                        remove_keyboard: true,
                    },
                ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
            remove_keyboard: true,
        },
    });
});

////////////////////////////////////////////////////////////////////////////////////////

bot.on("contact", async (ctx) => {
//    set a timeout for 1 minute
//    const timeout = 1 * 60 * 1000;
   
//     const timer = setTimeout(() => {
//           timeover=1;
        
//     }, timeout);
   
//     if (timeover==1) {
        
//         ctx.reply("Your session has expired. Please start a new session using the /start command.");
//         return;
//     }

    const phoneNumber = ctx.message.contact.phone_number;
    await ctx.reply(`Thanks for sharing your phone number! ${phoneNumber}`);
    console.log(phoneNumber);
});

////////////////////////////////////////////////////////////////////////////////////////

//method for sending document in pdf format
bot.hears("/document", async (ctx, next) => {
    // const timeout = 1 * 60 * 1000;
   
    // const timer = setTimeout(() => {
    //       timeover=1;
    // }, timeout);
   
    // if (timeover==1) {
        
    //     ctx.reply("Your session has expired. Please start a new session using the /start command.");
    //     return;
    // }

    let doc_msg = "Please find attached document";
    let doc_link = "https://www.orimi.com/pdf-test.pdf";
    await bot.telegram.sendMessage(ctx.chat.id, doc_msg);
    await bot.telegram.sendDocument(ctx.chat.id, doc_link);
    let bot_doc_resp_logs = "bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n doc_msg: " + doc_msg + "\n doc_link: " + doc_link + " \n \n}";
    // logger.info(ctx.message);
    // logger.info(bot_doc_resp_logs);
    console.log(ctx.message);
    console.log(bot_doc_resp_logs);
});

////////////////////////////////////////////////////////////////////////////////////////

bot.hears("/commands", async (ctx) => {
    // const timeout = 1 * 60 * 1000;
    
    // const timer = setTimeout(() => {
    //     timeover=1;
        
    // }, timeout);
   
    // if (timeover==1) {
        
    //     ctx.reply("Your session has expired. Please start a new session using the /start command.");
    //     return;
    // }


    //fetching template data using record
   
    //prints data of the template without comma(,) and Single quote(' ')
    let dataOfStartTemplate = values.join('\n').replace(/'/g, '');

    let cmd_msg = "Please click on the keyword\n\n"+ dataOfStartTemplate
    await bot.telegram.sendMessage(ctx.chat.id, cmd_msg);
});

////////////////////////////////////////////////////////////////////////////////////////

//method for sending image
bot.hears("/image", async (ctx, next) => {
    // const timeout = 1 * 60 * 1000;
   
    // const timer = setTimeout(() => {
    //       timeover=1;
    // }, timeout);
   
    // if (timeover==1) {
    //     ctx.reply("Your session has expired. Please start a new session using the /start command.");
    //     return;
    // }
    // console.log(ctx.from)
    let img_msg = "This is for image";
    let img_link = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    await bot.telegram.sendMessage(ctx.chat.id, img_msg);
    await bot.telegram.sendPhoto(ctx.chat.id, img_link);
    let bot_img_resp_logs ="bot_reply_to_message_id: " +ctx.message.message_id +"\n{ \n img_msg: " +img_msg +"\n img_link: " +img_link +" \n \n}";

    // logger.info(ctx.message);
    // logger.info(bot_img_resp_logs);
    console.log(ctx.message);
    console.log(bot_img_resp_logs);
});

////////////////////////////////////////////////////////////////////////////////////////

//method for sending location
bot.hears("/location", async (ctx, next) => {

    // const timeout = 1 * 60 * 1000;
   
    // const timer = setTimeout(() => {
    //       timeover=1;
    // }, timeout);
   
    // if (timeover==1) {
    //     ctx.reply("Your session has expired. Please start a new session using the /start command.");
    //     return;
    // }

    // console.log(ctx.from)
    let location_msg = "Office Location";
    let latitude = 19.11650922426617;
    let longitude = 72.85741558019201;
    await bot.telegram.sendMessage(ctx.chat.id, location_msg);
    await bot.telegram.sendLocation(ctx.chat.id, latitude, longitude);
    let bot_location_resp_logs = "bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n" + " location_msg: " + location_msg + "\n latitude: " + latitude + "\n longitude: " + longitude + " \n \n}";
    
    // logger.info(ctx.message);
    // logger.info(bot_location_resp_logs);
    console.log(ctx.message);
    console.log(bot_location_resp_logs);
});

////////////////////////////////////////////////////////////////////////////////////////

// bot.hears("/video", async (ctx, next) => {
//     // console.log(ctx.from)
//     let vdo_msg = "";
//     let vdo_link = "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/kx2d2Jf/extreme-close-up-view-of-clock-at-the-last-3-seconds-to-midnight_ejojcmqf__cf53370888a04095fe9a9410b8099739__P360.mp4";
//     await bot.telegram.sendVideo(ctx.chat.id, vdo_link);
//     let bot_vdo_resp_logs ="bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n vdo_msg: " + vdo_msg + "\n vdo_link: " + vdo_link + " \n \n}";


//     logger.info(ctx.message);
//     logger.info(bot_vdo_resp_logs);
//     console.log(ctx.message);
//     console.log(bot_vdo_resp_logs);
// });

////////////////////////////////////////////////////////////////////////////////////////

//method to share contact
bot.hears("/contact", async (ctx, next) => {
    let contactName = "Gainn Fintech";
    let contactNumber = "+91 90990999";
    // console.log(ctx.from)
    await bot.telegram.sendContact(ctx.chat.id, contactNumber, contactName);
    let bot_contact_resp_logs ="bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n contact_name: " +contactName +"\n contact_number: "+contactNumber +" \n \n}";

    // logger.info(ctx.message);
    // logger.info(bot_contact_resp_logs);
    console.log(ctx.message);
    console.log(bot_contact_resp_logs);
});

////////////////////////////////////////////////////////////////////////////////////////

//method for help
bot.hears("/help", async (ctx) => {
    // console.log(ctx.from)
    let hlp_msg = `For more information please visit our website`;
    let btn_txt = "Visit";
    let url_ = "https://epayment.mygainn.com/";
    await bot.telegram.sendMessage(ctx.chat.id, hlp_msg, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: btn_txt,
                        url: url_
                    },
                ],
            ],
        },
    });

    let bot_help_resp_logs = "bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n" + " help_msg: " + hlp_msg + "\n btn_text: " + btn_txt + "\n url: " + url_ + " \n \n}";

    // logger.info(ctx.message);
    // logger.info(bot_help_resp_logs);
    console.log(ctx.message);
    console.log(bot_help_resp_logs);
});

////////////////////////////////////////////////////////////////////////////////////////

// // method for requesting user's location
// bot.hears("location", async(ctx) => {
//     // console.log(ctx.from)
//    await bot.telegram.sendMessage(ctx.chat.id,"Can we access your location?",requestLocationKeyboard);
//     console.log(ctx.message);
// });

// //Object for providing location to the bot
// const requestLocationKeyboard = {
//     reply_markup: {
//         one_time_keyboard: true,
//         keyboard: [
//             [
//                 {
//                     text: "Share My Location",
//                     request_location: true,
//                     one_time_keyboard: true,
//                     remove_keyboard: true,
//                 },
//             ],
//         ],
//         resize_keyboard: true,
//     },
// };


////////////////////////////////////////////////////////////////////////////////////////

bot.hears('/animals', async (ctx) => {
    console.log(ctx.message)
    let animalMessage = `great, here are pictures of animals you would love`;
    //ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
        reply_markup: {
            inline_keyboard: [
                [   
                    {
                        text: "Dog",
                        callback_data: 'dog'
                    },
                    {
                        text: "Cat",
                        callback_data: 'cat'
                    },
                    {
                        text: "Elephent",
                        callback_data: 'elephent'
                    }
                    
                ],
                [
                    {
                        text: "Dragon",
                        callback_data: 'dragon'
                    }
                    
                ],
                [
                    {
                        text: "Horse",
                        callback_data: 'horse'
                    },
                    {
                        text: "Tiger",
                        callback_data: 'tiger'
                    },
                    {
                        text: "Wolf",
                        callback_data: 'wolf'
                    }
                ]
            ]
        }
    })
})

////////////////////////////////////////////////////////////////////////////////////////

//method that returns image of a dog
bot.action('dog', async(ctx) => {

    let img_link = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWXb8yPHcfghL4AazIhs0EQv7oqhMwwDITj_NCQHkeKRzfcH3bhA_gEyBu6sNxGIHNHXI&usqp=CAU';

    await bot.telegram.sendPhoto(ctx.chat.id,img_link )

})

////////////////////////////////////////////////////////////////////////////////////////

//method that returns image of a cat 
bot.action('cat', async(ctx) => {

    let photo_link = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    await bot.telegram.sendPhoto(ctx.chat.id, photo_link)

})

////////////////////////////////////////////////////////////////////////////////////////

//The if else part
bot.on("text", async (ctx) => {
    // console.log(ctx.from)
    const msg_ = ctx.message.text.toLowerCase();
    

    
    if (msg_ == "hey" || msg_ == "hello" || msg_ == "hi" || msg_ == "👋" ) {
        let welcome_mgs = "Hi, there!";
        let welcome_mgs2 = "If you want to start please click on /start";
        await bot.telegram.sendMessage(ctx.chat.id, welcome_mgs);
        await bot.telegram.sendMessage(ctx.chat.id, welcome_mgs2);
        let bot_text_resp_logs ="bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n welcome_msg: " + welcome_mgs + "\n welcome_msg2: " + welcome_mgs2 + " \n \n}";
       
        // logger.info(ctx.message);
        // logger.info(bot_text_resp_logs);
        console.log(ctx.message);
        console.log(bot_text_resp_logs);
    } else if (msg_ == "bye" || msg_ == "byee" || msg_ == "by") {
        let bye_msg = "Bye! have a nice day!";
        await bot.telegram.sendMessage(ctx.chat.id, bye_msg);
        let bot_text_resp_logs = "bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n bye_msg: " + bye_msg + " \n \n}";

        // logger.info(ctx.message);
        // logger.info(bot_text_resp_logs);
        console.log(ctx.message);
        console.log(bot_text_resp_logs);
    } else if (msg_ == '😚') {
        let _msg = "Thank you for your love";
        await bot.telegram.sendMessage(ctx.chat.id, _msg);
        let bot_text_resp_logs = "bot_reply_to_message_id: " + ctx.message.message_id + "\n{ \n _msg: " + _msg + " \n \n}";

        // logger.info(ctx.message);
        // logger.info(bot_text_resp_logs);
        console.log(ctx.message);
        console.log(bot_text_resp_logs);
    } else {
        

        try {
            
                await bot.telegram.sendMessage(ctx.chat.id, `envalid key word`);
           
        } catch (err) {
            console.log(err)
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////

//method to start the bot
bot.launch();

