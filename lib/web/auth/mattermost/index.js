'use strict'

require('babel-polyfill')
require('isomorphic-fetch')

const Router = require('express').Router
const passport = require('passport')
const Client4 = require('./client/client4.js').default
const OAuthStrategy = require('passport-oauth2').Strategy
const config = require('../../../config')
const { setReturnToFromReferer, passportGeneralCallback } = require('../utils')

const client = new Client4()

let mattermostAuth = module.exports = Router()

let mattermostStrategy = new OAuthStrategy({
  authorizationURL: config.mattermost.baseURL + '/oauth/authorize',
  tokenURL: config.mattermost.baseURL + '/oauth/access_token',
  clientID: config.mattermost.clientID,
  clientSecret: config.mattermost.clientSecret,
  callbackURL: config.serverurl + '/auth/mattermost/callback'
}, passportGeneralCallback)

mattermostStrategy.userProfile = (accessToken, done) => {
  client.setUrl(config.mattermost.baseURL)
  client.setToken(accessToken)

  client.getMe()
    .then((data) => done(null, data))
    .catch((err) => done(err))
}

passport.use(mattermostStrategy)

mattermostAuth.get('/auth/mattermost', function (req, res, next) {
  setReturnToFromReferer(req)
  passport.authenticate('oauth2')(req, res, next)
})

// mattermost auth callback
mattermostAuth.get('/auth/mattermost/callback',
  passport.authenticate('oauth2', {
    successReturnToOrRedirect: config.serverurl + '/',
    failureRedirect: config.serverurl + '/'
  })
)
