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

function main() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var image = new Image(40, 34);
  var ship = new Ship(image, 50, 50);
  image.addEventListener("load", function() {
    ship.draw(context, 0);
  });
  image.src = "ship.png";
}

if (document.readyState === "interactive" || document.readyState === "complete") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}

