
'use strict'

const fs = require('fs')
const path = require('path')
const { merge } = require('lodash')
const deepFreeze = require('deep-freeze')
const { Environment, Permission } = require('./enum')

const appRootPath = path.resolve(__dirname, '../../')
const env = process.env.NODE_ENV || Environment.development
const debugConfig = {
  debug: (env === Environment.development)
}

const packageConfig = {
  version: '0.5.1',
  minimumCompatibleVersion: '0.5.0'
}

const configFilePath = path.resolve(__dirname, '../../config.json')
const fileConfig = fs.existsSync(configFilePath) ? require(configFilePath)[env] : undefined

let config = require('./default')
merge(config, debugConfig)
merge(config, packageConfig)
merge(config, fileConfig)
merge(config, require('./oldEnvironment'))
merge(config, require('./environment'))
merge(config, require('./dockerSecret'))

// load LDAP CA
if (config.ldap.tlsca) {
  const ca = config.ldap.tlsca.split(',')
  const caContent = []
  for (const i of ca) {
    if (fs.existsSync(i)) {
      caContent.push(fs.readFileSync(i, 'utf8'))
    }
  }
  const tlsOptions = {
    ca: caContent
  }
  config.ldap.tlsOptions = config.ldap.tlsOptions ? Object.assign(config.ldap.tlsOptions, tlsOptions) : tlsOptions
}

// Permission
config.permission = Permission
if (!config.allowanonymous) {
  delete config.permission.freely
}
if (!(config.defaultpermission in config.permission)) {
  config.defaultpermission = config.permission.editable
}

// cache result, cannot change config in runtime!!!
config.isStandardHTTPsPort = (function isStandardHTTPsPort () {
  return config.usessl && config.port === 443
})()
config.isStandardHTTPPort = (function isStandardHTTPPort () {
  return !config.usessl && config.port === 80
})()

// cache serverURL
config.serverurl = (function getserverurl () {
  var url = ''
  if (config.domain) {
    var protocol = config.protocolusessl ? 'https://' : 'http://'
    url = protocol + config.domain
    if (config.urladdport) {
      if (!config.isStandardHTTPPort || !config.isStandardHTTPsPort) {
        url += ':' + config.port
      }
    }
  }
  if (config.urlpath) {
    url += '/' + config.urlpath
  }
  return url
})()

config.Environment = Environment

// auth method
config.isFacebookEnable = config.facebook.clientID && config.facebook.clientSecret
config.isGoogleEnable = config.google.clientID && config.google.clientSecret
config.isDropboxEnable = config.dropbox.clientID && config.dropbox.clientSecret
config.isTwitterEnable = config.twitter.consumerKey && config.twitter.consumerSecret
config.isEmailEnable = config.email
config.isGitHubEnable = config.github.clientID && config.github.clientSecret
config.isGitLabEnable = config.gitlab.clientID && config.gitlab.clientSecret
config.isMattermostEnable = config.mattermost.clientID && config.mattermost.clientSecret
config.isLDAPEnable = config.ldap.url
config.isSAMLEnable = config.saml.idpSsoUrl
config.isPDFExportEnable = config.allowpdfexport

// generate correct path
config.sslcapath.forEach((v, i) => { config.sslcapath[i] = path.resolve(appRootPath, v) })
config.sslcertpath = path.resolve(appRootPath, config.sslcertpath)
config.sslkeypath = path.resolve(appRootPath, config.sslkeypath)
config.dhparampath = path.resolve(appRootPath, config.dhparampath)

config.tmppath = path.resolve(appRootPath, config.tmppath)
config.defaultnotepath = path.resolve(appRootPath, config.defaultnotepath)
config.docspath = path.resolve(appRootPath, config.docspath)
config.indexpath = path.resolve(appRootPath, config.indexpath)
config.hackmdpath = path.resolve(appRootPath, config.hackmdpath)
config.errorpath = path.resolve(appRootPath, config.errorpath)
config.prettypath = path.resolve(appRootPath, config.prettypath)
config.slidepath = path.resolve(appRootPath, config.slidepath)

// make config readonly
config = deepFreeze(config)

module.exports = config
