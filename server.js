const config = {
  logFilename: './log.txt',
  clientId: '302772624964976640',
  secret: 'zLAfgngsXcRTGdKvl8ODZ3-nIyeCYP3g',
  wykopRedirectUrl: 'https://psychobaza.xyz/#/weryfikacja',
  redirectDiscordSuccessUrl: function (discordNick) {
    let url = `https://psychobaza.xyz/#/weryfikacja?discord_nick=${discordNick}`;
    return url;
  },
  redirectDiscordErrorUrl: 'https://psychobaza.xyz/#/weryfikacja?discord_error=true',
  redirectWykopErrorUrl: 'https://psychobaza.xyz/#/weryfikacja?wykop_error=true',
  botWeryfikatorToken: 'MzAyNzcyNjI0OTY0OTc2NjQw.C_yuog.q48IPdlUIRzOdiZVMYJn4TWxNkU',
  discordZweryfikowaniRoleId: '314041761213317120',
  discordWeryfikacjaGuildId: '201688632040357888',
  discordLogChannelId: '313418687904219137'
};

const fs = require('fs');
const moment = require('moment');

function saveLog(wykopNick, discordNick, ip) {
  let timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let message = `[${timestamp}] ${wykopNick} ${discordNick} ${ip}` + "\n";
  fs.appendFile(config.logFilename, message, function (err) {

  });
}

const Discord = require('discord.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: '&*gyUYGbsbbBBBBBBASDASDASDASDBBBBBB&H*YUUI)(*UHUUgyuYuiKk4Mk    UIBUByb    YUYUG&&^',
  saveUninitialized: true,
  resave: false,
  cookie: {
    path: "/",
  }
}));

let discordApiInstance = require('axios').create({
  baseURL: 'https://discordapp.com/api/'
});

const credentials = {
  client: {
    id: config.clientId,
    secret: config.secret
  },
  auth: {
    tokenHost: 'https://discordapp.com',
    tokenPath: '/api/oauth2/token'
  }
};
const discordOAuth2 = require('simple-oauth2').create(credentials);
const discordBot = new Discord.Client();
const discordBotLoginPromise = discordBot.login(config.botWeryfikatorToken);

let logChannel;
let weryfikacjaChannel;

app.get('/connect/wykop', (req, res) => {
  let buffer = new Buffer(req.query.connectData, 'base64');
  let data = buffer.toString();
  req.session.wykopData = data;

  try {
    let wykopLogin = (JSON.parse(req.session.wykopData)).login;
    logChannel.sendMessage(`Wykopowicz ${wykopLogin} zalogował się.`);
  } catch (ex) {

  }

  res.redirect(`${config.wykopRedirectUrl}?connectData=` + req.query.connectData);
});

app.get('/connect/discord', (req, res) => {
  const tokenConfig = {
    code: req.param('code'),
    redirect_uri: 'http://psychobaza.xyz:2052/connect/discord'
  };
  if (!req.session.wykopData) {
    return res.redirect(config.redirectWykopErrorUrl)
  }
  let wykopLogin = (JSON.parse(req.session.wykopData)).login;
  discordOAuth2.authorizationCode.getToken(tokenConfig)
    .then((result) => {
      const token = discordOAuth2.accessToken.create(result);
      discordApiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token.token.access_token;
      discordApiInstance.get('/users/@me').then((response) => {
        discordBotLoginPromise.then(() => {
          let member = weryfikacjaChannel.members.get(response.data.id);
          member.addRole(config.discordZweryfikowaniRoleId).then(() => {
            weryfikacjaChannel.sendMessage(`:white_check_mark: Wykopowicz **${wykopLogin}** zweryfikował konto **${response.data.username}**.`);
            saveLog(wykopLogin, response.data.username, req.connection.remoteAddress);
            res.redirect(config.redirectDiscordSuccessUrl(response.data.username));
          }).catch((error) => {
            console.log(error);
            logChannel.sendMessage(`Can't add role to user wykop:${wykopLogin} discord:${response.data.username}.`);
            res.redirect(config.redirectDiscordErrorUrl);
          });
        }).catch((error) => {
          console.log(error);
          res.redirect(config.redirectDiscordErrorUrl);
        });
      }).catch((error) => {
        console.log(error);
        logChannel.sendMessage(`Can't fetch discord user data for user wykop:${wykopLogin}.`);
        res.redirect(config.redirectDiscordErrorUrl);
      });
    })
    .catch((error) => {
      console.log(error);
      res.redirect(config.redirectDiscordErrorUrl);
    });
});

app.get('/api/discordUsers', (req, res) => {
  let guild = discordBot.guilds.get(config.discordWeryfikacjaGuildId);
  let members = guild.members.array();
  let result = [];
  members.forEach((obj) => {
    result.push({
      nick: obj.user.username
    });
  });
  result.sort((a, b) => {
    return a.nick.toLowerCase() > b.nick.toLowerCase();
  });
  res.send(result);
});

discordBotLoginPromise.then(() => {
  logChannel = discordBot.channels.get(config.discordLogChannelId);
  weryfikacjaChannel = discordBot.channels.get(config.discordWeryfikacjaGuildId);
  app.listen(2052, () => {
    console.log(`Server started at port 2052.`);
    logChannel.sendMessage(`Server up and running.`);
  });

  // messages loggin
  discordBot.on('message', (message) => {
    if (message.channel.name === 'random') {
      processMessage(message.content, message.author.username);
    }
  });
});

let messages = {};
let lastNick = false;

function writeMessage(message) {
  message += "\n";
  let timestamp = moment(new Date()).format("YYYY-MM-DD");
  fs.appendFile('./AI/' + timestamp + '.txt', message, (err) => {

  });
}

function processMessage(message, nick) {
  if (!messages[nick]) {
    messages[nick] = '';
  }

  message = message.replace(/<([@:0-9a-zA-Z]+)>/g, '').replace(/\s+/g, ' ').replace(/\S+/g, ' ');
  message = message.replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g, '');

  if (lastNick === false) {
    lastNick = nick;
  } else {
    if (lastNick !== nick) {
      messages[lastNick] = messages[lastNick].trim();
      if(messages[lastNick]) {
        writeMessage(messages[lastNick]);
      }
      messages[lastNick] = '';
      lastNick = nick;
    }
    messages[nick] += ' ' + message;
  }
}