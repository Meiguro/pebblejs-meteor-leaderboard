/**
 * Leaderboard using Meteor + Pebble.js
 * A Pebble.js demo for the Meteor leaderboard example
 *
 * @author Meiguro / http://meiguro.com/
 * @license MIT
 */

var ajax = require('ajax');
var UI = require('ui');
var Settings = require('settings');

var config = require('config');

var meteor = require('meteor')({ url: config.ddpUrl || config.siteUrl });
var Meteor = meteor.Meteor;
var Deps = meteor.Deps;

var Player = new Meteor.Collection('players');

var App = {};

App.init = function() {
  App.players = [];

  App.homeMenu = new UI.Menu();

  App.homeMenu.on('select', function(e) {
    var player = App.players[e.item];
    if (player) {
      Player.update(player._id, { $inc: { score: 5 } });
    }
  });

  App.homeMenu.section(0, {
    title: 'Leaderboard',
    items: [{
      title: 'Loading...'
    }]
  });

  App.homeMenu.show();

  Deps.autorun(function() {
    App.getPlayers();
  });
};

App.getPlayers = function() {
  var cursor = Player.find({}, { sort: { score: -1, name: 1 } });
  var players = cursor.fetch();
  App.players = players;

  var items = App.playerItems || (App.playerItems = []);
  items.length = cursor.count();

  players.forEach(function(player, i) {
    var item = items[i] || (items[i] = {});
    item.title = player.score + ' ' + player.name;
  });

  App.homeMenu.selection(function() {
    App.homeMenu.items(0, items);
  });
};

Settings.config(
  { url: config.siteUrl }
);

App.init();
