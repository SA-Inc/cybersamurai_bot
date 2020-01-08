'use strict';

const padNum = (num) => num < 10 ? `0${num}` : num;

module.exports.startMessage = (user) => {
  return `Hello <i>${user.first_name} ${user.last_name}</i>`;
}

module.exports.heplMessage = () => {
  return `Help message from Template`;
}

module.exports.successMessage = () => {
  return `Success`;
}

module.exports.failMessage = () => {
  return `Fail`;
}

module.exports.userInfoMessage = (userInfoData) => {
  const { first_name, last_name, language_code, username, date, id, is_bot } = userInfoData;

  return `Id: <code>${id}</code>\nName: <i>${first_name} ${last_name}</i>\nUsername: <i>${username}</i>\nIs Bot: <b>${is_bot}</b>\nLanguage Code: <i>${language_code}</i>\nDate of joining: <i>${padNum(date.getMonth() + 1)}/${padNum(date.getDate())}/${date.getFullYear()}</i>`;
}

module.exports.composeStatistics = async (data) => {
  const date = `${padNum(data.date.getMonth() + 1)}/${padNum(data.date.getDate())}/${data.date.getFullYear()}`;
  const stats = `<b>Statistics</b>\n
<i>Text</i>: ${data.text}
<i>Audio</i>: ${data.audio}
<i>Document</i>: ${data.document}
<i>Photo</i>: ${data.photo}
<i>Sticker</i>: ${data.sticker}
<i>Video</i>: ${data.video}
<i>Voice</i>: ${data.voice}
<i>Contact</i>: ${data.contact}
<i>Location</i>: ${data.location}
<i>Venue</i>: ${data.venue}
<i>Forward</i>: ${data.forward}
<i>Pinned Message</i>: ${data.pinned_message}
<i>Game</i>: ${data.game}
<i>Video Note</i>: ${data.video_note}
<i>Poll</i>: ${data.poll}
<b>Total</b>: ${data.total_count}

Date: <i>${date}</i>
  `;

  return stats;
}

module.exports.pinnedMessage = () => {
  return `It may be interesting`;
}

module.exports.newChatMember = (member) => {
  return `Wellcome <i>${member.first_name}</i>`;
}

module.exports.leftChatMember = (member) => {
  return `Bye <i>${member.first_name}</i>`;
}

module.exports.newChatTitle = (title) => {
  return `"${title}" sounds good =)`;
}

module.exports.newChatPhoto = () => {
  return `Looks good =)`;
}

module.exports.deleteChatPhoto = () => {
  return `Looks good =)`;
}
