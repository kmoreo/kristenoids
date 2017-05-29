"use strict";

const ROTATION_SPEED = (2 * Math.PI) / 2000;

class Ship {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.rotation = 0.0;
  }

  draw(context, msElapsed) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(this.x, this.y);
    this.rotation = (this.rotation + msElapsed * ROTATION_SPEED) % (2 * Math.PI);
    context.rotate(this.rotation);
    context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2, this.image.width, this.image.height);
  }
}

function loadResources(imageFileNames, callback) {
  var images = {};
  var imagesRemaining = imageFileNames.length;
  
  function imageLoaded() {
    imagesRemaining -= 1;
    if (imagesRemaining <= 0) {
      callback();
    }
  }

  for (let fileName of imageFileNames) {
    var eachImage = new Image();
    eachImage.addEventListener("load", imageLoaded);
    eachImage.src = fileName + ".png";
    images[fileName] = eachImage;
  }
  return images;
}

class Game {
  constructor(canvas, images) {
    this.canvas = canvas;
    this.ship = new Ship(images.ship, 50, 50);
    this.lastFrameTime = Date.now();
  }

  drawFrame() {
    var now = Date.now();
    var msElapsed = now - this.lastFrameTime;
    var context = this.canvas.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship.draw(context, msElapsed);
    this.lastFrameTime = now;
    requestAnimationFrame(this.drawFrame.bind(this));
  }
}

function main() {
  var canvas = document.getElementById("canvas");
  var images = loadResources(["ship"], function () {
    images.ship.width = 40;
    images.ship.height = 34;
    var game = new Game(canvas, images);
    game.drawFrame();
  });
}

if (document.readyState === "interactive" || document.readyState === "complete") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}

