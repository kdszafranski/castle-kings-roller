const START_GOLD    = 5;
const START_BLOCKED = 5;
const ROWS          = 8;

var goldPostions = [];
var blockedPositions = [];

function Point(x, y) {
  this.x = parseInt(x);
  this.y = parseInt(y);
}

$(document).ready(function() {
  console.log('loaded');

  reset();

  // Event listeners
  $("#generateButton").on("click", reset);
  $("#blocked-container").on("click", ".removeBlockedSpace", removeBlockedSpace);
  $("#gold-container").on("click", ".removeGoldSpace", removeGoldSpace);
  $("#addBlockedSpace").on("click", addBlockedSpace);
  $("#addGoldSpace").on("click", addGoldSpace);

  $("#checkDupe").on("click", function(e) {
    var p = $("#pointToCheck").val().split(",");
    var point = new Point(p[0], p[1]);
    console.log('Duplicate? : ', positionIsTaken(point));
  });

});

function reset() {
  goldPostions = [];
  blockedPositions = [];
  generateStartingBlockedPostions();
  generateStartingGoldPostions();
  updateDOM();
}

function removeBlockedSpace(e) {
  e.preventDefault();
  blockedPositions.splice($(this).data("id"), 1);
  updateDOM();
}

function removeGoldSpace(e) {
  e.preventDefault();
  console.log($(this).data());
  goldPostions.splice($(this).data("id"), 1);
  updateDOM();
}

function removePoint(array, index) {
  array.splice(index, 1);
}

function addBlockedSpace() {
  blockedPositions.push(getPosition());
  updateDOM();
}

function addGoldSpace() {
  goldPostions.push(getPosition());
  updateDOM();
}

function generateStartingGoldPostions() {
  goldPostions = [];
  for (var i = 0; i < START_GOLD; i++) {
    goldPostions.push(getPosition());
  }
}

function generateStartingBlockedPostions() {
  blockedPositions = [];
  for (var i = 0; i < START_BLOCKED; i++) {
    blockedPositions.push(getPosition());
  }
}

function getPosition() {
  var position = new Point(randomNumber(1, ROWS), randomNumber(1, ROWS));

  if(positionIsTaken(position)) {
    return getPosition();
  }

  return position;
}

function positionIsTaken(pos) {
  for (var i = 0; i < blockedPositions.length; i++) {
    var thisPos = blockedPositions[i];
    if(pos.x == thisPos.x && pos.y == thisPos.y) {
      console.log('dupe blocked');
      return true;
    }
  }

  for (var j = 0; j < goldPostions.length; j++) {
    var thisPos = goldPostions[j];
    if(pos.x == thisPos.x && pos.y == thisPos.y) {
      console.log('dupe gold');
      return true;
    }
  }

  return false;
}

function updateDOM() {
  $("#blocked-container").empty();
  blockedPositions.forEach(function(position, i) {
    $("#blocked-container").append('<li><a class="remove removeBlockedSpace" data-id="' + i +'">' + position.x + ', ' + position.y + '</a></li>');
  });

  $("#gold-container").empty();
  goldPostions.forEach(function(position, j) {
    $("#gold-container").append('<li><a class="remove removeGoldSpace" data-id="' + j +'">' + position.x + ', ' + position.y + '</a></li>');
  });
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
