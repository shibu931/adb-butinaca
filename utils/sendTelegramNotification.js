import axios from 'axios';

export const sendTelegramNotification = async (message) => {
  try {
    const apiUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    await axios.post(apiUrl, {
      chat_id: process.env.CHAT_ID,
      text: message,
    });
  } catch (error) {
    console.error('Telegram Notification Error:', error.message);
  }
};
