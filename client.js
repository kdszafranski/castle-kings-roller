const START_GOLD    = 5;
const START_BLOCKED = 5;
const ROWS          = 8;

var goldPostions = [];
var blockedPositions = [];

$(document).ready(function() {
  console.log('loaded');

  $("#generateButton").on("click", reset);

  reset();
});

function reset() {
  generateBlockedPostions();
  generateGoldPostions();
  updateDOM();
}

function generateGoldPostions() {
  goldPostions = [];
  for (var i = 0; i < START_GOLD; i++) {
    goldPostions.push(getPosition());
  }
}

function generateBlockedPostions() {
  blockedPositions = [];
  for (var i = 0; i < START_BLOCKED; i++) {
    blockedPositions.push(getPosition());
  }
}

function getPosition() {
  var position = {};
  position.x = randomNumber(1, ROWS);
  position.y = randomNumber(1, ROWS);
  if(positionIsTaken(position)) {
    position = getPosition();
  }

  return position;
}

function positionIsTaken(pos) {
  goldPostions.forEach(function(thisPos) {
    if(pos.x == thisPos.x && pos.y == thisPos.y) {
      console.log('dupe');
      return true;
    }
  });

  blockedPositions.forEach(function(thisPos) {
    if(pos.x == thisPos.x && pos.y == thisPos.y) {
      console.log('dupe');
      return true;
    }
  });

  return false;
}

function updateDOM() {
  $("#gold-container").empty();
  goldPostions.forEach(function(position) {
    console.log(position);
    $("#gold-container").append('<li>' + position.x + ', ' + position.y + '</li>');
  });

  $("#blocked-container").empty();
  blockedPositions.forEach(function(position) {
    console.log(position);
    $("#blocked-container").append('<li>' + position.x + ', ' + position.y + '</li>');
  });
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
