const config = {
  clientId: '',
  secret: ''
};

const express = require('express');
const app = express();
const axios = require('axios');
var axiosInstance = axios.create({
  baseURL: 'https://discordapp.com/'
});

const credentials = {
  client: {
    id: '315526419742588929',
    secret: '6zOodg4VS7CZ5itCak-X_rcnU4VVZev4'
  },
  auth: {
    tokenHost: 'https://discordapp.com',
    tokenPath: '/api/oauth2/token'
  }
};
const oauth2 = require('simple-oauth2').create(credentials);

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});

app.get('/connect/discord', (req, res) => {
  const tokenConfig = {
    code: req.param('code'),
    redirect_uri: 'http://localhost:3000/connect/discord'
  };
  console.log(req.param('code'));
  oauth2.authorizationCode.getToken(tokenConfig)
    .then((result) => {
      const token = oauth2.accessToken.create(result);


// Alter defaults after instance has been created
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token.token.access_token;

      axiosInstance.get('/api/users/@me').then((response) => {
        console.log(response);
      })
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/callback', (req, res) => {

})

app.listen(3000, () => {
  console.log(`Server started at port 3000.`);
});