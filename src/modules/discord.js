import config from '../config/development'

export function getDiscordUrl () {
  let url = `https://discordapp.com/oauth2/authorize?&client_id=${config.discord.clientId}&scope=identify&response_type=code`
  return url
}
