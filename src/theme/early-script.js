(() => {
  var t = localStorage.getItem("app_theme");
  if (t !== "system" && t !== "light" && t !== "dark") {
    t = "system";
  }
  document.documentElement.dataset.theme = t;
})();
