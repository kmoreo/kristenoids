if (document.readyState === "interactive" || document.readyState === "complete") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}

