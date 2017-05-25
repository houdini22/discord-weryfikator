import {Buffer} from 'buffer/'
import config from '../config/development'

export function getWykopConnectUrl () {
  const domain = config.wykop.apiDomain
  let url = `${domain}user/connect/appkey,${config.wykop.key},`
  url += `redirect,${encodeURIComponent(new Buffer(config.wykop.redirectUrl).toString('base64'))},`
  // url += `secure,${md5(config.wykop.secret + config.wykop.redirectUrl)}`
  // console.log(`secure,${md5(config.wykop.secret + config.wykop.redirectUrl)}`)
  url += 'secure,0079daf985b81f72a530b985d7990e7c'
  return url
}

export function parseConnectData (str) {
  let b = new Buffer(str, 'base64')
  return b.toString()
}
