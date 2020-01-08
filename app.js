'use strict';

const fs = require('fs');
const Telegraf = require('telegraf');
const mongoose = require('mongoose');

const telegramConfigs = require(`${__dirname}/telegram.json`);
const messageTemplate = require(`${__dirname}/message_template.js`);

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.telegram.setWebhook(process.env.WEBHOOK_URL);

require(`${__dirname}/mongo_db.js`);
const userModel = mongoose.model('User');
const messageModel = mongoose.model('Message');



const getCurrentDate = () => {
  let date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return new Date(`${year}-${month}-${day}`);
};



const incrementMessageCount = async (chat_id, type) => {
  try {
    const date = await getCurrentDate();

    let data = {
      date: date,
      $inc: {
        total_count: 1,
      }
    };

    data['$inc'][type] = 1;

    await messageModel.findOneAndUpdate({ chat_id: chat_id }, data, { upsert: true, setDefaultsOnInsert: true });
  } catch (err) {
    console.log(err.message);
  }
};



const getUserInfo = async (userId) => {
  try {
    return userModel.findOne({ id: userId });
  } catch (error) {
    return 'Currently cannot get User Info';
  }
};



const getCurrentDateStatistics = async (chat_id) => {
  const date = await getCurrentDate();
  const statistics = await messageModel.findOne({ chat_id: chat_id });
  return statistics;
};



bot.start(async (ctx) => {
  const userObject = {
    id: ctx.update.message.from.id,
    is_bot: ctx.update.message.from.is_bot,
    first_name: ctx.update.message.from.first_name,
    last_name: ctx.update.message.from.last_name,
    username: ctx.update.message.from.username,
    language_code: ctx.update.message.from.language_code,
    date: new Date(ctx.update.message.date * 1000),
  };

  const query = {
    id: userObject.id,
  }

  const option = {
    upsert: true,
    setDefaultsOnInsert: true
  }

  await userModel.findOneAndUpdate(query, userObject, option);
  await ctx.replyWithHTML(messageTemplate.startMessage(userObject));
});



bot.command('ver', async (ctx) => {
  const commandArguments = ctx.update.message.text.split(' ');

  if (commandArguments[1] === telegramConfigs.verification_code) {
    await userModel.findOneAndUpdate({ id: ctx.update.message.from.id }, { $set: { send_msg: true } }, { upsert: false });
    await ctx.replyWithHTML(messageTemplate.successMessage());
  } else {
    await ctx.replyWithHTML(messageTemplate.failMessage());
  }
});



bot.command('stats', async (ctx) => {
  const commandArguments = ctx.update.message.text.split(' ');

  // const result = await getCurrentDateStatistics(ctx.update.message.chat.id);
  // const message = await messageTemplate.composeStatistics(result);
  await ctx.replyWithHTML('message');
});



bot.help((ctx) => ctx.replyWithHTML(messageTemplate.heplMessage()));



bot.command('info', async (ctx) => {
  const userInfo = await getUserInfo(ctx.update.message.from.id);
  const message = messageTemplate.userInfoMessage(userInfo);
  await ctx.replyWithHTML(message);
});



bot.on('text', async (ctx) => {
  if (ctx.update.message.text !== '/stats') {
    await incrementMessageCount(ctx.update.message.chat.id, 'text');
  }
});

bot.on('audio', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'audio');
});

bot.on('document', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'document');
});

bot.on('photo', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'photo');
});

bot.on('sticker', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'sticker');
});

bot.on('video', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'video');
});

bot.on('voice', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'voice');
});

bot.on('contact', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'contact');
});

bot.on('location', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'location');
});

bot.on('venue', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'venue');
});

bot.on('forward', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'forward');
});

bot.on('pinned_message', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'pinned_message');
  await ctx.replyWithHTML(messageTemplate.pinnedMessage());
});

bot.on('game', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'game');
});

bot.on('video_note', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'video_note')
});

bot.on('poll', async (ctx) => {
  await incrementMessageCount(ctx.update.message.chat.id, 'poll');
  const stream = await fs.createReadStream(`${__dirname}/files/audio/polling.mp3`);
  await ctx.replyWithAudio({ source: stream, filename: 'GOLOSOVANIE' });
});



bot.on('new_chat_members', async (ctx) => {
  // ctx.update.message.new_chat_participant
  await ctx.replyWithHTML(messageTemplate.newChatMember(ctx.update.message.new_chat_member));
});

bot.on('left_chat_member', async (ctx) => { // ?
  await ctx.replyWithHTML(messageTemplate.leftChatMember(ctx.update.message.left_chat_member));
});

bot.on('new_chat_title', async (ctx) => {
  await ctx.replyWithHTML(messageTemplate.newChatTitle(ctx.update.message.new_chat_title));
});

bot.on('new_chat_photo', async (ctx) => {
  await ctx.replyWithHTML(messageTemplate.newChatPhoto());
});

bot.on('delete_chat_photo', async (ctx) => {
  await ctx.replyWithHTML(messageTemplate.deleteChatPhoto());
});

bot.on('connected_website', async (ctx) => {

});

bot.startPolling();
