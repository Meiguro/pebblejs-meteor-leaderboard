/**
 * Leaderboard using Meteor + Pebble.js
 * A Pebble.js demo for the Meteor leaderboard example
 *
 * @author Meiguro / http://meiguro.com/
 * @license MIT
 */

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
  App.playerItems = [];

  App.homeMenu = new UI.Menu();

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

  App.playerItems.length = cursor.count();

  App.players = cursor.fetch();
  App.players.forEach(function(player, i) {
    var item = App.playerItems[i] || (App.playerItems[i] = {});
    item.title = player.score + ' ' + player.name;
  });

  App.homeMenu.selection(function() {
    App.homeMenu.items(0, App.playerItems);
  });
};

Settings.config(
  { url: config.siteUrl }
);

App.init();

App.homeMenu.on('select', function(e) {
  var player = App.players[e.item];
  if (player) {
    Player.update(player._id, { $inc: { score: 5 } });
  }
});

