import {Buffer} from 'buffer/'
import config from '../config/development'

export function getWykopConnectUrl () {
  const domain = config.wykop.apiDomain
  let url = `${domain}user/connect/appkey,${config.wykop.key},`
  url += `redirect,${encodeURIComponent(new Buffer(config.wykop.redirectUrl).toString('base64'))},`
  // url += `secure,${md5(config.wykop.secret + config.wykop.redirectUrl)}`
  url += 'secure,3f1be2a0f5c80fffd1b77baa8bfec954'
  return url
}

export function parseConnectData (str) {
  let b = new Buffer(str, 'base64')
  return b.toString()
}
