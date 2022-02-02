const TelegramApi = require('node-telegram-bot-api')

const { gameOptions, againOptions } = require('./options.js');

const tocen = '5196029669:AAHuAUKe9BTmTY28brPj4R4H3jLyY_ikVD0';

const bot = new TelegramApi(tocen, {polling: true})

const chats = {};


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сыграем в игру? Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать! Хи-хи');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Поехали! Выбирай:', gameOptions);
}


const start = async() => {
    
bot.setMyCommands([
    {command: '/start', description: 'Приведствие'},
    {command: '/info', description: 'Получить информацию'},
    {command: '/game', description: 'Поиграть'}
 ])
 
 bot.on('message',async msg => {
     const text = msg.text;
     const chatId = msg.chat.id;
 
     if (text === '/start') {
         if (msg.from.last_name === undefined) {
             return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот созданный Agent Angel! Тебя зовут ${msg.from.first_name}?)))`);
         } else {
     return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот созданный Agent Angel! Тебя зовут ${msg.from.first_name} ${msg.from.last_name}?)))`);
         }
     }
 
     if (text === '/info') {
         return bot.sendMessage(chatId, `Что хочешь узнать, ${msg.from.first_name}?`);
     }

     if (text === '/game') {
      return startGame(chatId);
     }
     return bot.sendMessage(chatId, 'Ты норм? Я тебя не понимаю. А ну-ка давай-ка еще раз)')
 })


 bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
        startGame(chatId);
    }
    if (data === chats[chatId]) {
        return await bot.sendMessage(chatId, `Мои поздравления! Ты отгадал! Па-па ра пам-пам, это цифра ${chats[chatId]} )`, againOptions);
    } else {
        return bot.sendMessage(chatId, `Не верно, и что теперь делать? Ведь я загадывала цифру ${chats[chatId]}...`, againOptions);
    }
    
 })

}


start();

