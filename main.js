function main() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var image = new Image();
  image.addEventListener("load", function() {
    context.drawImage(image, 50, 50, 39, 34);
  });
  image.src = "ship.png";
}

if (document.readyState === "interactive" || document.readyState === "complete") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}

