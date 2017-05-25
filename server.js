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
  botWeryfikatorToken: 'MzAyNzcyNjI0OTY0OTc2NjQw.C_yuog.q48IPdlUIRzOdiZVMYJn4TWxNkU',
  discordZweryfikowaniRoleId: '314041761213317120',
  discordWeryfikacjaChannelId: '201688632040357888',
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
const app = express();

app.use(cookieParser());
app.use(session({
  secret: 'sessionsecret(*&GyBASyfbfbaubg8BiU6C66^&76C^%TYyHirohgjoiorhgoiuehrguerhgirhe',
  resave: false,
  saveUninitialized: true
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
  let json = JSON.parse(data);

  res.cookie('wykopData', JSON.stringify(json), {
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  res.redirect(`${config.wykopRedirectUrl}?connectData=` + req.query.connectData);
});

app.get('/connect/discord', (req, res) => {
  const tokenConfig = {
    code: req.param('code'),
    redirect_uri: 'http://psychobaza.xyz:2052/connect/discord'
  };
  let wykopLogin = JSON.parse(req.cookies.wykopData).login;
  discordOAuth2.authorizationCode.getToken(tokenConfig)
    .then((result) => {
      const token = discordOAuth2.accessToken.create(result);
      discordApiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token.token.access_token;
      discordApiInstance.get('/users/@me').then((response) => {
        discordBotLoginPromise.then(() => {
          let member = weryfikacjaChannel.members.get(response.data.id);
          member.addRole(config.discordZweryfikowaniRoleId).then(() => {
            weryfikacjaChannel.sendMessage(`Wykopowicz ${wykopLogin} zweryfikował konto ${response.data.username}.`);
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

discordBotLoginPromise.then(() => {
  logChannel = discordBot.channels.get(config.discordLogChannelId);
  weryfikacjaChannel = discordBot.channels.get(config.discordWeryfikacjaChannelId);
  app.listen(2052, () => {
    console.log(`Server started at port 3000.`);
    logChannel.sendMessage(`Server up and running.`);
  });
});

