import {Buffer} from 'buffer/'
import config from '../config/development'
// import md5 from 'md5'

export function getWykopConnectUrl () {
  const domain = config.wykop.apiDomain
  let url = `${domain}user/connect/appkey,${config.wykop.key},`
  url += `redirect,${encodeURIComponent(new Buffer(config.wykop.redirectUrl).toString('base64'))},`
  // url += `secure,${md5(config.wykop.secret + config.wykop.redirectUrl)}`
  // console.log(`secure,${md5(config.wykop.secret + config.wykop.redirectUrl)}`)
  url += 'secure,54e68fca8e8fa3066268ebf47205d4c2'
  return url
}

export function parseConnectData (str) {
  let b = new Buffer(str, 'base64')
  return b.toString()
}
